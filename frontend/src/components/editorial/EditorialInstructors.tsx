import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, MapPin, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const EditorialInstructors: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const instructorsList = [
    {
      id: 'inst-alex',
      name: 'ALEX MORRIS',
      role: 'SENIOR DRIVING INSTRUCTOR',
      accreditation: 'NSW Transport Certified // Cert IV',
      experience: '12+ YEARS',
      studentsPassed: '1,400+ STUDENTS',
      passRate: '97.4% PASS RATE',
      testCentres: 'Botany, Marrickville, Rockdale',
      portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      bio: 'Former RMS assessor coach specializing in reversing anxiety, blind-spot mastery, and high-density inner Sydney test corridors.'
    },
    {
      id: 'inst-sarah',
      name: 'SARAH JENKINS',
      role: 'HEAD OF TEST PREPARATION',
      accreditation: 'Dual-Control Master Instructor',
      experience: '9+ YEARS',
      studentsPassed: '980+ STUDENTS',
      passRate: '98.2% PASS RATE',
      testCentres: 'Silverwater, Miranda, Botany',
      portrait: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
      bio: 'Patient, methodical coach with an unmatched first-time pass record for international licence conversions and anxious drivers.'
    },
    {
      id: 'inst-david',
      name: 'DAVID KUMAR',
      role: 'DEFENSIVE DRIVING SPECIALIST',
      accreditation: 'Advanced Motorist Assessor',
      experience: '15+ YEARS',
      studentsPassed: '1,850+ STUDENTS',
      passRate: '96.8% PASS RATE',
      testCentres: 'Rockdale, Botany, Silverwater',
      portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      bio: 'Specialist in multi-lane roundabout navigation, speed buffer management, and eliminating instant-fail habits on test day.'
    }
  ];

  return (
    <section id="instructors-section" className="editorial-instructors-section section-padding">
      <div className="container-wide">
        {/* Header */}
        <div className="instructors-header-row">
          <div>
            <div className="editorial-meta-tag champagne">
              <span>SECTION 06</span>
              <span className="tag-dash" />
              <span>THE INSTRUCTORS</span>
            </div>

            <h2 className="instructors-headline">
              MEET YOUR <br />
              <span className="headline-accent">DRIVING INSTRUCTORS.</span>
            </h2>
            <p className="instructors-subtitle-lead">
              Accredited senior NSW assessors, dual-control master instructors, and patient mentors dedicated to your first-time test success.
            </p>
          </div>

          <Link to="/instructors" className="all-instructors-link hide-mobile">
            <span>VIEW ALL ACCREDITED INSTRUCTORS</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 3 Editorial Large Portrait Panels Side-by-Side */}
        <div className="editorial-instructors-grid">
          {instructorsList.map((inst, idx) => {
            const isHovered = hoveredId === inst.id;
            return (
              <motion.article 
                key={inst.id}
                className={`instructor-editorial-card ${isHovered ? 'hovered' : ''}`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredId(inst.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Glowing Top Rim */}
                <div className={`card-top-rim ${isHovered ? 'active' : ''}`} />

                {/* Large Portrait Box */}
                <div className="instructor-portrait-wrap">
                  <img 
                    src={inst.portrait} 
                    alt={inst.name} 
                    className="portrait-img"
                    loading="lazy" 
                  />
                  <div className="portrait-scrim" />

                  {/* Top Floating Badge */}
                  <div className="portrait-top-pill">
                    <Award size={12} className="pill-icon" />
                    <span>{inst.experience}</span>
                  </div>

                  {/* Bottom Portrait Name Overlay */}
                  <div className="portrait-bottom-caption">
                    <h3 className="instructor-name">{inst.name}</h3>
                    <span className="instructor-role">{inst.role}</span>
                  </div>
                </div>

                {/* Metadata & Bio Area */}
                <div className="instructor-details-box">
                  <div className="instructor-stats-row">
                    <div className="stat-pill">
                      <span className="stat-val">{inst.studentsPassed}</span>
                      <span className="stat-lbl">Graduated</span>
                    </div>
                    <div className="stat-pill">
                      <span className="stat-val">{inst.passRate}</span>
                      <span className="stat-lbl">First Go</span>
                    </div>
                  </div>

                  <p className="instructor-bio">{inst.bio}</p>

                  <div className="instructor-centres-row">
                    <MapPin size={13} className="centre-icon" />
                    <span>{inst.testCentres}</span>
                  </div>

                  <div className="instructor-action-row">
                    <Button to={`/book?instructor=${inst.id}`} variant="primary" size="sm" icon={<ArrowRight size={14} />} style={{ width: '100%' }}>
                      SCHEDULE LESSON
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile View All Link */}
        <div className="show-mobile-only" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link to="/instructors" className="all-instructors-link">
            <span>VIEW ALL ACCREDITED INSTRUCTORS</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <style>{`
        /* ============================================================
           EDITORIAL INSTRUCTORS SECTION STYLING (WARM IVORY)
           ============================================================ */
        .editorial-instructors-section {
          background-color: var(--bg-warm-ivory);
          border-bottom: 1px solid var(--border-light);
          position: relative;
          overflow: hidden;
        }

        .instructors-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3.5rem;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .instructors-header-row {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 2.25rem;
          }
        }

        .instructors-headline {
          font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
          font-size: clamp(2.4rem, 4.8vw, 3.8rem);
          font-weight: 700;
          line-height: 1.06;
          letter-spacing: 0.035em;
          color: var(--text-primary);
          text-transform: uppercase;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .headline-accent {
          color: var(--text-primary);
        }

        .instructors-subtitle-lead {
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.2vw, 1.02rem);
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 580px;
          margin: 0;
        }

        .all-instructors-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: var(--text-primary);
          border-bottom: 1.5px solid var(--text-primary);
          padding-bottom: 4px;
          transition: all 0.25s ease;
          text-decoration: none;
          text-transform: uppercase;
        }

        .all-instructors-link:hover {
          color: var(--accent-champagne);
          border-color: var(--accent-champagne);
          transform: translateX(4px);
        }

        /* 3-Column Side-by-Side Grid */
        .editorial-instructors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          align-items: stretch;
        }

        @media (max-width: 1024px) {
          .editorial-instructors-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 680px) {
          .editorial-instructors-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .instructor-editorial-card {
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all 0.4s var(--ease-cinematic);
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 4px 20px rgba(17, 17, 17, 0.03);
        }

        .instructor-editorial-card:hover {
          border-color: rgba(197, 168, 128, 0.45);
          box-shadow: 0 20px 45px rgba(17, 17, 17, 0.09), 0 4px 12px rgba(197, 168, 128, 0.08);
          transform: translateY(-8px);
        }

        /* Glowing Top Rim */
        .card-top-rim {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, rgba(197, 168, 128, 0.9) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 10;
        }

        .card-top-rim.active {
          opacity: 1;
        }

        /* Large Portrait Wrap */
        .instructor-portrait-wrap {
          position: relative;
          width: 100%;
          height: 270px;
          overflow: hidden;
          background-color: #111111;
        }

        @media (max-width: 680px) {
          .instructor-portrait-wrap {
            height: 240px;
          }
        }

        .portrait-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.8s var(--ease-cinematic);
        }

        .instructor-editorial-card:hover .portrait-img {
          transform: scale(1.06);
        }

        .portrait-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(10, 10, 10, 0.88) 100%);
        }

        .portrait-top-pill {
          position: absolute;
          top: 1.15rem;
          left: 1.15rem;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--accent-champagne);
          background: rgba(12, 13, 16, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .pill-icon {
          color: var(--accent-champagne);
        }

        .portrait-bottom-caption {
          position: absolute;
          bottom: 1.15rem;
          left: 1.25rem;
          right: 1.25rem;
          z-index: 5;
        }

        .instructor-name {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #FFFFFF;
          margin-bottom: 0.2rem;
          line-height: 1.2;
        }

        .instructor-role {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent-champagne);
          display: block;
        }

        /* Details Body */
        .instructor-details-box {
          padding: 1.5rem 1.6rem 1.85rem 1.6rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .instructor-stats-row {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.1rem;
        }

        .stat-pill {
          flex: 1;
          background: var(--bg-soft-cream);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.55rem 0.65rem;
          display: flex;
          flex-direction: column;
          text-align: center;
        }

        .stat-val {
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.15;
        }

        .stat-lbl {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          margin-top: 0.2rem;
        }

        .instructor-bio {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.58;
          margin-bottom: 1.25rem;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .instructor-centres-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 0.74rem;
          color: var(--text-muted);
          margin-bottom: 1.35rem;
          padding-top: 0.65rem;
          border-top: 1px solid var(--border-subtle);
        }

        .centre-icon {
          color: var(--accent-champagne);
          flex-shrink: 0;
        }

        .instructor-action-row {
          margin-top: auto;
        }

        .show-mobile-only {
          display: none;
        }

        @media (max-width: 768px) {
          .show-mobile-only {
            display: block;
          }
        }
      `}</style>
    </section>
  );
};
