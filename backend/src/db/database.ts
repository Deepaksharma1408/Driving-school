import pg from 'pg';
import dotenv from 'dotenv';
import { runMigrations } from './migrate.js';
import { runSeeds } from './seed.js';

dotenv.config();

const { Pool } = pg;

// PostgreSQL pool configuration with env variables or standard defaults
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/canguruber_db',
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || '5432'),
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'canguruber_db',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000,
  ssl: process.env.NODE_ENV === 'production' || process.env.DATABASE_URL?.includes('render.com') || process.env.DATABASE_URL?.includes('supabase.co')
    ? { rejectUnauthorized: false }
    : false
});

export let isPgConnected = false;

// Fallback in-memory data store in case local PostgreSQL DB service is not actively running
export const inMemoryStore = {
  bookings: [] as any[],
  contactInquiries: [] as any[],
  users: [] as any[],
  instructors: [] as any[],
  vehicles: [] as any[],
  progressSkills: [] as any[],
  studentProgress: [] as any[],
  badges: [] as any[],
  studentBadges: [] as any[]
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
