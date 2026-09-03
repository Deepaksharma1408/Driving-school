import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { pool, isPgConnected, inMemoryStore } from '../db/database.js';
import { authenticateToken, requireRole, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// Zod Schema for updating school settings
const settingsSchema = z.object({
  schoolName: z.string().min(2, 'School name must be at least 2 characters'),
  phone: z.string().min(5, 'Phone number must be provided'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(3, 'Address must be provided'),
  operatingHours: z.string().optional(),
  serviceArea: z.string().optional(),
  tagline: z.string().optional()
});

// GET /api/settings - Fetch current Driving School settings
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    if (isPgConnected) {
      const result = await pool.query('SELECT key, value FROM settings');
      if (result.rows.length > 0) {
        const settingsObj: Record<string, string> = {};
        result.rows.forEach(r => { settingsObj[r.key] = r.value; });
        res.json({
          success: true,
          data: {
            schoolName: settingsObj.schoolName || inMemoryStore.businessSettings.schoolName,
            phone: settingsObj.phone || inMemoryStore.businessSettings.phone,
            email: settingsObj.email || inMemoryStore.businessSettings.email,
            address: settingsObj.address || inMemoryStore.businessSettings.address,
            operatingHours: settingsObj.operatingHours || inMemoryStore.businessSettings.operatingHours,
            serviceArea: settingsObj.serviceArea || inMemoryStore.businessSettings.serviceArea,
            tagline: settingsObj.tagline || inMemoryStore.businessSettings.tagline
          }
        });
        return;
      }
    }

    res.json({
      success: true,
      data: inMemoryStore.businessSettings
    });
  } catch (err: any) {
    console.error('Error fetching settings:', err);
    res.json({
      success: true,
      data: inMemoryStore.businessSettings
    });
  }
});

// PUT /api/settings - Update Driving School Settings (Admin ONLY)
router.put('/', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const parseResult = settingsSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: parseResult.error.issues.map((e: any) => e.message)
      });
      return;
    }

    const { schoolName, phone, email, address, operatingHours = 'Mon – Sun: 7:00 AM – 7:00 PM', serviceArea = 'Greater Sydney & Surrounding NSW Service Centres', tagline = 'Get your Australian driver\'s licence with confidence.' } = parseResult.data;

    // Update inMemoryStore
    inMemoryStore.businessSettings = {
      schoolName,
      phone,
      email,
      address,
      operatingHours,
      serviceArea,
      tagline
    };

    if (isPgConnected) {
      try {
        await pool.query(`
          CREATE TABLE IF NOT EXISTS settings (
            key VARCHAR(100) PRIMARY KEY,
            value TEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);

        const updates = [
          ['schoolName', schoolName],
          ['phone', phone],
          ['email', email],
          ['address', address],
          ['operatingHours', operatingHours],
          ['serviceArea', serviceArea],
          ['tagline', tagline]
        ];

        for (const [key, val] of updates) {
          await pool.query(`
            INSERT INTO settings (key, value, updated_at)
            VALUES ($1, $2, CURRENT_TIMESTAMP)
            ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP
          `, [key, val]);
        }
      } catch (dbErr: any) {
        console.warn('DB settings table update warning:', dbErr.message);
      }
    }

    res.json({
      success: true,
      message: 'Driving School settings updated successfully!',
      data: inMemoryStore.businessSettings
    });
  } catch (err: any) {
    console.error('Error updating settings:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to update settings',
      details: err.message
    });
  }
});

export default router;
