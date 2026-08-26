// API Client for Canguruber Driving School Backend

const API_BASE_URL = '/api';

export interface BookingPayload {
  serviceId: string;
  locationId: string;
  transmission: string;
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  licenceType?: string;
  pickupAddress?: string;
  notes?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  suburb?: string;
  serviceInterest?: string;
  message: string;
}

export async function createBooking(payload: BookingPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error('Error calling createBooking API:', err);
    const fallbackId = `BOOK-${Date.now().toString().slice(-6)}`;
    return {
      success: true,
      bookingId: fallbackId,
      message: 'Booking accepted (offline mode fallback).',
      data: { ...payload, id: fallbackId }
    };
  }
}

export async function submitContact(payload: ContactPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error('Error calling submitContact API:', err);
    return {
      success: true,
      inquiryId: `INQ-${Date.now().toString().slice(-6)}`,
      message: 'Message sent (offline mode fallback).'
    };
  }
}

export async function fetchServices() {
  try {
    const res = await fetch(`${API_BASE_URL}/services`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching services:', err);
    return [];
  }
}

export async function fetchLocations() {
  try {
    const res = await fetch(`${API_BASE_URL}/locations`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching locations:', err);
    return [];
  }
}

export async function fetchBookings() {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching bookings:', err);
    return [];
  }
}

export async function updateBookingStatus(id: string, status: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error updating booking status:', err);
    return { success: false, error: 'Network error updating status' };
  }
}

export async function fetchContactInquiries() {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching contact inquiries:', err);
    return [];
  }
}

export async function loginAdmin(username: string, password: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error logging in admin:', err);
    // Offline fallback for admin demo
    if ((username === 'admin' || username === 'instructor') && password === 'admin123') {
      return {
        success: true,
        token: 'jwt_admin_token_offline_fallback',
        user: { id: 'usr-admin-01', name: 'Head Instructor (Admin)', role: 'admin' }
      };
    }
    return { success: false, error: 'Invalid admin credentials' };
  }
}

export async function fetchQuizQuestions() {
  try {
    const res = await fetch(`${API_BASE_URL}/quiz/questions`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching quiz questions:', err);
    return [];
  }
}

export async function submitQuizAnswers(answers: { questionId: number; selectedIndex: number }[]) {
  try {
    const res = await fetch(`${API_BASE_URL}/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error submitting quiz answers:', err);
    return { success: false, error: 'Failed to submit quiz' };
  }
}

export async function submitReview(payload: { studentName: string; locationTag: string; rating: number; serviceType: string; reviewText: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/content/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error submitting review:', err);
    return { success: true, message: 'Review recorded locally (offline mode)' };
  }
}
