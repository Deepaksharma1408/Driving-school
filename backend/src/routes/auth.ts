import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { pool, isPgConnected, inMemoryStore } from '../db/database.js';
import { getJwtSecret, authenticateToken, requireRole, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// Input Validation Schemas
const publicRegisterSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional()
});

const createStaffSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
  role: z.enum(['instructor', 'admin']),
  licenseNumber: z.string().optional(),
  transmissionTypes: z.array(z.string()).optional()
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(1, 'Password is required')
});

// POST /api/auth/register - Public endpoint (FORCED to role='student' ONLY)
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = publicRegisterSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: parseResult.error.issues.map((e: any) => e.message)
      });
      return;
    }

    const { fullName, email, password, phone = '' } = parseResult.data;
    const lowerEmail = email.toLowerCase().trim();

    // FORCE role to 'student' server-side regardless of any input payload
    const role = 'student';

    // Check existing email
    if (isPgConnected) {
      const existing = await pool.query('SELECT id FROM users WHERE LOWER(email) = $1', [lowerEmail]);
      if (existing.rows.length > 0) {
        res.status(409).json({
          success: false,
          error: 'An account with this email address already exists.'
        });
        return;
      }
    } else {
      const existing = inMemoryStore.users.find(u => u.email.toLowerCase() === lowerEmail);
      if (existing) {
        res.status(409).json({
          success: false,
          error: 'An account with this email address already exists.'
        });
        return;
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `usr-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

    const newUser = {
      id: userId,
      fullName,
      email: lowerEmail,
      phone,
      passwordHash,
      role,
      createdAt: new Date().toISOString()
    };

    if (isPgConnected) {
      await pool.query(
        `INSERT INTO users (id, full_name, email, phone, password_hash, role)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [userId, fullName, lowerEmail, phone, passwordHash, role]
      );
    } else {
      inMemoryStore.users.push(newUser);
    }

    // Issue JWT Token
    const token = jwt.sign(
      { userId, email: lowerEmail, role },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Student account registered successfully!',
      token,
      user: {
        id: userId,
        fullName,
        email: lowerEmail,
        phone,
        role
      }
    });
  } catch (err: any) {
    console.error('Error during registration:', err);
    res.status(500).json({
      success: false,
      error: 'Registration failed',
      details: err.message
    });
  }
});

// POST /api/auth/create-staff - Protected endpoint (Admin ONLY can create instructor/admin staff accounts)
router.post('/create-staff', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const parseResult = createStaffSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: parseResult.error.issues.map((e: any) => e.message)
      });
      return;
    }

    const { fullName, email, password, phone = '', role, licenseNumber, transmissionTypes = ['automatic', 'manual'] } = parseResult.data;
    const lowerEmail = email.toLowerCase().trim();

    // Check existing email
    if (isPgConnected) {
      const existing = await pool.query('SELECT id FROM users WHERE LOWER(email) = $1', [lowerEmail]);
      if (existing.rows.length > 0) {
        res.status(409).json({
          success: false,
          error: 'An account with this email address already exists.'
        });
        return;
      }
    } else {
      const existing = inMemoryStore.users.find(u => u.email.toLowerCase() === lowerEmail);
      if (existing) {
        res.status(409).json({
          success: false,
          error: 'An account with this email address already exists.'
        });
        return;
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = `usr-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

    const newUser = {
      id: userId,
      fullName,
      email: lowerEmail,
      phone,
      passwordHash,
      role,
      createdAt: new Date().toISOString()
    };

    if (isPgConnected) {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');

        await client.query(
          `INSERT INTO users (id, full_name, email, phone, password_hash, role)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [userId, fullName, lowerEmail, phone, passwordHash, role]
        );

        if (role === 'instructor') {
          const instructorId = `inst-${Date.now()}`;
          await client.query(
            `INSERT INTO instructors (id, user_id, license_number, transmission_types, active_status)
             VALUES ($1, $2, $3, $4, $5)`,
            [instructorId, userId, licenseNumber || 'NSW-PENDING', transmissionTypes, true]
          );
        }

        await client.query('COMMIT');
      } catch (err: any) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } else {
      inMemoryStore.users.push(newUser);
      if (role === 'instructor') {
        inMemoryStore.instructors.push({
          id: `inst-${Date.now()}`,
          userId,
          licenseNumber: licenseNumber || 'NSW-PENDING',
          transmissionTypes,
          activeStatus: true
        });
      }
    }

    res.status(201).json({
      success: true,
      message: `Staff account (${role}) created successfully!`,
      user: {
        id: userId,
        fullName,
        email: lowerEmail,
        phone,
        role
      }
    });
  } catch (err: any) {
    console.error('Error creating staff account:', err);
    res.status(500).json({
      success: false,
      error: 'Staff creation failed',
      details: err.message
    });
  }
});

// POST /api/auth/login - Authenticate user against users table & issue JWT
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: parseResult.error.issues.map((e: any) => e.message)
      });
      return;
    }

    const { email, password } = parseResult.data;
    const lowerEmail = email.toLowerCase().trim();

    let user: any = null;

    if (isPgConnected) {
      const result = await pool.query(
        'SELECT id, full_name, email, phone, password_hash, role FROM users WHERE LOWER(email) = $1',
        [lowerEmail]
      );
      if (result.rows.length > 0) {
        const row = result.rows[0];
        user = {
          id: row.id,
          fullName: row.full_name,
          email: row.email,
          phone: row.phone,
          passwordHash: row.password_hash,
          role: row.role
        };
      }
    } else {
      user = inMemoryStore.users.find(u => u.email.toLowerCase() === lowerEmail);
    }

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid email address or password.'
      });
      return;
    }

    // Verify Password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        error: 'Invalid email address or password.'
      });
      return;
    }

    // Issue Signed JWT Token (7-day expiration)
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        name: user.fullName || user.name,
        fullName: user.fullName || user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err: any) {
    console.error('Error during login:', err);
    res.status(500).json({
      success: false,
      error: 'Login failed',
      details: err.message
    });
  }
});

// GET /api/auth/me - Retrieve current authenticated user profile
router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (isPgConnected) {
      const result = await pool.query(
        'SELECT id, full_name, email, phone, role, created_at FROM users WHERE id = $1',
        [userId]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ success: false, error: 'User profile not found.' });
        return;
      }
      const row = result.rows[0];
      res.json({
        success: true,
        user: {
          id: row.id,
          name: row.full_name,
          fullName: row.full_name,
          email: row.email,
          phone: row.phone,
          role: row.role,
          createdAt: row.created_at
        }
      });
    } else {
      const user = inMemoryStore.users.find(u => u.id === userId);
      if (!user) {
        res.status(404).json({ success: false, error: 'User profile not found.' });
        return;
      }
      res.json({
        success: true,
        user: {
          id: user.id,
          name: user.fullName || user.name,
          fullName: user.fullName || user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          createdAt: user.createdAt
        }
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
