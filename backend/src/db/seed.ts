import bcrypt from 'bcryptjs';
import { pool } from './database.js';

export async function runSeeds(): Promise<boolean> {
  let client;
  try {
    client = await pool.connect();
    console.log('🌱 Seeding initial database data...');

    // 1. Initial Services Seed
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

    // 2. Initial Test Locations Seed
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

    // 3. Initial Users Seed
    const defaultPasswordHash = bcrypt.hashSync('admin123', 10);
    const initialUsers = [
      { id: 'usr-admin-01', fullName: 'Head Instructor (Admin)', email: 'admin@canguruber.com.au', phone: '0400000000', passwordHash: defaultPasswordHash, role: 'admin' },
      { id: 'usr-inst-01', fullName: 'John Doe', email: 'john.d@canguruber.com.au', phone: '0411222333', passwordHash: defaultPasswordHash, role: 'instructor' },
      { id: 'usr-inst-02', fullName: 'Maria Santos', email: 'maria.s@canguruber.com.au', phone: '0422333444', passwordHash: defaultPasswordHash, role: 'instructor' },
      { id: 'usr-stud-01', fullName: 'Alex Smith', email: 'alex.s@gmail.com', phone: '0433444555', passwordHash: defaultPasswordHash, role: 'student' },
      { id: 'usr-stud-02', fullName: 'Sam Wilson', email: 'sam.w@gmail.com', phone: '0444555666', passwordHash: defaultPasswordHash, role: 'student' }
    ];

    for (const u of initialUsers) {
      await client.query(
        `INSERT INTO users (id, full_name, email, phone, password_hash, role)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO NOTHING`,
        [u.id, u.fullName, u.email, u.phone, u.passwordHash, u.role]
      );
    }

    // 4. Initial Instructors Seed
    const initialInstructors = [
      { id: 'inst-01', userId: 'usr-inst-01', licenseNumber: 'NSW-LIC-998811', transmissionTypes: '{automatic,manual}', activeStatus: true },
      { id: 'inst-02', userId: 'usr-inst-02', licenseNumber: 'NSW-LIC-774422', transmissionTypes: '{automatic}', activeStatus: true }
    ];

    for (const inst of initialInstructors) {
      await client.query(
        `INSERT INTO instructors (id, user_id, license_number, transmission_types, active_status)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO NOTHING`,
        [inst.id, inst.userId, inst.licenseNumber, inst.transmissionTypes, inst.activeStatus]
      );
    }

    // 5. Initial Vehicles Seed
    const initialVehicles = [
      { id: 'veh-01', registrationNumber: 'DRV-888', transmission: 'automatic', instructorId: 'inst-01', activeStatus: true },
      { id: 'veh-02', registrationNumber: 'LRN-999', transmission: 'automatic', instructorId: 'inst-02', activeStatus: true },
      { id: 'veh-03', registrationNumber: 'MAN-123', transmission: 'manual', instructorId: 'inst-01', activeStatus: true }
    ];

    for (const v of initialVehicles) {
      await client.query(
        `INSERT INTO vehicles (id, registration_number, transmission, instructor_id, active_status)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO NOTHING`,
        [v.id, v.registrationNumber, v.transmission, v.instructorId, v.activeStatus]
      );
    }

    // 6. Initial Progress Skills Seed (Realistic NSW Categories)
    const initialSkills = [
      { id: 'skill-01', skillName: 'Parallel Parking', category: 'Parking', displayOrder: 1 },
      { id: 'skill-02', skillName: 'Reverse Angle Parking', category: 'Parking', displayOrder: 2 },
      { id: 'skill-03', skillName: 'Three-Point Turn', category: 'Maneuvers', displayOrder: 3 },
      { id: 'skill-04', skillName: 'Hill Starts & Clutch Control', category: 'Control', displayOrder: 4 },
      { id: 'skill-05', skillName: 'Multi-Lane Roundabouts', category: 'Intersections', displayOrder: 5 },
      { id: 'skill-06', skillName: 'Highway Merging & High-Speed Control', category: 'Highway', displayOrder: 6 },
      { id: 'skill-07', skillName: 'Night Driving & Low Visibility Hazards', category: 'Environment', displayOrder: 7 },
      { id: 'skill-08', skillName: 'School Zones & Pedestrian Hazard Perception', category: 'Safety', displayOrder: 8 }
    ];

    for (const sk of initialSkills) {
      await client.query(
        `INSERT INTO progress_skills (id, skill_name, category, display_order)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (id) DO NOTHING`,
        [sk.id, sk.skillName, sk.category, sk.displayOrder]
      );
    }

    // 7. Initial Student Progress Seed
    const initialProgress = [
      { id: 'sp-01', studentId: 'usr-stud-01', skillId: 'skill-01', status: 'mastered', notes: 'Great spatial awareness during kerbside parking', updatedBy: 'inst-01' },
      { id: 'sp-02', studentId: 'usr-stud-01', skillId: 'skill-03', status: 'mastered', notes: 'Smooth wheel lock and mirror checks', updatedBy: 'inst-01' },
      { id: 'sp-03', studentId: 'usr-stud-01', skillId: 'skill-05', status: 'in_progress', notes: 'Needs work on indicator timing exiting dual roundabouts', updatedBy: 'inst-01' },
      { id: 'sp-04', studentId: 'usr-stud-02', skillId: 'skill-01', status: 'in_progress', notes: 'Practiced initial 45-degree angle alignment', updatedBy: 'inst-02' }
    ];

    for (const pr of initialProgress) {
      await client.query(
        `INSERT INTO student_progress (id, student_id, skill_id, status, instructor_notes, updated_by)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO NOTHING`,
        [pr.id, pr.studentId, pr.skillId, pr.status, pr.notes, pr.updatedBy]
      );
    }

    // 8. Initial Badges Seed
    const initialBadges = [
      { id: 'bdg-01', name: 'Parallel Parking Ace', description: 'Mastered reverse parallel parking maneuver under exam conditions', icon: '🅿️', criteriaJson: JSON.stringify({ category_mastered: 'Parking' }) },
      { id: 'bdg-02', name: 'Roundabout Navigator', description: 'Demonstrates confident multi-lane roundabout entry and exit', icon: '🔄', criteriaJson: JSON.stringify({ skill_id: 'skill-05' }) },
      { id: 'bdg-03', name: 'Highway Voyager', description: 'Mastered high-speed merging and lane changing on Sydney freeways', icon: '🛣️', criteriaJson: JSON.stringify({ skill_id: 'skill-06' }) },
      { id: 'bdg-04', name: 'Night Owl', description: 'Completed night driving module and low-beam hazard perception', icon: '🌙', criteriaJson: JSON.stringify({ skill_id: 'skill-07' }) },
      { id: 'bdg-05', name: 'Test Ready Audit', description: 'Achieved 90%+ pass readiness score on mock driving test', icon: '🏆', criteriaJson: JSON.stringify({ skills_mastered_count: 5 }) }
    ];

    for (const b of initialBadges) {
      await client.query(
        `INSERT INTO badges (id, name, description, icon, criteria_json)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO NOTHING`,
        [b.id, b.name, b.description, b.icon, b.criteriaJson]
      );
    }

    // 9. Initial Student Badges Seed
    const initialStudentBadges = [
      { id: 'sb-01', studentId: 'usr-stud-01', badgeId: 'bdg-01' },
      { id: 'sb-02', studentId: 'usr-stud-01', badgeId: 'bdg-02' }
    ];

    for (const sb of initialStudentBadges) {
      await client.query(
        `INSERT INTO student_badges (id, student_id, badge_id)
         VALUES ($1, $2, $3)
         ON CONFLICT (id) DO NOTHING`,
        [sb.id, sb.studentId, sb.badgeId]
      );
    }

    console.log('✅ All seeds inserted successfully.');
    return true;
  } catch (err: any) {
    console.warn(`⚠️ Could not complete seed population (${err.message}).`);
    return false;
  } finally {
    if (client) client.release();
  }
}

// Standalone CLI execution entrypoint
if (process.argv[1] && process.argv[1].endsWith('seed.ts')) {
  runSeeds().then(() => {
    process.exit(0);
  }).catch((err) => {
    console.error('Fatal seed error:', err);
    process.exit(1);
  });
}
