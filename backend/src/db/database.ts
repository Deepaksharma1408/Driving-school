import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { runMigrations } from './migrate.js';
import { runSeeds } from './seed.js';

dotenv.config();

const { Pool } = pg;

// PostgreSQL pool configuration with env variables or standard defaults
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/drivinity_db',
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || '5432'),
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'drivinity_db',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000,
  ssl: process.env.NODE_ENV === 'production' || process.env.DATABASE_URL?.includes('render.com') || process.env.DATABASE_URL?.includes('supabase.co')
    ? { rejectUnauthorized: false }
    : false
});

export let isPgConnected = false;

const defaultAdminPasswordHash = bcrypt.hashSync('admin123', 10);

// Fallback in-memory data store in case local PostgreSQL DB service is not actively running
export const inMemoryStore = {
  bookings: [] as any[],
  contactInquiries: [] as any[],
  users: [
    { id: 'usr-admin-01', fullName: 'Head Instructor (Admin)', email: 'admin@drivinity.com', phone: '0400000000', passwordHash: defaultAdminPasswordHash, role: 'admin' },
    { id: 'usr-admin-02', fullName: 'Head Instructor (Admin Legacy)', email: 'admin@canguruber.com.au', phone: '0400000000', passwordHash: defaultAdminPasswordHash, role: 'admin' },
    { id: 'usr-inst-01', fullName: 'John Doe', email: 'john.d@drivinity.com', phone: '0411222333', passwordHash: defaultAdminPasswordHash, role: 'instructor' },
    { id: 'usr-stud-01', fullName: 'Alex Smith', email: 'alex.s@gmail.com', phone: '0433444555', passwordHash: defaultAdminPasswordHash, role: 'student' }
  ] as any[],
  instructors: [
    { id: 'inst-01', userId: 'usr-inst-01', licenseNumber: 'NSW-INST-8821', transmissionTypes: ['automatic', 'manual'], activeStatus: true, todayBookingsCount: 0 }
  ] as any[],
  vehicles: [
    { id: 'veh-01', registrationNumber: 'DRV-990-NSW', transmission: 'automatic', instructorId: 'inst-01', instructorName: 'John Doe', activeStatus: true, todayBookingsCount: 0 }
  ] as any[],
  progressSkills: [] as any[],
  studentProgress: [] as any[],
  badges: [] as any[],
  studentBadges: [] as any[],
  businessSettings: {
    schoolName: 'Drivinity Driving Academy',
    phone: '1300 855 374',
    email: 'contact@drivinity.com',
    address: 'Suite 100, Innovation Way, Sydney NSW Australia',
    operatingHours: 'Mon – Sun: 7:00 AM – 7:00 PM',
    serviceArea: 'Greater Sydney & Surrounding NSW Service Centres',
    tagline: 'Get your Australian driver\'s licence with confidence.'
  }
};

export async function initDb(): Promise<void> {
  try {
    const client = await pool.connect();
    isPgConnected = true;
    client.release();
    console.log('✅ PostgreSQL Database connected successfully!');

    // 1. Run Migrations
    const migrationsOk = await runMigrations();

    // 2. Run Seed Script if migrations ran
    if (migrationsOk) {
      await runSeeds();
    }

    console.log('✅ Database Initialization complete.');
  } catch (err: any) {
    isPgConnected = false;
    console.warn(`⚠️ Could not connect to local PostgreSQL instance (${err.message}). Falling back to active in-memory API data engine.`);
  }
}
