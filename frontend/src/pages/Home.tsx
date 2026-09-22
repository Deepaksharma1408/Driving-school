import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { BlogArticle } from '../types';

// Luxury Editorial Components
import { EditorialHero } from '../components/editorial/EditorialHero';
import { FirstDriveSection } from '../components/cinematic/FirstDriveSection';
import { EditorialExperience } from '../components/editorial/EditorialExperience';
import { EditorialPrograms } from '../components/editorial/EditorialPrograms';
import { ScrollingCarJourney } from '../components/cinematic/ScrollingCarJourney';
import { RunningCarVisual } from '../components/cinematic/RunningCarVisual';
import { EditorialInstructors } from '../components/editorial/EditorialInstructors';
import { EditorialProgress } from '../components/editorial/EditorialProgress';
import { EditorialTestimonials } from '../components/cinematic/EditorialTestimonials';
import { AbstractMapLocations } from '../components/cinematic/AbstractMapLocations';
import { EditorialJournal } from '../components/editorial/EditorialJournal';
import { CinematicFinalCTA } from '../components/cinematic/CinematicFinalCTA';

interface HomeProps {
  onSelectArticle?: (article: BlogArticle) => void;
  onHeroReady?: () => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectArticle, onHeroReady }) => {
  return (
    <div className="drivinity-luxury-homepage">
      {/* ============================================================
          HERO: WARM IVORY 3D VEHICLE STUDIO & SCROLL TIMELINE
          ============================================================ */}
      <EditorialHero onHeroReady={onHeroReady} />

      {/* ============================================================
          SECTION 01: THE FIRST DRIVE
          ============================================================ */}
      <FirstDriveSection />

      {/* ============================================================
          SECTION 02: THE EXPERIENCE (DARK SECTION: CONTROL -> CONFIDENCE)
          ============================================================ */}
      <EditorialExperience />

      {/* ============================================================
          SECTION 03: PROGRAMS (STACKED EDITORIAL SERVICES)
          ============================================================ */}
      <EditorialPrograms />

      {/* ============================================================
          SECTION 04: LEARNING JOURNEY (ROAD AS PROGRESS BAR)
          ============================================================ */}
      <ScrollingCarJourney />

      {/* ============================================================
          SECTION 05: TEST PREPARATION & SERVICE NSW MOCK AUDIT
          ============================================================ */}
      <section id="testprep-section" className="editorial-testprep-section section-padding">
        <div className="container-wide">
          <div className="testprep-editorial-grid">
            <div className="testprep-text-side">
              <div className="editorial-meta-tag champagne">
                <span>SECTION 05</span>
                <span className="tag-dash" />
                <span>EXAMINER AUDIT</span>
              </div>

              <h2 className="editorial-title font-thin">
                TEST DAY <br />
                <span className="font-medium">SHOULDN’T FEEL</span> <br />
                <span className="font-thin">LIKE A TEST.</span>
              </h2>

              <p className="editorial-desc">
                We conduct comprehensive mock audits along official Service NSW test corridors, evaluating every critical driving error, hazard response, and speed buffer evaluated on the examiner score sheet.
              </p>

              <div className="testprep-check-chips">
                <div className="chip-item"><CheckCircle2 size={15} className="champagne-icon" /> Reverse Parallel Parking (Within 50cm)</div>
                <div className="chip-item"><CheckCircle2 size={15} className="champagne-icon" /> Mirror & Blind Spot Head Checks</div>
                <div className="chip-item"><CheckCircle2 size={15} className="champagne-icon" /> Multi-lane Sydney Roundabouts</div>
                <div className="chip-item"><CheckCircle2 size={15} className="champagne-icon" /> Uncontrolled Right-turn Intersections</div>
                <div className="chip-item"><CheckCircle2 size={15} className="champagne-icon" /> Safe 3-Second Crash Avoidance Space</div>
                <div className="chip-item"><CheckCircle2 size={15} className="champagne-icon" /> Active 40 km/h School Zone Speed</div>
              </div>

              <div className="testprep-action-bar">
                <Button to="/test-preparation" variant="dark" size="lg" icon={<ArrowRight size={16} />}>
                  VIEW TEST AUDIT SPECIFICATIONS
                </Button>
              </div>
            </div>

            <div className="testprep-visual-side">
              <RunningCarVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 06: INSTRUCTORS (LARGE EDITORIAL PORTRAITS)
          ============================================================ */}
      <EditorialInstructors />

      {/* ============================================================
          SECTION 07: PROGRESS (TELEMETRY COCKPIT PREVIEW)
          ============================================================ */}
      <EditorialProgress />

      {/* ============================================================
          SECTION 08: TESTIMONIALS (DOMINANT EDITORIAL QUOTE)
          ============================================================ */}
      <EditorialTestimonials />

      {/* ============================================================
          SECTION 09: LOCATIONS (ARCHITECTURAL SCHEMATIC MAP)
          ============================================================ */}
      <AbstractMapLocations />

      {/* ============================================================
          SECTION 10: THE JOURNAL (ON THE ROAD MAGAZINE)
          ============================================================ */}
      <EditorialJournal onSelectArticle={onSelectArticle} />

      {/* ============================================================
          FINAL CTA: THE HORIZON
          ============================================================ */}
      <CinematicFinalCTA />

      <style>{`
        .drivinity-luxury-homepage {
          background-color: var(--bg-warm-ivory);
          overflow-x: hidden;
        }

        /* Section 05: Test Prep Styling */
        .editorial-testprep-section {
          background-color: var(--bg-warm-ivory);
          border-bottom: 1px solid var(--border-light);
        }

        .testprep-editorial-grid {
          display: grid;
          grid-template-columns: 1.15fr 1.05fr;
          gap: 4.5rem;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .testprep-editorial-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .editorial-title {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 4.8vw, 3.8rem);
          line-height: 1.08;
          letter-spacing: 0.02em;
          color: var(--text-primary);
          text-transform: uppercase;
          margin-top: 0.85rem;
          margin-bottom: 1.35rem;
        }

        .editorial-desc {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.68;
          margin-bottom: 2.25rem;
          max-width: 620px;
        }

        .testprep-check-chips {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          margin-bottom: 2.75rem;
        }

        @media (max-width: 640px) {
          .testprep-check-chips {
            grid-template-columns: 1fr;
            gap: 0.65rem;
          }
        }

        .chip-item {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-primary);
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
        }

        .champagne-icon {
          color: var(--accent-champagne);
          flex-shrink: 0;
        }

        .testprep-action-bar {
          display: flex;
          align-items: center;
        }

        @media (max-width: 640px) {
          .testprep-action-bar .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
