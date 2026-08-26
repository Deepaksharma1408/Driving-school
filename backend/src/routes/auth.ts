import { Router, Request, Response } from 'express';

const router = Router();

// POST /api/auth/login - Admin Login Endpoint
router.post('/login', (req: Request, res: Response): void => {
  const { username, password } = req.body;

  // Standard Admin credentials check
  if ((username === 'admin' || username === 'instructor') && (password === 'admin123' || password === 'canguruber2026')) {
    res.json({
      success: true,
      token: 'jwt_admin_token_canguruber_2026_verified',
      user: {
        id: 'usr-admin-01',
        name: 'Head Instructor (Admin)',
        email: 'admin@canguruber.com.au',
        role: 'admin'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid admin username or password. (Default: admin / admin123)'
    });
  }
});

export default router;
