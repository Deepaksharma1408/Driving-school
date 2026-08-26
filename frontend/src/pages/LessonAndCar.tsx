import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Car, 
  Award, 
  Zap 
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Accordion } from '../components/ui/Accordion';
import { FAQS } from '../data/content';

export const LessonAndCar: React.FC = () => {
  const packageFaqs = FAQS.filter(f => f.category === 'test-day' || f.category === 'car-hire' || f.category === 'general');

  return (
    <div className="lesson-car-page">
      <PageHeader 
        tag="SERVICE 03 • COMPLETE TEST DAY PACKAGE"
        title="LESSON + TEST CAR COMBO PACKAGE."
        subtitle="The ultimate test-day preparation: a warm-up coaching session on real test routes immediately before taking your practical test in our vehicle."
        breadcrumb="Lesson + Car Package"
        badge="Most Popular for First-Time Pass"
      />

      {/* Hero Breakdown */}
      <section className="section-padding">
        <div className="container">
          <div className="package-hero-grid">
            <div className="package-hero-text">
              <span className="pill-badge accent">RECOMMENDED FOR MAXIMUM SUCCESS</span>
              <h2 className="section-title">WARM UP. CALM YOUR NERVES. PASS WITH CONFIDENCE.</h2>
              
              <p className="lead-text">
                Going straight into a driving test cold is the #1 reason students fail on simple observation or parking errors. Our combined package ensures you are warmed up, mentally composed, and fully dialed in before the examiner steps into the car.
              </p>

              <div className="package-highlights-box aura-card">
                <div className="highlight-pill-row">
                  <span className="pill-badge dark">ALL-IN-ONE PACKAGE</span>
                  <span className="pill-badge accent">PRICE: $XX</span>
                </div>

                <ul className="package-list">
                  <li>
                    <CheckCircle2 size={18} className="chk-gold" />
                    <div>
                      <strong>45 to 60-Minute Pre-Test Warm-Up Lesson</strong>
                      <p>Revise tricky intersections, speed zones, and reverse parking around your test centre.</p>
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="chk-gold" />
                    <div>
                      <strong>Dual-Control Test-Ready Automatic Vehicle Hire</strong>
                      <p>Insured and compliant vehicle provided for your official Service NSW test.</p>
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="chk-gold" />
                    <div>
                      <strong>Instructor Check-In & Paperwork Assistance</strong>
                      <p>We accompany you at the Service NSW counter and handle vehicle verification.</p>
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className="chk-gold" />
                    <div>
                      <strong>Post-Test Debrief & Score Sheet Review</strong>
                      <p>Celebrating your pass and reviewing driving feedback with your instructor.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="package-action-row">
                <Button to="/book?service=lesson-and-car" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                  BOOK LESSON + CAR PACKAGE ($XX)
                </Button>
              </div>
            </div>

            <div className="package-hero-image-wrap">
              <img 
                src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80" 
                alt="Student celebrating driving test pass" 
                className="pkg-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. WHO IS THIS PACKAGE FOR?
          ============================================================ */}
      <section className="who-package-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="pill-badge">IDEAL CANDIDATES</span>
            <h2 className="section-title">WHO BENEFITS MOST FROM THIS PACKAGE?</h2>
            <p className="section-subtitle">
              Designed specifically for drivers aiming for a smooth first-attempt pass.
            </p>
          </div>

          <div className="grid-3">
            <div className="pkg-target-card aura-card">
              <div className="target-icon"><Zap size={24} /></div>
              <h4>Test-Ready Learners</h4>
              <p>Students who have completed their logbook hours and want final test route rehearsal to eliminate minor errors.</p>
            </div>

            <div className="pkg-target-card aura-card">
              <div className="target-icon"><ShieldCheck size={24} /></div>
              <h4>Overseas Licence Holders</h4>
              <p>Experienced drivers converting their international licence who want an immediate pre-test check on NSW marking rules.</p>
            </div>

            <div className="pkg-target-card aura-card">
              <div className="target-icon"><Sparkles size={24} /></div>
              <h4>Nervous Test Takers</h4>
              <p>Anyone who experiences test anxiety and needs 45 minutes of warm-up driving to settle nerves before the examiner arrives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. STEP-BY-STEP TEST DAY TIMELINE
          ============================================================ */}
      <section className="timeline-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="pill-badge accent">SEAMLESS COORDINATION</span>
            <h2 className="section-title">YOUR TEST DAY SCHEDULE</h2>
            <p className="section-subtitle">
              Here is how your test day runs from start to finish.
            </p>
          </div>

          <div className="timeline-cards-grid">
            <div className="timeline-card aura-card">
              <span className="time-badge">T-Minus 90 Mins</span>
              <h4>Pickup & Warm-Up Lesson</h4>
              <p>We pick you up and begin a 45–60 min warm-up drive focusing on local test routes, parking reference points, and speed changes.</p>
            </div>

            <div className="timeline-card aura-card">
              <span className="time-badge">T-Minus 20 Mins</span>
              <h4>Service NSW Arrival</h4>
              <p>Park in the designated driving test bays, conduct final cabin adjustments, and walk in together for document check-in.</p>
            </div>

            <div className="timeline-card aura-card">
              <span className="time-badge">Test Time (45 Mins)</span>
              <h4>The Driving Test</h4>
              <p>The Service NSW testing officer conducts the practical examination in our familiar dual-control car.</p>
            </div>

            <div className="timeline-card aura-card">
              <span className="time-badge">Post-Test</span>
              <h4>Results & Licence Issue</h4>
              <p>Receive your results, review the examiner feedback, take your congratulatory photo, and collect your P-plates or full licence!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. PACKAGE FAQ
          ============================================================ */}
      <section className="pkg-faq-section section-padding">
        <div className="container container-narrow">
          <div className="section-header text-center">
            <span className="pill-badge">QUESTIONS ANSWERED</span>
            <h2 className="section-title">PACKAGE FAQ</h2>
          </div>
          <Accordion items={packageFaqs} defaultOpenIndex={0} />
        </div>
      </section>

      {/* ============================================================
          5. BOOK PACKAGE CTA
          ============================================================ */}
      <section className="section-padding">
        <div className="container text-center">
          <div className="pkg-cta-box aura-card">
            <span className="pill-badge accent">MAXIMIZE YOUR PASS RATE</span>
            <h2 className="section-title">RESERVE YOUR LESSON + CAR PACKAGE</h2>
            <p className="section-subtitle">
              Slots around popular test centres fill up fast. Book your package in advance to match your Service NSW test appointment time.
            </p>
            <div className="pkg-cta-btns">
              <Button to="/book?service=lesson-and-car" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                BOOK PACKAGE ONLINE ($XX)
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                TALK TO INSTRUCTOR
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .package-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .package-hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        .lead-text {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 2rem;
        }
        .package-highlights-box {
          background: #FFFFFF;
          padding: 2rem;
          margin-bottom: 2.25rem;
          border-radius: var(--radius-xl);
        }
        .highlight-pill-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .package-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .package-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }
        .chk-gold {
          color: #16A34A;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .package-list strong {
          display: block;
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }
        .package-list p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        .package-action-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .package-hero-image-wrap {
          height: 500px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: #EAE8DE;
        }
        .pkg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Target */
        .who-package-section {
          background: var(--bg-surface-alt);
        }
        .pkg-target-card {
          background: #FFFFFF;
          padding: 2.25rem 2rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
        }
        .target-icon {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-md);
          background: var(--accent-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }
        .pkg-target-card h4 {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        .pkg-target-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Timeline */
        .timeline-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .timeline-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .timeline-cards-grid {
            grid-template-columns: 1fr;
          }
        }
        .timeline-card {
          background: #FFFFFF;
          padding: 2rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
        }
        .time-badge {
          display: inline-block;
          font-size: 0.775rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.3rem 0.75rem;
          background: var(--bg-surface-alt);
          border-radius: var(--radius-full);
          margin-bottom: 1rem;
          width: fit-content;
          color: var(--text-primary);
        }
        .timeline-card h4 {
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        .timeline-card p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .pkg-cta-box {
          background: #FFFFFF;
          padding: 4rem 2rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .pkg-cta-btns {
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
