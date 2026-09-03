import cron from 'node-cron';
import { pool, isPgConnected, inMemoryStore } from '../db/database.js';
import { sendBookingEmail, sendBookingSms, maskEmail, maskPhone } from '../services/notificationService.js';

/**
 * Runs batch reminder process for all confirmed bookings scheduled for tomorrow
 */
export async function triggerDailyReminders(): Promise<{ processed: number; succeeded: number; failed: number }> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  console.log(`⏰ [CRON JOB] Starting daily booking reminder scan for date: ${tomorrowStr}...`);

  let targetBookings: any[] = [];

  try {
    if (isPgConnected) {
      const res = await pool.query(
        `SELECT id, service_id, date, time_slot, full_name, email, phone, pickup_address 
         FROM bookings 
         WHERE date = $1 AND status = 'confirmed'`,
        [tomorrowStr]
      );
      targetBookings = res.rows.map(r => ({
        id: r.id,
        serviceId: r.service_id,
        date: r.date,
        timeSlot: r.time_slot,
        fullName: r.full_name,
        email: r.email,
        phone: r.phone,
        pickupAddress: r.pickup_address
      }));
    } else {
      targetBookings = inMemoryStore.bookings.filter(
        b => b.date === tomorrowStr && b.status === 'confirmed'
      );
    }

    console.log(`⏰ [CRON JOB] Found ${targetBookings.length} confirmed booking(s) for tomorrow (${tomorrowStr}).`);

    let succeeded = 0;
    let failed = 0;

    for (const booking of targetBookings) {
      try {
        // Dispatch Email Reminder
        if (booking.email) {
          await sendBookingEmail({
            recipientEmail: booking.email,
            fullName: booking.fullName || 'Learner Driver',
            bookingRef: booking.id,
            serviceTitle: booking.serviceId || 'Driving Lesson',
            date: booking.date,
            timeSlot: booking.timeSlot,
            pickupAddress: booking.pickupAddress,
            isReminder: true
          });
        }

        // Dispatch SMS Reminder
        if (booking.phone) {
          await sendBookingSms({
            recipientPhone: booking.phone,
            fullName: booking.fullName || 'Learner Driver',
            bookingRef: booking.id,
            date: booking.date,
            timeSlot: booking.timeSlot,
            isReminder: true
          });
        }

        succeeded++;
      } catch (singleErr: any) {
        failed++;
        console.error(`❌ [CRON REMINDER ERROR] Failed dispatch for booking ${booking.id}:`, singleErr.message);
      }
    }

    console.log(`✅ [CRON JOB COMPLETE] Processed: ${targetBookings.length}, Succeeded: ${succeeded}, Failed: ${failed}`);
    return { processed: targetBookings.length, succeeded, failed };
  } catch (err: any) {
    console.error('❌ [CRON JOB FATAL ERROR] Failed batch reminder scan:', err.message);
    return { processed: 0, succeeded: 0, failed: 0 };
  }
}

/**
 * Initializes daily background cron schedule (runs at 08:00 AM every day)
 */
export function initDailyReminderCron(): void {
  // Schedule: 0 8 * * * = At 08:00 AM every day
  cron.schedule('0 8 * * *', () => {
    triggerDailyReminders();
  });
  console.log('⏰ Daily booking reminder cron job initialized (Scheduled for 08:00 AM daily).');
}
