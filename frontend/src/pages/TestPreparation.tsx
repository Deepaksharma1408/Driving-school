import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Car, 
  FileCheck, 
  Award, 
  Sparkles 
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { FAQS } from '../data/content';
import { Accordion } from '../components/ui/Accordion';

export const TestPreparation: React.FC = () => {
  const testFaqs = FAQS.filter(f => f.category === 'test-day' || f.category === 'car-hire');

  const testCriteria = [
    { title: 'Observation & Blind Spots', desc: 'Executing mandatory over-the-shoulder visual head checks before every turn, lane change, and kerbside pull-out.' },
    { title: 'Road Positioning & Buffering', desc: 'Maintaining minimum 1-metre safety margins from parked cars, cyclists, and oncoming traffic.' },
    { title: 'Precision Manoeuvres', desc: 'Kerbside parking, reverse parallel parking within 50cm, angle parking, and 3-point turn executions.' },
    { title: 'Speed & School Zone Management', desc: 'Strict compliance with 40 km/h active school zones, variable weather speeds, and downhill brake control.' },
    { title: 'Complex Intersections & Roundabouts', desc: 'Right-of-way decision making, signalling before entering/exiting, and confident gap selection in heavy traffic.' },
    { title: 'Crash Avoidance Space', desc: 'Maintaining a 3-second safety space behind lead vehicles in dry conditions, expanding to 4 seconds in wet.' }
  ];

  return (
    <div className="test-prep-page">
      <PageHeader 
        tag="NSW PRACTICAL DRIVING TEST PREPARATION"
        title="TEST DAY SHOULDN'T FEEL LIKE A TEST."
        subtitle="Eliminate exam anxiety through full-dress mock driving tests conducted directly on authentic Service NSW evaluation routes."
        breadcrumb="Test Preparation"
        badge="Official Service NSW Criteria Aligned"
      />

      {/* Editorial Split Screen */}
      <section className="section-padding">
        <div className="container">
          <div className="test-prep-grid">
            <div className="test-prep-content">
              <span className="pill-badge accent">THE MARKING AUDIT</span>
              <h2 className="editorial-title">MASTER THE EXACT CRITERIA EXAMINERS LOOK FOR.</h2>
              <p className="lead-text">
                Most students fail the NSW practical driving test not because they cannot drive, but because of avoidable habit errors — like missing a single head check or creeping over a stop line.
              </p>

              <div className="criteria-checklist-grid">
                {testCriteria.map((c, i) => (
                  <div key={i} className="criteria-item aura-card">
                    <div className="criteria-header">
                      <CheckCircle2 size={18} className="chk-green" />
                      <h4>{c.title}</h4>
                    </div>
                    <p>{c.desc}</p>
                  </div>
                ))}
              </div>

              <div className="test-prep-actions">
                <Button to="/book?service=lesson-and-car" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                  BOOK MOCK TEST & CAR PACKAGE ($XX)
                </Button>
                <Button to="/faq" variant="outline" size="lg">
                  VIEW TEST DAY FAQ
                </Button>
              </div>
            </div>

            <div className="test-prep-visual">
              <div className="test-prep-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80" 
                  alt="Student driver on test route" 
                  className="test-img"
                />
                <div className="floating-mock-badge">
                  <Award size={20} className="badge-icon-lime" />
                  <div>
                    <strong>Full Mock Test Included</strong>
                    <span>Real Service NSW score-sheet simulation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-surface-alt)' }}>
        <div className="container container-narrow">
          <div className="section-header text-center">
            <span className="pill-badge">TEST DAY FAQ</span>
            <h2 className="section-title">COMMON QUESTIONS ABOUT THE NSW TEST</h2>
          </div>
          <Accordion items={testFaqs} defaultOpenIndex={0} />
        </div>
      </section>

      <style>{`
        .test-prep-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem;
          align-items: flex-start;
        }
        @media (max-width: 960px) {
          .test-prep-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        .lead-text {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-top: 1rem;
          margin-bottom: 2rem;
        }
        .criteria-checklist-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 600px) {
          .criteria-checklist-grid {
            grid-template-columns: 1fr;
          }
        }
        .criteria-item {
          background: #FFFFFF;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .criteria-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .chk-green {
          color: #16A34A;
          flex-shrink: 0;
        }
        .criteria-header h4 {
          font-size: 1rem;
          font-weight: 800;
        }
        .criteria-item p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        .test-prep-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .test-prep-img-box {
          position: relative;
          height: 520px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: #EAE8DE;
        }
        .test-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .floating-mock-badge {
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
          box-shadow: var(--shadow-card);
        }
        .badge-icon-lime {
          color: var(--text-primary);
        }
        .floating-mock-badge strong {
          display: block;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .floating-mock-badge span {
          font-size: 0.775rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};
