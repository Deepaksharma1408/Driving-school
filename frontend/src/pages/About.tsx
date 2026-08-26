import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Car, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Clock 
} from 'lucide-react';
import { BRAND_INFO, WHY_CHOOSE_US } from '../data/content';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export const About: React.FC = () => {
  return (
    <div className="about-page">
      <PageHeader 
        tag="ABOUT CANGURUBER"
        title="DEDICATED TO SAFER ROADS AND CONFIDENT DRIVERS."
        subtitle="We combine structured NSW driver training with a calm, patient, and modern approach so you can master Australian driving without stress."
        breadcrumb="About Us"
      />

      {/* ============================================================
          1. INSTRUCTOR STORY & IDENTITY
          ============================================================ */}
      <section className="about-story-section section-padding">
        <div className="container">
          <div className="story-grid">
            <div className="story-visual">
              <div className="story-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80" 
                  alt="Professional NSW Driving Instructor" 
                  className="story-img"
                />
                <div className="story-badge-floating">
                  <ShieldCheck size={20} className="badge-icon" />
                  <div>
                    <strong>NSW Transport Certified</strong>
                    <span>Authorized Driving Instructor</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="story-content">
              <span className="pill-badge gold">INSTRUCTOR PROFILE & MISSION</span>
              <h2 className="section-title">A PATIENT, PROFESSIONAL APPROACH TO DRIVING.</h2>
              
              <p className="story-p">
                At Canguruber Driving School, we believe learning to drive should not be an anxiety-inducing ordeal. Whether you are getting behind the wheel for the first time or transitioning your overseas driving experience to Australian roads, our goal is to build long-term confidence and safe defensive habits.
              </p>

              <p className="story-p">
                Our curriculum focuses on clear explanation, positive reinforcement, and step-by-step mastery of real NSW driving environments — from tight suburban parking to high-speed motorway merges and complex multi-lane roundabouts.
              </p>

              <div className="story-highlights-grid">
                <div className="highlight-box">
                  <Award size={22} className="highlight-icon" />
                  <strong>10+ Years Safety Focus</strong>
                  <p>Extensive experience with NSW road systems & test criteria.</p>
                </div>
                <div className="highlight-box">
                  <HeartHandshake size={22} className="highlight-icon" />
                  <strong>Zero-Stress Guarantee</strong>
                  <p>Calm atmosphere, patient explanations, and zero yelling.</p>
                </div>
              </div>

              <div className="story-action">
                <Button to="/book" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                  BOOK WITH INSTRUCTOR
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. TEACHING PHILOSOPHY
          ============================================================ */}
      <section className="philosophy-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="pill-badge">OUR CORE VALUES</span>
            <h2 className="section-title">OUR TEACHING PHILOSOPHY</h2>
            <p className="section-subtitle">
              Three guiding principles that shape every single lesson we conduct.
            </p>
          </div>

          <div className="grid-3">
            <div className="philosophy-card aura-card">
              <div className="philo-num">01</div>
              <h3>Defensive First, Always</h3>
              <p>
                Passing the test is only half the battle. We teach space-cushioning, 12-second visual scanning, and proactive hazard anticipation so you stay safe for life.
              </p>
            </div>

            <div className="philosophy-card aura-card">
              <div className="philo-num">02</div>
              <h3>Patience Over Pressure</h3>
              <p>
                Mistakes are natural steps in learning. We break complex manoeuvres into repeatable, memorable steps without rush or impatience.
              </p>
            </div>

            <div className="philosophy-card aura-card">
              <div className="philo-num">03</div>
              <h3>Test-Route Precision</h3>
              <p>
                We practice directly around Service NSW test centres, familiarizing you with local speed zones, tricky hill-starts, and examiner scoring nuances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. THE TRAINING VEHICLE
          ============================================================ */}
      <section className="vehicle-section section-padding">
        <div className="container">
          <div className="vehicle-card aura-card">
            <div className="vehicle-grid">
              <div className="vehicle-info">
                <span className="pill-badge accent">TRAINING VEHICLE</span>
                <h2>MODERN DUAL-CONTROL AUTOMATIC CAR</h2>
                <p className="vehicle-desc">
                  Our training vehicle is compact, agile, and equipped with certified dual-control safety pedals. It provides effortless visibility and smooth handling, making reverse parking and test day driving comfortable.
                </p>

                <div className="vehicle-specs-list">
                  <div className="spec-item">
                    <CheckCircle2 size={16} className="spec-icon" />
                    <span>Certified Dual-Brake and Dual-Accelerator Controls</span>
                  </div>
                  <div className="spec-item">
                    <CheckCircle2 size={16} className="spec-icon" />
                    <span>5-Star ANCAP Safety Rating & Multiple Airbags</span>
                  </div>
                  <div className="spec-item">
                    <CheckCircle2 size={16} className="spec-icon" />
                    <span>High-definition Reversing Camera & Blind-Spot Mirrors</span>
                  </div>
                  <div className="spec-item">
                    <CheckCircle2 size={16} className="spec-icon" />
                    <span>Compact footprint for effortless parallel & angle parking</span>
                  </div>
                  <div className="spec-item">
                    <CheckCircle2 size={16} className="spec-icon" />
                    <span>Clean, sanitized, and non-smoking cabin</span>
                  </div>
                </div>

                <div className="vehicle-cta-row">
                  <Button to="/car-hire" variant="dark" icon={<ArrowRight size={16} />}>
                    VIEW TEST CAR HIRE DETAILS
                  </Button>
                </div>
              </div>

              <div className="vehicle-image-wrap">
                <img 
                  src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80" 
                  alt="Aura Drive modern dual-control training car" 
                  className="vehicle-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. FINAL ABOUT CTA
          ============================================================ */}
      <section className="about-cta-section section-padding">
        <div className="container text-center">
          <div className="about-cta-box">
            <span className="pill-badge accent">START YOUR JOURNEY</span>
            <h2 className="section-title">READY TO GET BEHIND THE WHEEL?</h2>
            <p className="section-subtitle">
              Book your first session today and experience structured, supportive driving instruction.
            </p>
            <div className="cta-btns">
              <Button to="/book" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                BOOK A LESSON NOW
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                CONTACT INSTRUCTOR
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .story-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 3.5rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .story-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        .story-img-box {
          position: relative;
          height: 480px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: #EAE8DE;
        }
        .story-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .story-badge-floating {
          position: absolute;
          bottom: 24px;
          left: 24px;
          right: 24px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          box-shadow: var(--shadow-md);
        }
        .badge-icon {
          color: #16A34A;
          flex-shrink: 0;
        }
        .story-badge-floating strong {
          display: block;
          font-size: 0.9rem;
          color: var(--text-primary);
        }
        .story-badge-floating span {
          font-size: 0.775rem;
          color: var(--text-muted);
        }
        .story-p {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 1.25rem;
        }
        .story-highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin: 2rem 0;
          padding: 1.5rem;
          background: var(--bg-surface-alt);
          border-radius: var(--radius-lg);
        }
        @media (max-width: 600px) {
          .story-highlights-grid {
            grid-template-columns: 1fr;
          }
        }
        .highlight-box strong {
          display: block;
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-top: 0.4rem;
          margin-bottom: 0.2rem;
        }
        .highlight-box p {
          font-size: 0.825rem;
          color: var(--text-secondary);
        }
        .highlight-icon {
          color: var(--text-primary);
        }

        /* Philosophy */
        .philosophy-section {
          background: var(--bg-surface-alt);
        }
        .philosophy-card {
          background: #FFFFFF;
          padding: 2.5rem 2rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .philo-num {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 2rem;
          color: var(--text-primary);
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: var(--accent-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        .philosophy-card h3 {
          font-size: 1.3rem;
          font-weight: 800;
        }
        .philosophy-card p {
          font-size: 0.925rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Vehicle */
        .vehicle-card {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 3rem;
        }
        @media (max-width: 768px) {
          .vehicle-card {
            padding: 1.75rem;
          }
        }
        .vehicle-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .vehicle-grid {
            grid-template-columns: 1fr;
          }
        }
        .vehicle-info h2 {
          font-size: 2rem;
          font-weight: 900;
          margin-top: 0.75rem;
          margin-bottom: 1rem;
        }
        .vehicle-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .vehicle-specs-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .spec-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .spec-icon {
          color: #16A34A;
          flex-shrink: 0;
        }
        .vehicle-image-wrap {
          height: 340px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #EAE8DE;
        }
        .vehicle-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* About CTA */
        .about-cta-box {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-light);
          padding: 3.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cta-btns {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
