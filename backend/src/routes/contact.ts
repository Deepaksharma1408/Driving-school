import { Router, Request, Response } from 'express';
import { pool, isPgConnected, inMemoryStore } from '../db/database.js';

const router = Router();

// POST /api/contact - Submit contact form inquiry
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, suburb, serviceInterest, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        error: 'Name, email, and message are required fields.'
      });
      return;
    }

    const inquiryId = `INQ-${Date.now().toString().slice(-6)}`;

    const newInquiry = {
      id: inquiryId,
      name,
      email,
      phone: phone || '',
      suburb: suburb || '',
      serviceInterest: serviceInterest || 'driving-lesson',
      message,
      status: 'unread',
      createdAt: new Date().toISOString()
    };

    if (isPgConnected) {
      await pool.query(
        `INSERT INTO contact_inquiries (id, name, email, phone, suburb, service_interest, message, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [inquiryId, name, email, phone || '', suburb || '', serviceInterest || 'driving-lesson', message, 'unread']
      );
    } else {
      inMemoryStore.contactInquiries.unshift(newInquiry);
    }

    console.log(`📩 New Contact Form Inquiry Recorded from ${name} (${email})`);

    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully! Our instructor will contact you shortly.',
      inquiryId,
      data: newInquiry
    });
  } catch (err: any) {
    console.error('Error recording contact inquiry:', err);
    res.status(500).json({ success: false, error: 'Failed to record inquiry', details: err.message });
  }
});

// GET /api/contact - Retrieve all contact inquiries
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    if (isPgConnected) {
      const result = await pool.query('SELECT * FROM contact_inquiries ORDER BY created_at DESC');
      res.json({ success: true, count: result.rows.length, data: result.rows });
    } else {
      res.json({ success: true, count: inMemoryStore.contactInquiries.length, data: inMemoryStore.contactInquiries });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
