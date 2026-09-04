import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Car, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Compass 
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { AUDIENCE_TYPES, LEARNING_AREAS, FAQS } from '../data/content';
import { AudienceCard } from '../components/ui/AudienceCard';
import { Accordion } from '../components/ui/Accordion';

export const DrivingLessons: React.FC = () => {
  const lessonFaqs = FAQS.filter(f => f.category === 'lessons' || f.category === 'general');

  return (
    <div className="driving-lessons-page">
      <PageHeader 
        tag="SERVICE 01 • INDIVIDUAL SESSIONS"
        title="STRUCTURED NSW DRIVING LESSONS."
        subtitle="1-on-1 personalized in-car instruction designed to build calm defensive driving habits and complete practical test readiness."
        breadcrumb="Driving Lessons"
        badge="Dual-Control Automatic Car Available"
      />

      {/* Hero Inclusions Overview */}
      <section className="section-padding">
        <div className="container">
          <div className="lessons-hero-grid">
            <div className="lessons-hero-text">
              <span className="pill-badge accent">TAILORED ROAD SESSIONS</span>
              <h2 className="section-title">LEARN AT YOUR PACE WITH ZERO STRESS.</h2>
              <p className="lead-paragraph">
                Whether you need your very first logbook hours or want an expert eye to review your driving before a Service NSW practical driving test, our sessions are customized to your exact skill level.
              </p>

              <div className="inclusions-checklist">
                <div className="inc-item">
                  <CheckCircle2 size={20} className="inc-icon" />
                  <div>
                    <strong>3-for-1 NSW Logbook Bonus Hours</strong>
                    <p>Every 1 hour with our accredited instructor records as 3 hours in your logbook (up to 30 logbook hours total).</p>
                  </div>
                </div>
                <div className="inc-item">
                  <CheckCircle2 size={20} className="inc-icon" />
                  <div>
                    <strong>Modern Dual-Control Automatic Vehicle</strong>
                    <p>Drive with peace of mind knowing the instructor has secondary safety brakes.</p>
                  </div>
                </div>
                <div className="inc-item">
                  <CheckCircle2 size={20} className="inc-icon" />
                  <div>
                    <strong>Detailed End-of-Lesson Feedback</strong>
                    <p>Receive clear, actionable progress reviews and notes after each driving session.</p>
                  </div>
                </div>
              </div>

              <div className="lessons-action-bar">
                <Button to="/book?service=driving-lesson" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                  BOOK A LESSON ($75)
                </Button>
                <Button to="/faq" variant="outline" size="lg">
                  VIEW FAQS
                </Button>
              </div>
            </div>

            <div className="lessons-hero-img-box">
              <img 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80" 
                alt="Student learning to drive with instructor" 
                className="lessons-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. WHO IS THIS FOR? (AUDIENCE PROFILES)
          ============================================================ */}
      <section className="lessons-audience-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="pill-badge">CUSTOMIZED CURRICULUM</span>
            <h2 className="section-title">WHO ARE THESE LESSONS FOR?</h2>
            <p className="section-subtitle">
              We cater to all backgrounds, licence conversion requirements, and confidence levels.
            </p>
          </div>

          <div className="grid-3">
            {AUDIENCE_TYPES.map((audience) => (
              <AudienceCard key={audience.id} audience={audience} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          3. WHAT YOU WILL LEARN (7-PART CORE CURRICULUM)
          ============================================================ */}
      <section className="curriculum-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="pill-badge accent">STEP-BY-STEP MASTERY</span>
            <h2 className="section-title">WHAT YOU’LL LEARN ON THE ROAD</h2>
            <p className="section-subtitle">
              Our structured syllabus covers all key evaluation criteria tested by Service NSW examiners.
            </p>
          </div>

          <div className="grid-3">
            {LEARNING_AREAS.map((area, idx) => (
              <div key={idx} className="curriculum-item aura-card">
                <span className="curr-number">0{idx + 1}</span>
                <h4 className="curr-title">{area.title}</h4>
                <p className="curr-desc">{area.desc}</p>
              </div>
            ))}
            {/* CTA Box in grid */}
            <div className="curriculum-cta-card aura-card">
              <h4>Ready to start practicing?</h4>
              <p>Book your first session today with instant online confirmation.</p>
              <Button to="/book?service=driving-lesson" variant="dark" size="sm" icon={<ArrowRight size={14} />}>
                BOOK NOW
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. THE VEHICLE
          ============================================================ */}
      <section className="vehicle-snippet-section section-padding">
        <div className="container">
          <div className="vehicle-snippet-box aura-card">
            <div className="vehicle-snippet-grid">
              <div>
                <span className="pill-badge">TRAINING FLEET</span>
                <h3>Learn in a Modern, Easy-to-Drive Compact Car</h3>
                <p>
                  Equipped with dual controls, crystal clear reversing cameras, and 5-star ANCAP safety features, our car makes parking manoeuvres and speed control effortless.
                </p>
              </div>
              <div className="vehicle-btn-box">
                <Button to="/car-hire" variant="outline">
                  See Vehicle Specifications →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. LESSONS FAQ
          ============================================================ */}
      <section className="lessons-faq-section section-padding">
        <div className="container container-narrow">
          <div className="section-header text-center">
            <span className="pill-badge">FREQUENT QUESTIONS</span>
            <h2 className="section-title">DRIVING LESSONS FAQ</h2>
          </div>
          <Accordion items={lessonFaqs} defaultOpenIndex={0} />
        </div>
      </section>

      {/* ============================================================
          6. BOOK LESSON CTA
          ============================================================ */}
      <section className="final-lesson-cta section-padding">
        <div className="container text-center">
          <div className="final-box aura-card">
            <span className="pill-badge accent">TAKE THE NEXT STEP</span>
            <h2 className="section-title">BOOK YOUR DRIVING LESSON TODAY</h2>
            <p className="section-subtitle">
              Select your preferred day, pickup area, or test centre and begin your journey toward your driver's licence.
            </p>
            <div className="final-cta-btns">
              <Button to="/book?service=driving-lesson" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                BOOK LESSON ONLINE ($75)
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                CONTACT INSTRUCTOR
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .lessons-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .lessons-hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        .lead-paragraph {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 2rem;
        }
        .inclusions-checklist {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        .inc-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }
        .inc-icon {
          color: #16A34A;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .inc-item strong {
          display: block;
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }
        .inc-item p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        .lessons-action-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .lessons-hero-img-box {
          height: 480px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: #EAE8DE;
        }
        .lessons-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Audience */
        .lessons-audience-section {
          background: var(--bg-surface-alt);
        }

        /* Curriculum */
        .curriculum-item {
          background: #FFFFFF;
          padding: 2rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
        }
        .curr-number {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.5rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }
        .curr-title {
          font-size: 1.2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        .curr-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .curriculum-cta-card {
          background: var(--accent-subtle);
          border: 1px solid var(--accent-primary);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .curriculum-cta-card h4 {
          font-size: 1.2rem;
          font-weight: 800;
        }
        .curriculum-cta-card p {
          font-size: 0.875rem;
          color: var(--text-primary);
        }

        /* Vehicle snippet */
        .vehicle-snippet-box {
          background: #FFFFFF;
          padding: 2.5rem;
          border-radius: var(--radius-xl);
        }
        .vehicle-snippet-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .vehicle-snippet-grid h3 {
          font-size: 1.5rem;
          font-weight: 900;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .vehicle-snippet-grid p {
          max-width: 600px;
          font-size: 0.95rem;
        }

        /* Final CTA */
        .final-box {
          background: #FFFFFF;
          padding: 4rem 2rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .final-cta-btns {
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
