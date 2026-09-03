-- Migration 001: Initial Schema
-- Creates initial core tables for Drivinity Driving Academy

CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(50) PRIMARY KEY,
  service_id VARCHAR(100) NOT NULL,
  location_id VARCHAR(100) NOT NULL,
  transmission VARCHAR(20) DEFAULT 'automatic',
  date VARCHAR(50) NOT NULL,
  time_slot VARCHAR(100) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  licence_type VARCHAR(100) DEFAULT 'NSW Learner Licence',
  pickup_address TEXT,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  suburb VARCHAR(100),
  service_interest VARCHAR(100),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(100) PRIMARY KEY,
  number VARCHAR(20),
  title VARCHAR(255) NOT NULL,
  short_desc TEXT,
  badge VARCHAR(100),
  slug VARCHAR(100),
  image TEXT,
  price_placeholder VARCHAR(100),
  ideal_for TEXT,
  highlights JSONB
);

CREATE TABLE IF NOT EXISTS test_locations (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  region VARCHAR(100),
  code VARCHAR(50),
  description TEXT,
  address_placeholder TEXT,
  test_center_type VARCHAR(100),
  is_popular BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(100) PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL,
  location_tag VARCHAR(100),
  rating INT DEFAULT 5,
  service_type VARCHAR(100),
  review_text TEXT,
  pass_status VARCHAR(100),
  date VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS blogs (
  id VARCHAR(100) PRIMARY KEY,
  slug VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  category VARCHAR(100),
  read_time VARCHAR(50),
  date VARCHAR(50),
  author VARCHAR(100),
  image TEXT,
  content JSONB
);
