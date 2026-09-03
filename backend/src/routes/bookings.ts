import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { pool, isPgConnected, inMemoryStore } from '../db/database.js';
import { authenticateToken, requireRole, AuthenticatedRequest } from '../middleware/auth.js';
import { sendBookingEmail, sendBookingSms } from '../services/notificationService.js';

const router = Router();

// Standard Daily Time Slots
const STANDARD_TIME_SLOTS = [
  '07:30 AM - 09:00 AM',
  '09:30 AM - 11:00 AM',
  '11:30 AM - 01:00 PM',
  '01:30 PM - 03:00 PM',
  '03:30 PM - 05:00 PM',
  '05:30 PM - 07:00 PM'
];

// Zod Input Validation Schema for Creating Booking
const createBookingSchema = z.object({
  serviceId: z.string().default('driving-lesson'),
  locationId: z.string().default('loc-01'),
  instructorId: z.string().optional(),
  vehicleId: z.string().optional(),
  transmission: z.enum(['automatic', 'manual']).default('automatic'),
  date: z.string().min(1, 'Date is required (YYYY-MM-DD)'),
  timeSlot: z.string().min(1, 'Time slot is required'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address format'),
  phone: z.string().min(5, 'Valid phone number required'),
  licenceType: z.string().default('NSW Learner Licence'),
  pickupAddress: z.string().optional().default(''),
  notes: z.string().optional().default('')
});

// GET /api/bookings/availability - Fetch free instructor & vehicle time slots for a given date
router.get('/availability', async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, transmission = 'automatic' } = req.query;

    if (!date || typeof date !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Missing required query parameter: date (YYYY-MM-DD)'
      });
      return;
    }

    const requestedTransmission = (transmission as string).toLowerCase();

    if (isPgConnected) {
      // Fetch active instructors matching transmission
      const instRes = await pool.query(
        `SELECT i.id, u.full_name as name 
         FROM instructors i
         JOIN users u ON i.user_id = u.id
         WHERE i.active_status = true AND $1 = ANY(i.transmission_types)`,
        [requestedTransmission]
      );

      // Fetch active vehicles matching transmission
      const vehRes = await pool.query(
        `SELECT id, registration_number as rego 
         FROM vehicles 
         WHERE active_status = true AND transmission = $1`,
        [requestedTransmission]
      );

      // Fetch existing bookings for this date
      const bookingsRes = await pool.query(
        `SELECT instructor_id, vehicle_id, time_slot 
         FROM bookings 
         WHERE date = $1 AND status != 'cancelled'`,
        [date]
      );

      const existingBookings = bookingsRes.rows;

      const slotDetails = STANDARD_TIME_SLOTS.map(slot => {
        const bookedInstIds = new Set(
          existingBookings.filter(b => b.time_slot === slot && b.instructor_id).map(b => b.instructor_id)
        );
        const bookedVehIds = new Set(
          existingBookings.filter(b => b.time_slot === slot && b.vehicle_id).map(b => b.vehicle_id)
        );

        const freeInstructors = instRes.rows.filter(i => !bookedInstIds.has(i.id));
        const freeVehicles = vehRes.rows.filter(v => !bookedVehIds.has(v.id));
        const isAvailable = freeInstructors.length > 0 && freeVehicles.length > 0;

        return {
          timeSlot: slot,
          isAvailable,
          availableInstructorsCount: freeInstructors.length,
          availableVehiclesCount: freeVehicles.length,
          availableInstructors: freeInstructors,
          availableVehicles: freeVehicles
        };
      });

      res.json({
        success: true,
        date,
        transmission: requestedTransmission,
        slots: slotDetails
      });
    } else {
      // In-Memory Path
      const freeInsts = inMemoryStore.instructors.filter(
        i => i.activeStatus && (i.transmissionTypes || []).includes(requestedTransmission)
      );
      const freeVehs = inMemoryStore.vehicles.filter(
        v => v.activeStatus && v.transmission === requestedTransmission
      );

      const existingBookings = inMemoryStore.bookings.filter(b => b.date === date && b.status !== 'cancelled');

      const slotDetails = STANDARD_TIME_SLOTS.map(slot => {
        const bookedInstIds = new Set(
          existingBookings.filter(b => b.timeSlot === slot && b.instructorId).map(b => b.instructorId)
        );
        const bookedVehIds = new Set(
          existingBookings.filter(b => b.timeSlot === slot && b.vehicleId).map(b => b.vehicleId)
        );

        const availableInstructors = freeInsts.filter(i => !bookedInstIds.has(i.id));
        const availableVehicles = freeVehs.filter(v => !bookedVehIds.has(v.id));
        const isAvailable = availableInstructors.length > 0 && availableVehicles.length > 0;

        return {
          timeSlot: slot,
          isAvailable,
          availableInstructorsCount: availableInstructors.length,
          availableVehiclesCount: availableVehicles.length,
          availableInstructors,
          availableVehicles
        };
      });

      res.json({
        success: true,
        date,
        transmission: requestedTransmission,
        slots: slotDetails
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/bookings - Create new booking with conflict check, auto-assignment & DB transaction
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = createBookingSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: parseResult.error.issues.map((e: any) => e.message)
      });
      return;
    }

    const {
      serviceId,
      locationId,
      instructorId: inputInstructorId,
      vehicleId: inputVehicleId,
      transmission,
      date,
      timeSlot,
      fullName,
      email,
      phone,
      licenceType,
      pickupAddress,
      notes
    } = parseResult.data;

    let assignedInstructorId = inputInstructorId;
    let assignedVehicleId = inputVehicleId;

    if (isPgConnected) {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');

        // 1. Conflict Check for Explicit Instructor
        if (assignedInstructorId) {
          const instConflict = await client.query(
            `SELECT id FROM bookings 
             WHERE instructor_id = $1 AND date = $2 AND time_slot = $3 AND status != 'cancelled'`,
            [assignedInstructorId, date, timeSlot]
          );
          if (instConflict.rows.length > 0) {
            await client.query('ROLLBACK');
            res.status(409).json({
              success: false,
              error: 'Conflict: The selected instructor is already booked for this date and time slot.'
            });
            return;
          }
        }

        // 2. Conflict Check for Explicit Vehicle
        if (assignedVehicleId) {
          const vehConflict = await client.query(
            `SELECT id FROM bookings 
             WHERE vehicle_id = $1 AND date = $2 AND time_slot = $3 AND status != 'cancelled'`,
            [assignedVehicleId, date, timeSlot]
          );
          if (vehConflict.rows.length > 0) {
            await client.query('ROLLBACK');
            res.status(409).json({
              success: false,
              error: 'Conflict: The selected vehicle is already booked for this date and time slot.'
            });
            return;
          }
        }

        // 3. Auto-assignment for Instructor if omitted
        if (!assignedInstructorId) {
          const freeInstRes = await client.query(
            `SELECT i.id 
             FROM instructors i
             WHERE i.active_status = true AND $1 = ANY(i.transmission_types)
               AND i.id NOT IN (
                 SELECT instructor_id FROM bookings 
                 WHERE date = $2 AND time_slot = $3 AND status != 'cancelled' AND instructor_id IS NOT NULL
               )
             ORDER BY i.id ASC LIMIT 1`,
            [transmission, date, timeSlot]
          );

          if (freeInstRes.rows.length === 0) {
            await client.query('ROLLBACK');
            res.status(409).json({
              success: false,
              error: `No available instructor for date: ${date}, time: ${timeSlot}, transmission: ${transmission}.`
            });
            return;
          }
          assignedInstructorId = freeInstRes.rows[0].id;
        }

        // 4. Auto-assignment for Vehicle if omitted
        if (!assignedVehicleId) {
          const freeVehRes = await client.query(
            `SELECT v.id 
             FROM vehicles v
             WHERE v.active_status = true AND v.transmission = $1
               AND v.id NOT IN (
                 SELECT vehicle_id FROM bookings 
                 WHERE date = $2 AND time_slot = $3 AND status != 'cancelled' AND vehicle_id IS NOT NULL
               )
             ORDER BY v.id ASC LIMIT 1`,
            [transmission, date, timeSlot]
          );

          if (freeVehRes.rows.length === 0) {
            await client.query('ROLLBACK');
            res.status(409).json({
              success: false,
              error: `No available vehicle for date: ${date}, time: ${timeSlot}, transmission: ${transmission}.`
            });
            return;
          }
          assignedVehicleId = freeVehRes.rows[0].id;
        }

        // 5. Insert Booking inside Transaction
        const bookingId = `BOOK-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

        const insertRes = await client.query(
          `INSERT INTO bookings 
           (id, service_id, location_id, instructor_id, vehicle_id, transmission, date, time_slot, full_name, email, phone, licence_type, pickup_address, notes, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
           RETURNING *`,
          [
            bookingId,
            serviceId,
            locationId,
            assignedInstructorId,
            assignedVehicleId,
            transmission,
            date,
            timeSlot,
            fullName,
            email,
            phone,
            licenceType,
            pickupAddress,
            notes,
            'confirmed'
          ]
        );

        await client.query('COMMIT');

        console.log(`📌 Booking confirmed: ${bookingId} (Instructor: ${assignedInstructorId}, Vehicle: ${assignedVehicleId})`);

        // Best-Effort Notification Trigger (Post-Commit)
        try {
          if (email) {
            sendBookingEmail({
              recipientEmail: email,
              fullName,
              bookingRef: bookingId,
              serviceTitle: serviceId,
              date,
              timeSlot,
              pickupAddress
            }).catch(err => console.error('Non-fatal email dispatch error:', err.message));
          }
          if (phone) {
            sendBookingSms({
              recipientPhone: phone,
              fullName,
              bookingRef: bookingId,
              date,
              timeSlot
            }).catch(err => console.error('Non-fatal SMS dispatch error:', err.message));
          }
        } catch (notifErr: any) {
          console.error('Non-fatal notification error during booking confirmation:', notifErr.message);
        }

        res.status(201).json({
          success: true,
          message: 'Booking created successfully!',
          bookingId,
          data: insertRes.rows[0]
        });
      } catch (dbErr: any) {
        await client.query('ROLLBACK');

        // Catch Postgres 23505 Unique Violation (Index idx_unique_active_instructor_booking or idx_unique_active_vehicle_booking)
        if (dbErr.code === '23505') {
          if (dbErr.constraint === 'idx_unique_active_vehicle_booking') {
            res.status(409).json({
              success: false,
              error: 'Conflict: Race condition prevented double-booking for the selected vehicle.'
            });
            return;
          }
          if (dbErr.constraint === 'idx_unique_active_instructor_booking') {
            res.status(409).json({
              success: false,
              error: 'Conflict: Race condition prevented double-booking for the selected instructor.'
            });
            return;
          }
          res.status(409).json({
            success: false,
            error: 'Conflict: Race condition prevented double-booking constraint violation.'
          });
          return;
        }

        throw dbErr;
      } finally {
        client.release();
      }
    } else {
      // In-Memory Fallback Execution Path
      const activeBookings = inMemoryStore.bookings.filter(b => b.date === date && b.timeSlot === timeSlot && b.status !== 'cancelled');

      // Conflict checks
      if (assignedInstructorId && activeBookings.some(b => b.instructorId === assignedInstructorId)) {
        res.status(409).json({
          success: false,
          error: 'Conflict: The selected instructor is already booked for this date and time slot.'
        });
        return;
      }

      if (assignedVehicleId && activeBookings.some(b => b.vehicleId === assignedVehicleId)) {
        res.status(409).json({
          success: false,
          error: 'Conflict: The selected vehicle is already booked for this date and time slot.'
        });
        return;
      }

      // Auto-assign instructor
      if (!assignedInstructorId) {
        const bookedInstIds = new Set(activeBookings.map(b => b.instructorId));
        let freeInst = inMemoryStore.instructors.find(
          i => i.activeStatus && (i.transmissionTypes || []).includes(transmission) && !bookedInstIds.has(i.id)
        );
        if (!freeInst) {
          freeInst = { id: `inst-${Date.now()}`, activeStatus: true, transmissionTypes: ['automatic', 'manual'] };
          inMemoryStore.instructors.push(freeInst);
        }
        assignedInstructorId = freeInst.id;
      }

      // Auto-assign vehicle
      if (!assignedVehicleId) {
        const bookedVehIds = new Set(activeBookings.map(b => b.vehicleId));
        let freeVeh = inMemoryStore.vehicles.find(
          v => v.activeStatus && v.transmission === transmission && !bookedVehIds.has(v.id)
        );
        if (!freeVeh) {
          freeVeh = { id: `veh-${Date.now()}`, activeStatus: true, transmission };
          inMemoryStore.vehicles.push(freeVeh);
        }
        assignedVehicleId = freeVeh.id;
      }

      const bookingId = `BOOK-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
      const newBooking = {
        id: bookingId,
        serviceId,
        locationId,
        instructorId: assignedInstructorId,
        vehicleId: assignedVehicleId,
        transmission,
        date,
        timeSlot,
        fullName,
        email,
        phone,
        licenceType,
        pickupAddress,
        notes,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      inMemoryStore.bookings.unshift(newBooking);

      // Best-Effort Notification Trigger
      try {
        if (email) {
          sendBookingEmail({
            recipientEmail: email,
            fullName,
            bookingRef: bookingId,
            serviceTitle: serviceId,
            date,
            timeSlot,
            pickupAddress
          }).catch(err => console.error('Non-fatal email dispatch error:', err.message));
        }
        if (phone) {
          sendBookingSms({
            recipientPhone: phone,
            fullName,
            bookingRef: bookingId,
            date,
            timeSlot
          }).catch(err => console.error('Non-fatal SMS dispatch error:', err.message));
        }
      } catch (notifErr: any) {
        console.error('Non-fatal notification error during booking confirmation:', notifErr.message);
      }

      res.status(201).json({
        success: true,
        message: 'Booking created successfully!',
        bookingId,
        data: newBooking
      });
    }
  } catch (err: any) {
    console.error('Error creating booking:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to create booking',
      details: err.message
    });
  }
});

// GET /api/bookings - Retrieve bookings
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, email, instructorId } = req.query;

    if (isPgConnected) {
      let query = 'SELECT * FROM bookings';
      const values: any[] = [];
      const conditions: string[] = [];

      if (status) {
        values.push(status);
        conditions.push(`status = $${values.length}`);
      }
      if (email) {
        values.push(email);
        conditions.push(`email = $${values.length}`);
      }
      if (instructorId) {
        values.push(instructorId);
        conditions.push(`instructor_id = $${values.length}`);
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' ORDER BY created_at DESC';

      const result = await pool.query(query, values);
      res.json({
        success: true,
        count: result.rows.length,
        data: result.rows
      });
    } else {
      let data = [...inMemoryStore.bookings];
      if (status) data = data.filter(b => b.status === status);
      if (email) data = data.filter(b => b.email === email);
      if (instructorId) data = data.filter(b => b.instructorId === instructorId);
      res.json({
        success: true,
        count: data.length,
        data
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/bookings/:id - Get single booking by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (isPgConnected) {
      const result = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        res.status(404).json({ success: false, error: 'Booking not found' });
        return;
      }
      res.json({ success: true, data: result.rows[0] });
    } else {
      const booking = inMemoryStore.bookings.find(b => b.id === id);
      if (!booking) {
        res.status(404).json({ success: false, error: 'Booking not found' });
        return;
      }
      res.json({ success: true, data: booking });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/bookings/:id/status - Update status (Restricted to Admin & Instructor roles)
router.patch('/:id/status', authenticateToken, requireRole('admin', 'instructor'), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({ success: false, error: 'Status field is required.' });
      return;
    }

    if (isPgConnected) {
      const result = await pool.query(
        'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ success: false, error: 'Booking not found' });
        return;
      }
      res.json({ success: true, message: 'Status updated successfully', data: result.rows[0] });
    } else {
      const booking = inMemoryStore.bookings.find(b => b.id === id);
      if (!booking) {
        res.status(404).json({ success: false, error: 'Booking not found' });
        return;
      }
      booking.status = status;
      res.json({ success: true, message: 'Status updated successfully', data: booking });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
