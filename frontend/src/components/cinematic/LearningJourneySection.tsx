import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Car, Compass, Award, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const LearningJourneySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2);

  const steps = [
    {
      index: 0,
      phase: 'START',
      title: 'First Ignition & Cabin Setup',
      desc: 'Mastering mirror adjustments, steering posture, pedal sensitivity, and smooth acceleration in quiet low-stress residential streets.',
      milestone: 'Confidence Milestone: 0–10 Logbook Hours'
    },
    {
      index: 1,
      phase: 'LEARN',
      title: 'Road Rules & Hazard Perception',
      desc: 'Navigating multi-lane Sydney roads, understanding Give Way vs Stop priorities, school zone speeds, and scanning 12 seconds ahead.',
      milestone: 'Confidence Milestone: 10–30 Logbook Hours'
    },
    {
      index: 2,
      phase: 'PRACTICE',
      title: 'Precision Manoeuvres & Parking',
      desc: 'Flawless reverse parallel parking, 3-point turns, kerbside stops, and high-density roundabout lane selections.',
      milestone: 'Confidence Milestone: 30–60 Logbook Hours'
    },
    {
      index: 3,
      phase: 'PREPARE',
      title: 'Mock Test Route Simulation',
      desc: 'Driving realistic test routes surrounding your chosen Service NSW center under authentic examiner scoring conditions.',
      milestone: 'Confidence Milestone: Pre-Test Audit'
    },
    {
      index: 4,
      phase: 'PASS',
      title: 'Test Day & P-Plates Victory',
      desc: 'Pre-test warm up lesson, vehicle verification at the Service NSW testing desk, and stepping up to collect your driver licence!',
      milestone: 'Final Milestone: 1st Time Pass Success'
    }
  ];

  return (
    <section className="learning-journey-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="pill-badge accent">SECTION 04 // THE PROGRESSION</span>
          <h2 className="section-title mega-title">
            FROM FIRST KEY TURN <br />
            <span>TO TEST DAY.</span>
          </h2>
          <p className="section-subtitle">
            A structured, step-by-step roadmap that transforms complete beginners and nervous drivers into licensed, confident road masters.
          </p>
        </div>

        {/* Horizontal Stepper Highway Track */}
        <div className="highway-journey-card aura-card">
          <div className="highway-track-bar">
            {steps.map((s) => {
              const isCurrent = activeStep === s.index;
              const isPast = activeStep > s.index;
              return (
                <button
                  key={s.index}
                  className={`highway-node ${isCurrent ? 'current' : ''} ${isPast ? 'completed' : ''}`}
                  onClick={() => setActiveStep(s.index)}
                >
                  <span className="node-phase-tag">{s.phase}</span>
                  <div className="node-dot">
                    {isCurrent ? <Car size={16} className="car-icon" /> : <span>0{s.index + 1}</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Content Spotlight */}
          <div className="active-step-spotlight">
            <div className="spotlight-left">
              <span className="pill-badge dark">
                PHASE 0{activeStep + 1} // {steps[activeStep].phase}
              </span>
              <h3 className="spotlight-title">{steps[activeStep].title}</h3>
              <p className="spotlight-desc">{steps[activeStep].desc}</p>
              <div className="milestone-badge">
                <Sparkles size={16} className="sparkle" />
                <span>{steps[activeStep].milestone}</span>
              </div>
            </div>

            <div className="spotlight-right">
              <div className="spotlight-cta-card">
                <h4>Ready to reach this milestone?</h4>
                <p>Book structured 1-on-1 coaching with an accredited NSW instructor.</p>
                <Button to="/book" variant="primary" size="md" icon={<ArrowRight size={16} />}>
                  SCHEDULE THIS STAGE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .learning-journey-section {
          background-color: #FFFFFF;
        }
        .highway-journey-card {
          background: var(--bg-surface-alt);
          border-radius: var(--radius-xl);
          padding: 3rem;
        }
        @media (max-width: 768px) {
          .highway-journey-card {
            padding: 1.5rem;
          }
        }
        .highway-track-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          margin-bottom: 3.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-medium);
        }
        @media (max-width: 640px) {
          .highway-track-bar {
            overflow-x: auto;
            gap: 1.5rem;
            justify-content: flex-start;
          }
        }
        .highway-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
          cursor: pointer;
          flex-shrink: 0;
        }
        .node-phase-tag {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .highway-node.current .node-phase-tag {
          color: var(--text-primary);
        }
        .node-dot {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: all 0.25s var(--ease-cinematic);
        }
        .highway-node.current .node-dot {
          background: var(--accent-lime);
          border-color: var(--text-primary);
          transform: scale(1.15);
          box-shadow: 0 4px 14px rgba(216, 243, 106, 0.5);
          color: var(--text-primary);
        }
        .highway-node.completed .node-dot {
          background: var(--text-primary);
          color: #FFFFFF;
          border-color: var(--text-primary);
        }

        /* Active Spotlight */
        .active-step-spotlight {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .active-step-spotlight {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        .spotlight-title {
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-top: 1rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }
        .spotlight-desc {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .milestone-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.9rem;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-full);
          font-size: 0.825rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .sparkle {
          color: #EAB308;
        }

        .spotlight-cta-card {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          padding: 2rem;
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .spotlight-cta-card h4 {
          font-size: 1.25rem;
          font-weight: 800;
        }
        .spotlight-cta-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
      `}</style>
    </section>
  );
};
