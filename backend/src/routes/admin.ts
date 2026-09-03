import { Router, Response } from 'express';
import { pool, isPgConnected, inMemoryStore } from '../db/database.js';
import { authenticateToken, requireRole, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// GET /api/admin/stats - Overview metrics & summary stats (Admin & Instructor)
router.get('/admin/stats', authenticateToken, requireRole('admin', 'instructor'), async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (isPgConnected) {
      const [bookingsTodayRes, bookingsWeekRes, statusRes, studentsRes, instructorsRes, vehiclesRes] = await Promise.all([
        pool.query('SELECT COUNT(*) FROM bookings WHERE date = $1', [today]),
        pool.query('SELECT COUNT(*) FROM bookings WHERE date >= $1', [sevenDaysAgo]),
        pool.query('SELECT status, COUNT(*) FROM bookings GROUP BY status'),
        pool.query("SELECT COUNT(*) FROM users WHERE role = 'student'"),
        pool.query('SELECT COUNT(*) FROM instructors WHERE active_status = true'),
        pool.query('SELECT COUNT(*) FROM vehicles WHERE active_status = true')
      ]);

      const statusMap: Record<string, number> = { confirmed: 0, pending: 0, cancelled: 0 };
      statusRes.rows.forEach(r => { statusMap[r.status] = parseInt(r.count); });

      res.json({
        success: true,
        data: {
          bookingsToday: parseInt(bookingsTodayRes.rows[0].count),
          bookingsThisWeek: parseInt(bookingsWeekRes.rows[0].count),
          activeStudents: parseInt(studentsRes.rows[0].count),
          activeInstructors: parseInt(instructorsRes.rows[0].count),
          activeVehicles: parseInt(vehiclesRes.rows[0].count),
          statusBreakdown: statusMap
        }
      });
    } else {
      // In-Memory Fallback
      const bookingsToday = inMemoryStore.bookings.filter(b => b.date === today).length;
      const bookingsThisWeek = inMemoryStore.bookings.filter(b => b.date >= sevenDaysAgo).length;
      const activeStudents = inMemoryStore.users.filter(u => u.role === 'student').length;
      const activeInstructors = inMemoryStore.instructors.filter(i => i.activeStatus).length;
      const activeVehicles = inMemoryStore.vehicles.filter(v => v.activeStatus).length;

      const statusMap: Record<string, number> = { confirmed: 0, pending: 0, cancelled: 0 };
      inMemoryStore.bookings.forEach(b => {
        const s = b.status || 'confirmed';
        statusMap[s] = (statusMap[s] || 0) + 1;
      });

      res.json({
        success: true,
        data: {
          bookingsToday,
          bookingsThisWeek,
          activeStudents,
          activeInstructors,
          activeVehicles,
          statusBreakdown: statusMap
        }
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/instructors - List all instructors with user profiles (Admin & Instructor)
router.get('/instructors', authenticateToken, requireRole('admin', 'instructor'), async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const today = new Date().toISOString().split('T')[0];

    if (isPgConnected) {
      const result = await pool.query(`
        SELECT 
          i.id,
          i.user_id,
          u.full_name,
          u.email,
          u.phone,
          i.license_number,
          i.transmission_types,
          i.active_status,
          (SELECT COUNT(*) FROM bookings b WHERE b.instructor_id = i.id AND b.date = $1) as today_bookings_count
        FROM instructors i
        JOIN users u ON i.user_id = u.id
        ORDER BY i.id ASC
      `, [today]);

      res.json({
        success: true,
        count: result.rows.length,
        data: result.rows.map(r => ({
          id: r.id,
          userId: r.user_id,
          fullName: r.full_name,
          email: r.email,
          phone: r.phone,
          licenseNumber: r.license_number,
          transmissionTypes: r.transmission_types,
          activeStatus: r.active_status,
          todayBookingsCount: parseInt(r.today_bookings_count || '0')
        }))
      });
    } else {
      const userMap = new Map(inMemoryStore.users.map(u => [u.id, u]));

      const data = inMemoryStore.instructors.map(i => {
        const u = userMap.get(i.userId) || { fullName: 'Instructor User', email: 'instructor@drivinity.com', phone: '1300 855 374' };
        const todayBookingsCount = inMemoryStore.bookings.filter(b => b.instructorId === i.id && b.date === today).length;
        return {
          id: i.id,
          userId: i.userId,
          fullName: u.fullName || u.name,
          email: u.email,
          phone: u.phone,
          licenseNumber: i.licenseNumber,
          transmissionTypes: i.transmissionTypes || ['automatic'],
          activeStatus: i.activeStatus ?? true,
          todayBookingsCount
        };
      });

      res.json({ success: true, count: data.length, data });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/instructors/:id - Toggle active_status (Admin ONLY)
router.patch('/instructors/:id', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { activeStatus } = req.body;

    if (typeof activeStatus !== 'boolean') {
      res.status(400).json({ success: false, error: 'activeStatus boolean is required.' });
      return;
    }

    if (isPgConnected) {
      const result = await pool.query(
        'UPDATE instructors SET active_status = $1 WHERE id = $2 RETURNING *',
        [activeStatus, id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ success: false, error: 'Instructor not found.' });
        return;
      }
      res.json({ success: true, message: 'Instructor active status updated successfully.', data: result.rows[0] });
    } else {
      const inst = inMemoryStore.instructors.find(i => i.id === id);
      if (!inst) {
        res.status(404).json({ success: false, error: 'Instructor not found.' });
        return;
      }
      inst.activeStatus = activeStatus;
      res.json({ success: true, message: 'Instructor active status updated successfully.', data: inst });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/vehicles - List all fleet vehicles (Admin & Instructor)
router.get('/vehicles', authenticateToken, requireRole('admin', 'instructor'), async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const today = new Date().toISOString().split('T')[0];

    if (isPgConnected) {
      const result = await pool.query(`
        SELECT 
          v.id,
          v.registration_number,
          v.transmission,
          v.instructor_id,
          u.full_name as instructor_name,
          v.active_status,
          (SELECT COUNT(*) FROM bookings b WHERE b.vehicle_id = v.id AND b.date = $1) as today_bookings_count
        FROM vehicles v
        LEFT JOIN instructors i ON v.instructor_id = i.id
        LEFT JOIN users u ON i.user_id = u.id
        ORDER BY v.id ASC
      `, [today]);

      res.json({
        success: true,
        count: result.rows.length,
        data: result.rows.map(r => ({
          id: r.id,
          registrationNumber: r.registration_number,
          transmission: r.transmission,
          instructorId: r.instructor_id,
          instructorName: r.instructor_name || 'Unassigned / Shared',
          activeStatus: r.active_status,
          todayBookingsCount: parseInt(r.today_bookings_count || '0')
        }))
      });
    } else {
      const instMap = new Map(inMemoryStore.instructors.map(i => [i.id, i]));
      const userMap = new Map(inMemoryStore.users.map(u => [u.id, u]));

      const data = inMemoryStore.vehicles.map(v => {
        const inst = v.instructorId ? instMap.get(v.instructorId) : null;
        const u = inst ? userMap.get(inst.userId) : null;
        const todayBookingsCount = inMemoryStore.bookings.filter(b => b.vehicleId === v.id && b.date === today).length;

        return {
          id: v.id,
          registrationNumber: v.registrationNumber,
          transmission: v.transmission,
          instructorId: v.instructorId,
          instructorName: u ? (u.fullName || u.name) : 'Unassigned / Shared',
          activeStatus: v.activeStatus ?? true,
          todayBookingsCount
        };
      });

      res.json({ success: true, count: data.length, data });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/vehicles/:id - Toggle vehicle active_status (Admin ONLY)
router.patch('/vehicles/:id', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { activeStatus } = req.body;

    if (typeof activeStatus !== 'boolean') {
      res.status(400).json({ success: false, error: 'activeStatus boolean is required.' });
      return;
    }

    if (isPgConnected) {
      const result = await pool.query(
        'UPDATE vehicles SET active_status = $1 WHERE id = $2 RETURNING *',
        [activeStatus, id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ success: false, error: 'Vehicle not found.' });
        return;
      }
      res.json({ success: true, message: 'Vehicle active status updated successfully.', data: result.rows[0] });
    } else {
      const veh = inMemoryStore.vehicles.find(v => v.id === id);
      if (!veh) {
        res.status(404).json({ success: false, error: 'Vehicle not found.' });
        return;
      }
      veh.activeStatus = activeStatus;
      res.json({ success: true, message: 'Vehicle active status updated successfully.', data: veh });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/admin/students - List all student users with booking counts (Admin & Instructor)
router.get('/admin/students', authenticateToken, requireRole('admin', 'instructor'), async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (isPgConnected) {
      const result = await pool.query(`
        SELECT 
          u.id,
          u.full_name,
          u.email,
          u.phone,
          u.created_at,
          (SELECT COUNT(*) FROM bookings b WHERE b.email = u.email) as total_bookings_count
        FROM users u
        WHERE u.role = 'student'
        ORDER BY u.created_at DESC
      `);

      res.json({
        success: true,
        count: result.rows.length,
        data: result.rows.map(r => ({
          id: r.id,
          fullName: r.full_name,
          email: r.email,
          phone: r.phone,
          createdAt: r.created_at,
          totalBookingsCount: parseInt(r.total_bookings_count || '0')
        }))
      });
    } else {
      const studentUsers = inMemoryStore.users.filter(u => u.role === 'student');

      const data = studentUsers.map(u => {
        const totalBookingsCount = inMemoryStore.bookings.filter(b => b.email === u.email).length;
        return {
          id: u.id,
          fullName: u.fullName || u.name,
          email: u.email,
          phone: u.phone,
          createdAt: u.createdAt || new Date().toISOString(),
          totalBookingsCount
        };
      });

      res.json({ success: true, count: data.length, data });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
