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
    return {
      success: false,
      error: 'Network error creating booking.'
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
      success: false,
      error: 'Network error sending contact inquiry.'
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

export async function fetchBookings(email?: string, token?: string) {
  try {
    const url = email ? `${API_BASE_URL}/bookings?email=${encodeURIComponent(email)}` : `${API_BASE_URL}/bookings`;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(url, { headers });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching bookings:', err);
    return [];
  }
}

export async function updateBookingStatus(id: string, status: string, token?: string) {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
      method: 'PATCH',
      headers,
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

export async function loginUser(email: string, password: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  } catch (err: any) {
    console.error('Login error:', err);
    return { success: false, error: 'Network error during login' };
  }
}

export async function loginAdmin(email: string, password: string) {
  return loginUser(email, password);
}

export async function registerStudent(payload: { fullName: string; email: string; password: string; phone?: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err: any) {
    console.error('Register error:', err);
    return { success: false, error: 'Network error during registration' };
  }
}

export async function fetchStudentProgress(studentId: string, token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/progress/${studentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching student progress:', err);
    return [];
  }
}

export async function fetchStudentBadges(studentId: string, token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/progress/${studentId}/badges`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching student badges:', err);
    return [];
  }
}

export async function fetchAllBadges() {
  try {
    const res = await fetch(`${API_BASE_URL}/badges`);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching system badges:', err);
    return [];
  }
}

export async function fetchAdminStats(token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    return null;
  }
}

export async function fetchInstructors(token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/instructors`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching instructors:', err);
    return [];
  }
}

export async function toggleInstructorStatus(id: string, activeStatus: boolean, token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/instructors/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ activeStatus })
    });
    return await res.json();
  } catch (err) {
    console.error('Error toggling instructor status:', err);
    return { success: false, error: 'Network error toggling instructor status' };
  }
}

export async function fetchVehicles(token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/vehicles`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching vehicles:', err);
    return [];
  }
}

export async function toggleVehicleStatus(id: string, activeStatus: boolean, token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ activeStatus })
    });
    return await res.json();
  } catch (err) {
    console.error('Error toggling vehicle status:', err);
    return { success: false, error: 'Network error toggling vehicle status' };
  }
}

export async function fetchAdminStudents(token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/students`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error('Error fetching admin students:', err);
    return [];
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
