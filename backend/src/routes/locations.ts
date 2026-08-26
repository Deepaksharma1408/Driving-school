import { Router, Request, Response } from 'express';
import { pool, isPgConnected } from '../db/database.js';

const router = Router();

// GET /api/locations - Fetch Service NSW test centres
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    if (isPgConnected) {
      const result = await pool.query('SELECT * FROM test_locations ORDER BY name ASC');
      res.json({ success: true, count: result.rows.length, data: result.rows });
    } else {
      const fallbackLocations = [
        { id: 'loc-01', name: 'Service NSW Botany Test Centre', region: 'Inner South / Eastern Suburbs', code: 'BOT-01', isPopular: true },
        { id: 'loc-02', name: 'Service NSW Marrickville Test Centre', region: 'Inner West', code: 'MRK-02', isPopular: true },
        { id: 'loc-03', name: 'Service NSW Rockdale Test Centre', region: 'St George Area', code: 'ROC-03', isPopular: true },
        { id: 'loc-04', name: 'Service NSW Miranda Test Centre', region: 'Sutherland Shire', code: 'MIR-04', isPopular: false },
        { id: 'loc-05', name: 'Service NSW Silverwater Test Centre', region: 'Greater Western Sydney', code: 'SLV-05', isPopular: false }
      ];
      res.json({ success: true, count: fallbackLocations.length, data: fallbackLocations });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/locations/timeslots - Available booking time slots
router.get('/timeslots', (_req: Request, res: Response): void => {
  const timeSlots = [
    '07:30 AM - 09:00 AM (Early Slot)',
    '09:30 AM - 11:00 AM (Morning Test Prep)',
    '11:30 AM - 01:00 PM (Midday Session)',
    '02:00 PM - 03:30 PM (Afternoon Traffic)',
    '04:00 PM - 05:30 PM (School Zone & Peak)',
    '05:45 PM - 07:15 PM (Twilight/Dusk Drive)'
  ];
  res.json({ success: true, data: timeSlots });
});

export default router;
