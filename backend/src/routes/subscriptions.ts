import { Router, Request, Response } from 'express';
import { pool, isPgConnected, inMemoryStore } from '../db/database.js';

const router = Router();

// POST /api/subscriptions - Subscribe to newsletter updates
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      res.status(400).json({
        success: false,
        error: 'A valid email address is required to subscribe.'
      });
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const subId = `SUB-${Date.now().toString().slice(-6)}`;
    const nowIso = new Date().toISOString();

    const newSub = {
      id: subId,
      email: trimmedEmail,
      status: 'subscribed',
      createdAt: nowIso
    };

    if (isPgConnected) {
      await pool.query(
        `INSERT INTO subscriptions (id, email, status)
         VALUES ($1, $2, $3)
         ON CONFLICT (email) DO NOTHING`,
        [subId, trimmedEmail, 'subscribed']
      );
    } else {
      const existing = inMemoryStore.subscriptions.find((s: any) => s.email === trimmedEmail);
      if (!existing) {
        inMemoryStore.subscriptions.unshift(newSub);
      }
    }

    console.log(`📩 New Newsletter Subscriber Saved: ${trimmedEmail}`);

    res.status(201).json({
      success: true,
      message: 'Subscribed to NSW driving updates successfully!',
      data: newSub
    });
  } catch (err: any) {
    console.error('Error saving newsletter subscription:', err);
    res.status(500).json({ success: false, error: 'Failed to save subscription', details: err.message });
  }
});

// GET /api/subscriptions - List newsletter subscribers (admin)
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    if (isPgConnected) {
      const result = await pool.query('SELECT * FROM subscriptions ORDER BY created_at DESC');
      res.json({ success: true, count: result.rows.length, data: result.rows });
    } else {
      res.json({ success: true, count: inMemoryStore.subscriptions.length, data: inMemoryStore.subscriptions });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
