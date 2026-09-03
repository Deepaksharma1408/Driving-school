import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runMigrations(): Promise<boolean> {
  let client;
  try {
    client = await pool.connect();
    console.log('🔄 Running Database Migrations...');

    // 1. Ensure migrations table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Read migration files from migrations directory
    const migrationsDir = path.join(__dirname, 'migrations');
    if (!fs.existsSync(migrationsDir)) {
      console.warn(`⚠️ Migrations directory not found at ${migrationsDir}`);
      return false;
    }

    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    // 3. Get executed migrations
    const executedRes = await client.query('SELECT name FROM schema_migrations');
    const executedMigrations = new Set(executedRes.rows.map(r => r.name));

    let count = 0;
    for (const file of files) {
      if (!executedMigrations.has(file)) {
        console.log(`⏳ Applying migration: ${file}...`);
        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, 'utf8');

        try {
          await client.query('BEGIN');
          await client.query(sql);
          await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
          await client.query('COMMIT');
          console.log(`✅ Applied migration: ${file}`);
          count++;
        } catch (migErr: any) {
          await client.query('ROLLBACK');
          console.error(`❌ Migration failed (${file}):`, migErr.message);
          throw migErr;
        }
      }
    }

    if (count === 0) {
      console.log('✨ All migrations are up to date.');
    } else {
      console.log(`🎉 Successfully applied ${count} new migration(s).`);
    }

    return true;
  } catch (err: any) {
    console.warn(`⚠️ Could not complete migrations (${err.message}).`);
    return false;
  } finally {
    if (client) client.release();
  }
}

// Standalone execution entrypoint when run via CLI `npm run migrate`
if (process.argv[1] && process.argv[1].endsWith('migrate.ts')) {
  runMigrations().then(() => {
    process.exit(0);
  }).catch((err) => {
    console.error('Fatal migration error:', err);
    process.exit(1);
  });
}
