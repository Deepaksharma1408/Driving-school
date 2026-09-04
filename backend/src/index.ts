import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger.js';
import { initDb } from './db/database.js';
import authRouter from './routes/auth.js';
import bookingsRouter from './routes/bookings.js';
import contactRouter from './routes/contact.js';
import servicesRouter from './routes/services.js';
import locationsRouter from './routes/locations.js';
import contentRouter from './routes/content.js';
import quizRouter from './routes/quiz.js';
import notificationsRouter from './routes/notifications.js';
import progressRouter from './routes/progress.js';
import adminRouter from './routes/admin.js';
import settingsRouter from './routes/settings.js';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Swagger Interactive API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Welcome Root Endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: '🚗 Driving School API Backend is Live & Running!',
    healthCheck: '/api/health',
    swaggerDocs: '/api-docs'
  });
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'Drivinity Driving Academy SaaS API Backend',
    timestamp: new Date().toISOString(),
    database: 'PostgreSQL',
    swaggerDocs: `http://localhost:${PORT}/api-docs`
  });
});

// Mounting API Routes
app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/services', servicesRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/content', contentRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/progress', progressRouter);
app.use('/api', adminRouter);
app.use('/api/settings', settingsRouter);

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled API Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'API Endpoint Not Found'
  });
});

import { checkNotificationProvidersOnStartup } from './services/notificationService.js';
import { initDailyReminderCron } from './jobs/reminderCron.js';

// Server Initialization
async function startServer() {
  if (!process.env.JWT_SECRET) {
    console.warn('⚠️ WARNING: JWT_SECRET environment variable not explicitly set. Using production default key.');
    process.env.JWT_SECRET = 'drivinity_jwt_secret_key_2026_super_secure_production';
  }

  // Diagnostic warning checks for notification providers
  checkNotificationProvidersOnStartup();

  await initDb();
  
  // Initialize daily reminder background cron schedule
  initDailyReminderCron();
  app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`🚗 Drivinity Driving Academy SaaS Backend Running!`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`📚 Swagger UI: http://localhost:${PORT}/api-docs`);
    console.log(`⚡ Health Check: http://localhost:${PORT}/api/health`);
    console.log(`===================================================`);
  });
}

startServer();
