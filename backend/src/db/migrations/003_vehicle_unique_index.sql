-- Migration 003: Vehicle Unique Index
-- Symmetric partial unique index preventing double-booking the same vehicle for active time slots

CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_active_vehicle_booking 
  ON bookings (vehicle_id, date, time_slot) 
  WHERE status != 'cancelled' AND vehicle_id IS NOT NULL;
