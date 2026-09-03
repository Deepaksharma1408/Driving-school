# 🧪 Booking Engine & Auth System Test Plan Checklist

This document details the test scenarios and validation steps to verify the production-grade Conflict Prevention Booking Engine and JWT Authentication system for Canguruber Driving School.

---

## 📋 Test Scenarios & Verification Matrix

### 1. 🛑 Double-Booking Prevention (Pre-Check)
- **Goal**: Verify that an explicit attempt to book an instructor or vehicle for an already-occupied time slot is rejected.
- **Pre-condition**: Booking `BOOK-001` exists for `instructorId: "inst-01"`, `date: "2026-09-15"`, `timeSlot: "09:30 AM - 11:00 AM"`, `status: "confirmed"`.
- **Test Request**: `POST /api/bookings` with `instructorId: "inst-01"`, `date: "2026-09-15"`, `timeSlot: "09:30 AM - 11:00 AM"`.
- **Expected Result**:
  - HTTP Status: `409 Conflict`
  - Response Body: `{ "success": false, "error": "Conflict: The selected instructor is already booked for this date and time slot." }`
  - Database: No duplicate record inserted.

---

### 2. ⚡ Concurrent Double-Booking Race Condition (DB Unique Index Hard Safety Net)
- **Goal**: Verify that if two concurrent requests bypass pre-checks simultaneously, the PostgreSQL partial unique index `idx_unique_active_instructor_booking` catches the collision.
- **Pre-condition**: Partial index active:
  ```sql
  CREATE UNIQUE INDEX idx_unique_active_instructor_booking 
  ON bookings (instructor_id, date, time_slot) 
  WHERE status != 'cancelled' AND instructor_id IS NOT NULL;
  ```
- **Test Execution**: Simulate 2 concurrent `POST /api/bookings` requests in parallel threads for `inst-01` at `2026-09-15 09:30 AM - 11:00 AM`.
- **Expected Result**:
  - Request 1: HTTP Status `201 Created`
  - Request 2: Postgres throws error `23505` (unique_violation), caught in catch block, transaction rolled back (`ROLLBACK`).
  - HTTP Status: `409 Conflict`
  - Response Body: `{ "success": false, "error": "Conflict: Race condition prevented double-booking for the selected instructor." }`

---

### 3. 🚗 Auto-Assignment of Available Instructor & Vehicle
- **Goal**: Verify that when `instructorId` and `vehicleId` are omitted from booking payload, the system automatically assigns the first available active instructor & vehicle matching the requested transmission.
- **Test Request**: `POST /api/bookings`
  ```json
  {
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "phone": "0412999888",
    "transmission": "automatic",
    "date": "2026-09-20",
    "timeSlot": "01:30 PM - 03:00 PM"
  }
  ```
- **Expected Result**:
  - HTTP Status: `201 Created`
  - Response Body contains assigned `instructorId` (e.g. `"inst-01"`) and `vehicleId` (e.g. `"veh-01"`).
  - Both assigned entities are confirmed free at `2026-09-20 01:30 PM - 03:00 PM`.

---

### 4. 🔒 JWT Authentication & Role-Based Access Control (RBAC)
- **Scenario 4A: Missing Bearer Token**
  - Request: `PATCH /api/bookings/BOOK-123/status` with no `Authorization` header.
  - Result: HTTP `401 Unauthorized` (`"Access denied. Authentication token required."`).

- **Scenario 4B: Invalid/Expired Token**
  - Request: `PATCH /api/bookings/BOOK-123/status` with `Authorization: Bearer invalid_token_xyz`.
  - Result: HTTP `401 Unauthorized` (`"Invalid or expired authentication token."`).

- **Scenario 4C: Unauthorized Role (Student attempting Admin Action)**
  - Request: `PATCH /api/bookings/BOOK-123/status` with student JWT token (`role: "student"`).
  - Result: HTTP `403 Forbidden` (`"Access forbidden. Required role: admin or instructor. Your role: student"`).

- **Scenario 4D: Valid Admin/Instructor Token**
  - Request: `PATCH /api/bookings/BOOK-123/status` with admin/instructor JWT token (`role: "admin"` or `"instructor"`).
  - Result: HTTP `200 OK` (`"Status updated successfully"`).

---

### 5. 🔄 Availability Matrix Query
- **Test Request**: `GET /api/bookings/availability?date=2026-09-20&transmission=automatic`
- **Expected Result**:
  - HTTP Status: `200 OK`
  - Array of 6 standard daily time slots listing `availableInstructorsCount`, `availableVehiclesCount`, and `isAvailable: true/false`.
