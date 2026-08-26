import pg from 'pg';
import dotenv from 'dotenv';

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
});

export let isPgConnected = false;

// Fallback in-memory data store in case local PostgreSQL DB service is not actively running
export const inMemoryStore = {
  bookings: [] as any[],
  contactInquiries: [] as any[]
};

export async function initDb(): Promise<void> {
  try {
    const client = await pool.connect();
    isPgConnected = true;
    console.log('✅ PostgreSQL Database connected successfully!');

    // Create Tables
    await client.query(`
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
    `);

    // Seed Services if empty
    const servicesCount = await client.query('SELECT COUNT(*) FROM services');
    if (parseInt(servicesCount.rows[0].count) === 0) {
      await seedInitialData(client);
    }

    client.release();
    console.log('✅ PostgreSQL Schema & Seed check complete.');
  } catch (err: any) {
    isPgConnected = false;
    console.warn(`⚠️ Could not connect to local PostgreSQL instance (${err.message}). Falling back to active in-memory API data engine.`);
  }
}

async function seedInitialData(client: pg.PoolClient) {
  // Initial Services
  const initialServices = [
    {
      id: 'driving-lesson',
      number: '01',
      title: 'Professional Driving Lessons (Automatic)',
      shortDesc: 'Structured 1-on-1 driving instruction for learners of all experience levels in modern dual-control vehicles.',
      badge: 'POPULAR CHOICE',
      slug: 'driving-lessons',
      image: '/images/lesson-card.jpg',
      pricePlaceholder: '$75 / 1-Hour Session (Packages Available)',
      idealFor: 'Beginners starting from zero hours, logbook progression, or experienced drivers polishing test skills.',
      highlights: JSON.stringify([
        'Service NSW logbook hour credit calculation (1 hr = 3 logbook hrs up to 10 hrs)',
        'Modern late-model automatic vehicle with dual controls',
        'Pickup & drop-off available at home, school, or work in service area',
        'Customized lesson plans focused on your weak areas'
      ])
    },
    {
      id: 'car-hire-test',
      number: '02',
      title: 'Service NSW Test Day Car Hire & Warmup',
      shortDesc: 'Drive our dual-control, fully insured vehicle for your official Service NSW Practical Driving Test with a 45-min pre-test warmup drive.',
      badge: 'HIGH PASS RATE',
      slug: 'car-hire-test',
      image: '/images/test-hire.jpg',
      pricePlaceholder: '$220 (Warmup Drive + Test Car Hire)',
      idealFor: 'Learners taking their Service NSW Driving Test at Botany, Marrickville, Rockdale, Miranda, or Silverwater test centres.',
      highlights: JSON.stringify([
        '45-minute pre-test warmup drive on actual test routes',
        'Instructor attendance and support at the Service NSW centre',
        'Fully insured dual-control vehicle ready for examiner audit',
        'Debriefing and administrative assistance'
      ])
    },
    {
      id: 'lesson-and-car-combo',
      number: '03',
      title: 'Lesson + Test Day Car Hire Package',
      shortDesc: 'Complete confidence package including 3 structured 90-minute driving lessons plus Test Day car hire and pre-test warmup drive.',
      badge: 'BEST VALUE',
      slug: 'lesson-and-car-combo',
      image: '/images/combo-pack.jpg',
      pricePlaceholder: '$430 Total (Save $50)',
      idealFor: 'Learners preparing for their test within 2–4 weeks needing final route practice and vehicle familiarity.',
      highlights: JSON.stringify([
        '3 x 90-minute structured preparation lessons',
        'Full test day car hire + 45-min warmup drive',
        'Comprehensive mock test evaluation with scoring sheet',
        'Priority scheduling for test date'
      ])
    },
    {
      id: 'test-preparation',
      number: '04',
      title: 'Service NSW Mock Driving Test Audit',
      shortDesc: 'Realistic 60-minute mock test conducted under strict Service NSW examination criteria with itemized score sheet evaluation.',
      badge: 'AUDIT SPECIAL',
      slug: 'test-preparation',
      image: '/images/mock-test.jpg',
      pricePlaceholder: '$95 / 75-Min Audit Session',
      idealFor: 'Learners who want to eliminate test anxiety and identify critical error risks before the actual exam.',
      highlights: JSON.stringify([
        'Real Service NSW scoring sheet evaluation',
        'Simulation of mandatory maneuvers (reverse parallel park, three-point turn, kerbside stop)',
        'Speed zone audit, school zones, and hazard perception feedback',
        'Immediate detailed post-drive debrief'
      ])
    }
  ];

  for (const s of initialServices) {
    await client.query(
      `INSERT INTO services (id, number, title, short_desc, badge, slug, image, price_placeholder, ideal_for, highlights)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (id) DO NOTHING`,
      [s.id, s.number, s.title, s.shortDesc, s.badge, s.slug, s.image, s.pricePlaceholder, s.idealFor, s.highlights]
    );
  }

  // Initial Test Locations
  const initialLocations = [
    {
      id: 'loc-01',
      name: 'Service NSW Botany Test Centre',
      region: 'Inner South / Eastern Suburbs',
      code: 'BOT-01',
      description: 'Covers Botany, Mascot, Rosebery, and Banksmeadow driving routes featuring busy industrial traffic and tight residential roundabouts.',
      addressPlaceholder: 'Service NSW Botany, NSW 2019',
      testCenterType: 'Primary Service Hub',
      isPopular: true
    },
    {
      id: 'loc-02',
      name: 'Service NSW Marrickville Test Centre',
      region: 'Inner West',
      code: 'MRK-02',
      description: 'Navigates Inner West narrow streets, high pedestrian activity, school zones, and complex multi-lane intersections.',
      addressPlaceholder: 'Service NSW Marrickville, NSW 2204',
      testCenterType: 'Primary Service Hub',
      isPopular: true
    },
    {
      id: 'loc-03',
      name: 'Service NSW Rockdale Test Centre',
      region: 'St George Area',
      code: 'ROC-03',
      description: 'Includes Princes Highway traffic flow, complex railway overpasses, slip lanes, and reverse parking challenges.',
      addressPlaceholder: 'Service NSW Rockdale, NSW 2216',
      testCenterType: 'Primary Service Hub',
      isPopular: true
    },
    {
      id: 'loc-04',
      name: 'Service NSW Miranda Test Centre',
      region: 'Sutherland Shire',
      code: 'MIR-04',
      description: 'High-volume suburban shopping precinct routes with multiple lane changes, dual carriageways, and steep gradient starts.',
      addressPlaceholder: 'Service NSW Miranda, NSW 2228',
      testCenterType: 'Regional Hub',
      isPopular: false
    },
    {
      id: 'loc-05',
      name: 'Service NSW Silverwater Test Centre',
      region: 'Greater Western Sydney',
      code: 'SLV-05',
      description: 'Heavy vehicle interaction, major arterial roads (M4 approach), complex traffic light cycles, and strict speed enforcement zones.',
      addressPlaceholder: 'Service NSW Silverwater, NSW 2128',
      testCenterType: 'Regional Hub',
      isPopular: false
    }
  ];

  for (const l of initialLocations) {
    await client.query(
      `INSERT INTO test_locations (id, name, region, code, description, address_placeholder, test_center_type, is_popular)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (id) DO NOTHING`,
      [l.id, l.name, l.region, l.code, l.description, l.addressPlaceholder, l.testCenterType, l.isPopular]
    );
  }
}
