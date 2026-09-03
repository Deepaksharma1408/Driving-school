-- Migration 002: Extend Driving School Schema
-- Adds users, instructors, vehicles, progress_skills, student_progress, badges, student_badges tables
-- Alters bookings table to link instructor_id, vehicle_id, and prevent double-booking

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(50) PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'instructor', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Instructors Table
CREATE TABLE IF NOT EXISTS instructors (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  license_number VARCHAR(100),
  transmission_types TEXT[] DEFAULT '{automatic,manual}',
  active_status BOOLEAN DEFAULT true
);

-- 3. Vehicles Table
CREATE TABLE IF NOT EXISTS vehicles (
  id VARCHAR(50) PRIMARY KEY,
  registration_number VARCHAR(50) UNIQUE NOT NULL,
  transmission VARCHAR(20) NOT NULL CHECK (transmission IN ('automatic', 'manual')),
  instructor_id VARCHAR(50) REFERENCES instructors(id) ON DELETE SET NULL,
  active_status BOOLEAN DEFAULT true
);

-- 4. Progress Skills Table
CREATE TABLE IF NOT EXISTS progress_skills (
  id VARCHAR(50) PRIMARY KEY,
  skill_name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  display_order INT DEFAULT 0
);

-- 5. Student Progress Table
CREATE TABLE IF NOT EXISTS student_progress (
  id VARCHAR(50) PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill_id VARCHAR(50) NOT NULL REFERENCES progress_skills(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'mastered')),
  instructor_notes TEXT,
  updated_by VARCHAR(50) REFERENCES instructors(id) ON DELETE SET NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_student_skill UNIQUE (student_id, skill_id)
);

-- 6. Badges Table
CREATE TABLE IF NOT EXISTS badges (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  criteria_json JSONB
);

-- 7. Student Badges Table
CREATE TABLE IF NOT EXISTS student_badges (
  id VARCHAR(50) PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id VARCHAR(50) NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_student_badge UNIQUE (student_id, badge_id)
);

-- 8. Alter Bookings Table to add instructor_id, vehicle_id, and partial unique index
ALTER TABLE bookings 
  ADD COLUMN IF NOT EXISTS instructor_id VARCHAR(50) REFERENCES instructors(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS vehicle_id VARCHAR(50) REFERENCES vehicles(id) ON DELETE SET NULL;

-- Prevent double-booking for the same instructor at the same date + time_slot unless cancelled
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_active_instructor_booking 
  ON bookings (instructor_id, date, time_slot) 
  WHERE status != 'cancelled' AND instructor_id IS NOT NULL;
