import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { sendBookingEmail, sendBookingSms, isEmailConfigured, isTwilioConfigured } from '../services/notificationService.js';
import { triggerDailyReminders } from '../jobs/reminderCron.js';
import { authenticateToken, requireRole, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

const sendNotificationSchema = z.object({
  recipientEmail: z.string().email('Invalid recipient email format'),
  recipientPhone: z.string().optional(),
  fullName: z.string().optional().default('Learner Driver'),
  bookingRef: z.string().min(1, 'Booking reference is required'),
  serviceTitle: z.string().optional().default('Driving Lesson'),
  date: z.string().min(1, 'Date is required'),
  timeSlot: z.string().min(1, 'Time slot is required'),
  pickupAddress: z.string().optional(),
  isReminder: z.boolean().optional().default(false)
});

// POST /api/notifications/send - Send real SMS & Email booking notification
router.post('/send', async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = sendNotificationSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: parseResult.error.issues.map((e: any) => e.message)
      });
      return;
    }

    const { recipientEmail, recipientPhone, fullName, bookingRef, serviceTitle, date, timeSlot, pickupAddress, isReminder } = parseResult.data;

    // Dispatch Email via Brevo
    const emailResult = await sendBookingEmail({
      recipientEmail,
      fullName,
      bookingRef,
      serviceTitle,
      date,
      timeSlot,
      pickupAddress,
      isReminder
    });

    // Dispatch SMS via Twilio if phone number provided
    let smsResult: any = { success: false, configured: isTwilioConfigured, message: 'Phone number not provided' };
    if (recipientPhone && recipientPhone.trim() !== '') {
      smsResult = await sendBookingSms({
        recipientPhone,
        fullName,
        bookingRef,
        date,
        timeSlot,
        isReminder
      });
    }

    const isAnySuccess = emailResult.success || smsResult.success;

    res.status(isAnySuccess ? 200 : (emailResult.configured || smsResult.configured ? 502 : 200)).json({
      success: isAnySuccess,
      message: isAnySuccess
        ? 'Notification dispatched successfully!'
        : 'Notification providers not configured or failed to deliver.',
      timestamp: new Date().toISOString(),
      providers: {
        emailConfigured: isEmailConfigured(),
        twilioConfigured: isTwilioConfigured()
      },
      emailResult,
      smsResult
    });
  } catch (err: any) {
    console.error('Error sending notification:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to dispatch notification',
      details: err.message
    });
  }
});

// POST /api/notifications/trigger-reminders - Manually trigger daily reminder scan (Admin ONLY)
router.post('/trigger-reminders', authenticateToken, requireRole('admin'), async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const stats = await triggerDailyReminders();
    res.json({
      success: true,
      message: 'Daily reminder scan completed.',
      stats
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
