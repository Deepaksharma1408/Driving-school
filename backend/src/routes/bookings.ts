import { Router, Request, Response } from 'express';
import { pool, isPgConnected, inMemoryStore } from '../db/database.js';

const router = Router();

// POST /api/bookings - Create new driving lesson or test car hire booking
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      serviceId,
      locationId,
      transmission = 'automatic',
      date,
      timeSlot,
      fullName,
      email,
      phone,
      licenceType = 'NSW Learner Licence',
      pickupAddress = '',
      notes = ''
    } = req.body;

    if (!fullName || !email || !phone || !date || !timeSlot) {
      res.status(400).json({
        success: false,
        error: 'Missing required booking fields (fullName, email, phone, date, timeSlot).'
      });
      return;
    }

    const bookingId = `BOOK-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const newBooking = {
      id: bookingId,
      serviceId,
      locationId,
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

    if (isPgConnected) {
      await pool.query(
        `INSERT INTO bookings 
         (id, service_id, location_id, transmission, date, time_slot, full_name, email, phone, licence_type, pickup_address, notes, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          bookingId,
          serviceId || 'driving-lesson',
          locationId || 'loc-01',
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
    } else {
      inMemoryStore.bookings.unshift(newBooking);
    }

    console.log(`📌 New Booking Recorded: ${bookingId} for ${fullName} (${email})`);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully!',
      bookingId,
      data: newBooking
    });
  } catch (err: any) {
    console.error('Error creating booking:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to create booking',
      details: err.message
    });
  }
});

// GET /api/bookings - Fetch all bookings (filterable by status or email)
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, email } = req.query;

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

// GET /api/bookings/:id - Get detailed booking by ID
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

// PATCH /api/bookings/:id/status - Update booking status
router.patch('/:id/status', async (req: Request, res: Response): Promise<void> => {
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
      res.json({ success: true, message: 'Status updated', data: result.rows[0] });
    } else {
      const booking = inMemoryStore.bookings.find(b => b.id === id);
      if (!booking) {
        res.status(404).json({ success: false, error: 'Booking not found' });
        return;
      }
      booking.status = status;
      res.json({ success: true, message: 'Status updated', data: booking });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
