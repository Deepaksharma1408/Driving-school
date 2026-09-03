import twilio from 'twilio';

// Masking helpers for privacy compliance in production logs
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '***@***.com';
  const [local, domain] = email.split('@');
  const maskedLocal = local.length > 2 ? `${local[0]}***${local[local.length - 1]}` : '***';
  return `${maskedLocal}@${domain}`;
}

export function maskPhone(phone: string): string {
  if (!phone || phone.length < 4) return '******';
  return `******${phone.slice(-4)}`;
}

// Dynamic Client Initializations & Configuration Checks
export function getBrevoApiKey(): string | undefined {
  return process.env.BREVO_API_KEY;
}

export function getBrevoSenderEmail(): string {
  return process.env.BREVO_SENDER_EMAIL || 'contact@drivinity.com';
}

export function isEmailConfigured(): boolean {
  const key = getBrevoApiKey();
  return !!key && key.trim() !== '' && !key.includes('your_');
}

export function isTwilioConfigured(): boolean {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const phone = process.env.TWILIO_PHONE_NUMBER;
  return !!(sid && token && phone && !sid.includes('your_'));
}

// Initial Startup Warning Diagnostics
export function checkNotificationProvidersOnStartup(): void {
  if (!isEmailConfigured()) {
    console.warn('⚠️ WARNING: BREVO_API_KEY is not configured in environment variables. Email notifications will run in graceful no-op mode.');
  } else {
    console.log(`✅ Brevo Email Provider configured. (Sender: ${getBrevoSenderEmail()})`);
  }

  if (!isTwilioConfigured()) {
    console.warn('⚠️ WARNING: Twilio credentials (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER) are not configured. SMS notifications will run in graceful no-op mode.');
  } else {
    console.log('✅ Twilio SMS Provider configured.');
  }
}

export interface SendEmailPayload {
  recipientEmail: string;
  fullName: string;
  bookingRef: string;
  serviceTitle: string;
  date: string;
  timeSlot: string;
  pickupAddress?: string;
  isReminder?: boolean;
}

export interface SendSmsPayload {
  recipientPhone: string;
  fullName: string;
  bookingRef: string;
  date: string;
  timeSlot: string;
  isReminder?: boolean;
}

/**
 * Dispatch booking confirmation or reminder email via Brevo Transactional API (https://api.brevo.com/v3/smtp/email)
 */
export async function sendBookingEmail(payload: SendEmailPayload) {
  const masked = maskEmail(payload.recipientEmail);
  const brevoApiKey = getBrevoApiKey();
  const brevoSenderEmail = getBrevoSenderEmail();

  if (!isEmailConfigured() || !brevoApiKey) {
    console.log(`ℹ️ [NO-OP EMAIL] Brevo API key not configured. Skipped dispatch to ${masked} for ${payload.bookingRef}`);
    return {
      success: false,
      configured: false,
      message: 'BREVO_API_KEY is not configured in environment variables.',
      recipientEmail: masked
    };
  }

  try {
    const subject = payload.isReminder
      ? `⏰ Reminder: Driving Session Tomorrow (${payload.date}) - Drivinity`
      : `🚗 Booking Confirmed: ${payload.bookingRef} - Drivinity Driving Academy`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
        <h2 style="color: #07131D; margin-top: 0;">Drivinity Driving Academy</h2>
        <p>Hi <strong>${payload.fullName}</strong>,</p>
        <p>${payload.isReminder ? 'This is a friendly reminder for your upcoming driving session tomorrow:' : 'Your driving session booking has been successfully confirmed!'}</p>
        
        <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 4px 0;"><strong>Booking Reference:</strong> ${payload.bookingRef}</p>
          <p style="margin: 4px 0;"><strong>Service:</strong> ${payload.serviceTitle || 'Professional Driving Lesson'}</p>
          <p style="margin: 4px 0;"><strong>Date:</strong> ${payload.date}</p>
          <p style="margin: 4px 0;"><strong>Time Slot:</strong> ${payload.timeSlot}</p>
          ${payload.pickupAddress ? `<p style="margin: 4px 0;"><strong>Pickup Address:</strong> ${payload.pickupAddress}</p>` : ''}
        </div>

        <p style="font-size: 14px; color: #64748b;">Please ensure you carry your physical or digital NSW Learner Licence for the session.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #94a3b8;">Drivinity Driving Academy • Sydney, NSW Australia</p>
      </div>
    `;

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: 'Drivinity Driving Academy',
          email: brevoSenderEmail
        },
        to: [
          {
            email: payload.recipientEmail,
            name: payload.fullName || 'Learner Driver'
          }
        ],
        subject,
        htmlContent
      })
    });

    const responseData: any = await res.json();

    if (!res.ok) {
      const errorMsg = responseData.message || responseData.code || `HTTP ${res.status}`;
      console.error(`❌ [BREVO ERROR] Email delivery failed to ${masked}:`, errorMsg);
      return {
        success: false,
        configured: true,
        error: errorMsg,
        recipientEmail: masked
      };
    }

    console.log(`📧 [BREVO DELIVERED] ${payload.isReminder ? 'Reminder' : 'Confirmation'} sent to ${masked} (Message ID: ${responseData.messageId || 'OK'})`);
    return {
      success: true,
      configured: true,
      data: responseData,
      recipientEmail: masked
    };
  } catch (err: any) {
    console.error(`❌ [BREVO NETWORK ERROR] Email delivery failed to ${masked}:`, err.message);
    return {
      success: false,
      configured: true,
      error: err.message,
      recipientEmail: masked
    };
  }
}

/**
 * Dispatch booking confirmation or reminder SMS via Twilio API
 */
export async function sendBookingSms(payload: SendSmsPayload) {
  const masked = maskPhone(payload.recipientPhone);

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const phone = process.env.TWILIO_PHONE_NUMBER;

  if (!isTwilioConfigured() || !sid || !token || !phone) {
    console.log(`ℹ️ [NO-OP SMS] Provider not configured. Skipped dispatch to ${masked} for ${payload.bookingRef}`);
    return {
      success: false,
      configured: false,
      message: 'Twilio credentials are not configured in environment variables.',
      recipientPhone: masked
    };
  }

  try {
    const twilioClient = twilio(sid, token);
    const body = payload.isReminder
      ? `REMINDER: Hi ${payload.fullName}, your Drivinity driving session is tomorrow (${payload.date} @ ${payload.timeSlot}). Ref: ${payload.bookingRef}.`
      : `CONFIRMED: Hi ${payload.fullName}, your Drivinity driving lesson is confirmed for ${payload.date} @ ${payload.timeSlot}. Ref: ${payload.bookingRef}.`;

    const message = await twilioClient.messages.create({
      body,
      from: phone,
      to: payload.recipientPhone
    });

    console.log(`📱 [TWILIO SENT] ${payload.isReminder ? 'Reminder' : 'Confirmation'} SMS sent to ${masked} (Ref: ${payload.bookingRef})`);
    return {
      success: true,
      configured: true,
      sid: message.sid,
      recipientPhone: masked
    };
  } catch (err: any) {
    console.error(`❌ [TWILIO ERROR] SMS delivery failed to ${masked}:`, err.message);
    return {
      success: false,
      configured: true,
      error: err.message,
      recipientPhone: masked
    };
  }
}
