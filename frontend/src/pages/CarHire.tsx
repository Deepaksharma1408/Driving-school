import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Car, 
  AlertTriangle, 
  CalendarCheck, 
  Sparkles, 
  FileCheck 
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Accordion } from '../components/ui/Accordion';
import { FAQS } from '../data/content';

export const CarHire: React.FC = () => {
  const carHireFaqs = FAQS.filter(f => f.category === 'car-hire' || f.category === 'test-day');

  return (
    <div className="car-hire-page">
      <PageHeader 
        tag="SERVICE 02 • PRACTICAL TEST VEHICLE"
        title="DUAL-CONTROL CAR HIRE FOR SERVICE NSW TEST."
        subtitle="Eliminate test-day rejection risks with a fully compliant, certified dual-control automatic car insured for official driving examinations."
        breadcrumb="Car Hire"
        badge="Service NSW Test Compliant"
      />

      {/* Hero Overview */}
      <section className="section-padding">
        <div className="container">
          <div className="car-hire-hero-grid">
            <div className="car-hire-hero-text">
              <span className="pill-badge accent">ZERO TEST DAY REJECTION RISK</span>
              <h2 className="section-title">WHY HIRE A DUAL-CONTROL VEHICLE FOR YOUR TEST?</h2>
              
              <p className="lead-desc">
                Every year, hundreds of tests in New South Wales are cancelled before starting because personal vehicles have bald tires, brake light malfunctions, cracked mirrors, or missing safety documentation.
              </p>

              <div className="benefits-list">
                <div className="benefit-row">
                  <ShieldCheck size={22} className="benefit-icon" />
                  <div>
                    <strong>Guaranteed Service NSW Compliance</strong>
                    <p>Our car meets all strict vehicle safety and dual-brake requirements demanded by examiners.</p>
                  </div>
                </div>
                <div className="benefit-row">
                  <FileCheck size={22} className="benefit-icon" />
                  <div>
                    <strong>Full Comprehensive Driving Test Insurance</strong>
                    <p>Fully covered under commercial driving instructor insurance for the duration of the practical test.</p>
                  </div>
                </div>
                <div className="benefit-row">
                  <Car size={22} className="benefit-icon" />
                  <div>
                    <strong>Instructor Accompaniment</strong>
                    <p>Your instructor accompanies you to the testing centre, signs all required paperwork, and supports you.</p>
                  </div>
                </div>
              </div>

              <div className="car-hire-cta-bar">
                <Button to="/book?service=car-hire" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                  BOOK TEST CAR HIRE ($220)
                </Button>
                <Button to="/lesson-and-car" variant="outline" size="lg">
                  VIEW LESSON + CAR PACKAGE
                </Button>
              </div>
            </div>

            <div className="car-hire-img-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80" 
                alt="Modern dual-control test vehicle" 
                className="car-img"
              />
              <div className="spec-floating-card">
                <Sparkles size={18} className="spec-sparkle" />
                <span>Automatic Transmission • Dual Controls • Clean & Sanitized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. VEHICLE SPECIFICATIONS & FEATURES
          ============================================================ */}
      <section className="vehicle-specs-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="pill-badge">VEHICLE STANDARDS</span>
            <h2 className="section-title">TEST-READY VEHICLE SPECIFICATIONS</h2>
            <p className="section-subtitle">
              Engineered for effortless manoeuvrability, optimal rear visibility, and smooth automatic transmission.
            </p>
          </div>

          <div className="grid-3">
            <div className="spec-card aura-card">
              <span className="spec-icon-box"><Car size={24} /></span>
              <h4>Certified Dual Controls</h4>
              <p>Dual-brake pedal system inspected and approved according to Transport for NSW standards.</p>
            </div>

            <div className="spec-card aura-card">
              <span className="spec-icon-box"><ShieldCheck size={24} /></span>
              <h4>5-Star ANCAP Safety</h4>
              <p>Full suite of active safety assists, multiple cabin airbags, and anti-lock braking systems.</p>
            </div>

            <div className="spec-card aura-card">
              <span className="spec-icon-box"><Sparkles size={24} /></span>
              <h4>Reversing Camera & Sensors</h4>
              <p>High-resolution reverse guidelines to make parallel and kerb parking completely seamless.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. WHAT’S INCLUDED IN CAR HIRE
          ============================================================ */}
      <section className="inclusions-section section-padding">
        <div className="container">
          <div className="inclusions-box aura-card">
            <div className="inclusions-header">
              <span className="pill-badge accent">CLEAR PACKAGE SCOPE</span>
              <h3>What is Included with Test Car Hire?</h3>
            </div>

            <div className="grid-2">
              <ul className="inc-checklist">
                <li><CheckCircle2 size={16} className="chk" /> Use of the dual-control vehicle for official Service NSW test</li>
                <li><CheckCircle2 size={16} className="chk" /> Pre-test vehicle safety audit (tyres, signals, brake lights)</li>
                <li><CheckCircle2 size={16} className="chk" /> Full commercial driving school insurance coverage</li>
              </ul>
              <ul className="inc-checklist">
                <li><CheckCircle2 size={16} className="chk" /> Instructor check-in and documentation support at testing desk</li>
                <li><CheckCircle2 size={16} className="chk" /> Pre-test car adjustment (mirrors, seating, climate)</li>
                <li><CheckCircle2 size={16} className="chk" /> Post-test debrief and result celebration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. TEST DAY STEP-BY-STEP PROCESS
          ============================================================ */}
      <section className="test-process-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="pill-badge">WHAT TO EXPECT</span>
            <h2 className="section-title">THE TEST DAY PROCESS</h2>
            <p className="section-subtitle">
              How your test day unfolds from meeting your instructor to receiving your licence.
            </p>
          </div>

          <div className="process-timeline-grid">
            <div className="timeline-step aura-card">
              <span className="step-num">01</span>
              <h4>Meet at Service NSW</h4>
              <p>Meet your instructor 15–20 minutes before your test booking with your licence documents ready.</p>
            </div>

            <div className="timeline-step aura-card">
              <span className="step-num">02</span>
              <h4>Check-in & Desk Audit</h4>
              <p>Instructor helps verify your paperwork and presents vehicle registration & safety credentials.</p>
            </div>

            <div className="timeline-step aura-card">
              <span className="step-num">03</span>
              <h4>The Practical Test</h4>
              <p>Drive the familiar, smooth test car with the examiner following the Service NSW testing route.</p>
            </div>

            <div className="timeline-step aura-card">
              <span className="step-num">04</span>
              <h4>Results & Licence Photo</h4>
              <p>Review the score sheet, celebrate your pass, and step inside to get your driver licence printed!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. CAR HIRE FAQ
          ============================================================ */}
      <section className="car-faq-section section-padding">
        <div className="container container-narrow">
          <div className="section-header text-center">
            <span className="pill-badge">COMMON QUESTIONS</span>
            <h2 className="section-title">CAR HIRE FAQ</h2>
          </div>
          <Accordion items={carHireFaqs} defaultOpenIndex={0} />
        </div>
      </section>

      {/* ============================================================
          6. BOOK CAR CTA
          ============================================================ */}
      <section className="section-padding">
        <div className="container text-center">
          <div className="car-cta-box aura-card">
            <span className="pill-badge accent">RESERVE YOUR VEHICLE</span>
            <h2 className="section-title">LOCK IN YOUR TEST-DAY CAR HIRE</h2>
            <p className="section-subtitle">
              Secure a reliable, test-ready car for your Service NSW test appointment date.
            </p>
            <div className="cta-buttons">
              <Button to="/book?service=car-hire" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                BOOK CAR HIRE ONLINE ($220)
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                HAVE QUESTIONS? CONTACT US
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .car-hire-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .car-hire-hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        .lead-desc {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 2rem;
        }
        .benefits-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        .benefit-row {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }
        .benefit-icon {
          color: var(--text-primary);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .benefit-row strong {
          display: block;
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }
        .benefit-row p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        .car-hire-cta-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .car-hire-img-wrapper {
          position: relative;
          height: 480px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: #EAE8DE;
        }
        .car-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .spec-floating-card {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          box-shadow: var(--shadow-md);
        }
        .spec-sparkle {
          color: #EAB308;
          flex-shrink: 0;
        }

        /* Specs section */
        .vehicle-specs-section {
          background: var(--bg-surface-alt);
        }
        .spec-card {
          background: #FFFFFF;
          padding: 2.25rem 2rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .spec-icon-box {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: var(--accent-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }
        .spec-card h4 {
          font-size: 1.2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        .spec-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Inclusions */
        .inclusions-box {
          background: #FFFFFF;
          padding: 3rem;
          border-radius: var(--radius-xl);
        }
        @media (max-width: 768px) {
          .inclusions-box {
            padding: 1.75rem;
          }
        }
        .inclusions-header {
          margin-bottom: 2rem;
        }
        .inclusions-header h3 {
          font-size: 1.75rem;
          font-weight: 900;
          margin-top: 0.5rem;
        }
        .inc-checklist {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .inc-checklist li {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.925rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .chk {
          color: #16A34A;
          flex-shrink: 0;
        }

        /* Process */
        .process-timeline-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .process-timeline-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .process-timeline-grid {
            grid-template-columns: 1fr;
          }
        }
        .timeline-step {
          background: #FFFFFF;
          padding: 2rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
        }
        .step-num {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.75rem;
          color: var(--text-primary);
          background: var(--accent-primary);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .timeline-step h4 {
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        .timeline-step p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .car-cta-box {
          background: #FFFFFF;
          padding: 4rem 2rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cta-buttons {
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
