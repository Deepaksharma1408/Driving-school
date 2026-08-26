import { Router, Request, Response } from 'express';
import { pool, isPgConnected } from '../db/database.js';

const router = Router();

// GET /api/services - Fetch all services
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    if (isPgConnected) {
      const result = await pool.query('SELECT * FROM services ORDER BY number ASC');
      res.json({ success: true, count: result.rows.length, data: result.rows });
    } else {
      // Fallback service data
      const fallbackServices = [
        {
          id: 'driving-lesson',
          number: '01',
          title: 'Professional Driving Lessons (Automatic)',
          shortDesc: 'Structured 1-on-1 driving instruction for learners of all experience levels in modern dual-control vehicles.',
          badge: 'POPULAR CHOICE',
          slug: 'driving-lessons',
          image: '/images/lesson-card.jpg',
          pricePlaceholder: '$75 / 1-Hour Session',
          idealFor: 'Beginners starting from zero hours, logbook progression, or experienced drivers polishing test skills.'
        },
        {
          id: 'car-hire-test',
          number: '02',
          title: 'Service NSW Test Day Car Hire & Warmup',
          shortDesc: 'Drive our dual-control, fully insured vehicle for your official Service NSW Practical Driving Test with a 45-min pre-test warmup drive.',
          badge: 'HIGH PASS RATE',
          slug: 'car-hire-test',
          image: '/images/test-hire.jpg',
          pricePlaceholder: '$220 (Warmup Drive + Test Car Hire)',
          idealFor: 'Learners taking their Service NSW Driving Test at Botany, Marrickville, Rockdale, Miranda, or Silverwater test centres.'
        },
        {
          id: 'lesson-and-car-combo',
          number: '03',
          title: 'Lesson + Test Day Car Hire Package',
          shortDesc: 'Complete confidence package including 3 structured 90-minute driving lessons plus Test Day car hire and pre-test warmup drive.',
          badge: 'BEST VALUE',
          slug: 'lesson-and-car-combo',
          image: '/images/combo-pack.jpg',
          pricePlaceholder: '$430 Total (Save $50)',
          idealFor: 'Learners preparing for their test within 2–4 weeks needing final route practice and vehicle familiarity.'
        },
        {
          id: 'test-preparation',
          number: '04',
          title: 'Service NSW Mock Driving Test Audit',
          shortDesc: 'Realistic 60-minute mock test conducted under strict Service NSW examination criteria with itemized score sheet evaluation.',
          badge: 'AUDIT SPECIAL',
          slug: 'test-preparation',
          image: '/images/mock-test.jpg',
          pricePlaceholder: '$95 / 75-Min Audit Session',
          idealFor: 'Learners who want to eliminate test anxiety and identify critical error risks before the actual exam.'
        }
      ];
      res.json({ success: true, count: fallbackServices.length, data: fallbackServices });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/services/:id - Fetch service by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isPgConnected) {
      const result = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        res.status(404).json({ success: false, error: 'Service not found' });
        return;
      }
      res.json({ success: true, data: result.rows[0] });
    } else {
      res.status(404).json({ success: false, error: 'Service not found in offline mode' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
