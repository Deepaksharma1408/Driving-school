import React, { useState } from 'react';
import { ShieldCheck, Eye, Navigation, Disc, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const EditorialExperience: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const experienceSteps = [
    {
      id: 'control',
      num: '01',
      title: 'CONTROL',
      subtitle: 'Progressive Throttle & Braking Dynamics',
      desc: 'Mastering the delicate mechanical relationship between pedal resistance, stopping distances, and calm steering geometry. Never harsh. Never reactive.',
      telemetry: 'BRAKE SENSITIVITY: 98% SMOOTH',
      criteria: 'Service NSW Standard: Gradual deceleration without passenger head jerk or wheel shudder.',
      visual: '/assets/real_drift_gold.jpg',
      carTransform: 'translateX(0%) scale(1.0)'
    },
    {
      id: 'awareness',
      num: '02',
      title: 'AWARENESS',
      subtitle: '360° Visual Scanning & Blind Spots',
      desc: 'Developing a continuous 12-second forward horizon scan, instinctive 3-mirror checks prior to braking, and mandatory chin-to-shoulder blind spot confirmation before turning or changing lanes.',
      telemetry: 'BLIND SPOT VERIFICATION: 100%',
      criteria: 'Service NSW Standard: Instant test fail for lane change or kerbside departure without head check.',
      visual: '/assets/gtr_black.png',
      carTransform: 'translateX(-4%) scale(1.04) rotate(-1.5deg)'
    },
    {
      id: 'precision',
      num: '03',
      title: 'PRECISION',
      subtitle: 'Kerbside & Reverse Parallel Mastery',
      desc: 'Calibrated reference points that make reverse parallel parking, 90-degree bays, and 3-point turns an effortless mathematical sequence rather than an exercise in anxiety.',
      telemetry: 'KERB BUFFER: 28 CM (PASS RANGE: <50 CM)',
      criteria: 'Service NSW Standard: Completed within 4 movements without mounting the kerb.',
      visual: '/assets/porsche_yellow.png',
      carTransform: 'translateX(4%) scale(1.02) rotate(1.2deg)'
    },
    {
      id: 'confidence',
      num: '04',
      title: 'CONFIDENCE',
      subtitle: 'Decisive Gap Selection & Multi-Lane Roundabouts',
      desc: 'Reading traffic momentum at busy Sydney arterial intersections. Merging at motorway speed, maintaining a 3-second crash avoidance cushion, and asserting right-of-way calmly.',
      telemetry: 'GAP SELECTION: OPTIMAL FLOW',
      criteria: 'Service NSW Standard: Smooth integration without hesitating or obstructing approaching traffic.',
      visual: '/assets/real_drift_silver.jpg',
      carTransform: 'translateX(0%) scale(1.06)'
    }
  ];

  const current = experienceSteps[activeStep];

  return (
    <section id="experience-section" className="editorial-experience-section">
      <div className="container-wide">
        {/* Top Campaign Header */}
        <div className="experience-top-header">
          <div className="editorial-meta-tag champagne">
            <span>SECTION 02</span>
            <span className="tag-dash" />
            <span>THE EXPERIENCE</span>
          </div>

          <h2 className="experience-headline font-thin">
            MORE THAN <br />
            <span className="font-medium text-gradient-champagne">A LICENCE.</span>
          </h2>

          <p className="experience-subtext">
            Driving is not a test to survive. It is an instinct to cultivate. Explore the four progressive milestones of the Drivinity curriculum.
          </p>
        </div>

        {/* Scroll / Step Driven Interactive Campaign Stage */}
        <div className="experience-campaign-stage">
          {/* Left: Step Selector & Narrative */}
          <div className="campaign-narrative-col">
            <div className="steps-selector-rail">
              {experienceSteps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={step.id}
                    className={`step-rail-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveStep(idx)}
                  >
                    <span className="rail-num">{step.num}</span>
                    <span className="rail-title">{step.title}</span>
                    <div className="rail-line-indicator" />
                  </button>
                );
              })}
            </div>

            <div className="active-step-content-card">
              <span className="active-step-subtitle">{current.subtitle}</span>
              <h3 className="active-step-title">{current.title}</h3>
              <p className="active-step-desc">{current.desc}</p>

              <div className="active-step-telemetry-badge">
                <span className="badge-dot" />
                <span className="telemetry-text">{current.telemetry}</span>
              </div>

              <div className="active-step-criteria-box">
                <span className="criteria-label">EXAMINER EVALUATION:</span>
                <p className="criteria-text">{current.criteria}</p>
              </div>

              <div className="step-action-row">
                <Button to="/test-preparation" variant="glass-outline" size="sm" icon={<ArrowRight size={14} />}>
                  EXPLORE AUDIT CRITERIA
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Vehicle & Environment Dynamic Visual */}
          <div className="campaign-visual-col">
            <div className="visual-stage-viewport">
              {/* Dynamic Vehicle Silhouette with Smooth Transition */}
              <div className="vehicle-chassis-wrapper" style={{ transform: current.carTransform }}>
                <img 
                  src={current.visual} 
                  alt={`Drivinity ${current.title} dynamic phase`} 
                  className="vehicle-chassis-img"
                  key={current.id}
                />
              </div>

              {/* Road Horizon Grid & Ambient Underglow */}
              <div className="stage-horizon-grid" />
              <div className="stage-vignette-overlay" />

              {/* Technical HUD Overlay Watermark */}
              <div className="stage-hud-watermark">
                <span className="hud-phase-code">STAGE_{current.num} // ACTIVE_CALIBRATION</span>
                <span className="hud-location-stamp">NSW_PRACTICAL_CURRICULUM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ============================================================
           DARK EDITORIAL EXPERIENCE SECTION STYLING (#090909)
           ============================================================ */
        .editorial-experience-section {
          background-color: #090909;
          color: #FFFFFF;
          padding-top: 7rem;
          padding-bottom: 7rem;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 768px) {
          .editorial-experience-section {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }
        }

        .experience-top-header {
          max-width: 820px;
          margin-bottom: 4.5rem;
        }

        .experience-headline {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          line-height: 1.08;
          letter-spacing: 0.02em;
          color: #FFFFFF;
          text-transform: uppercase;
          margin-top: 0.85rem;
          margin-bottom: 1.35rem;
        }

        .text-gradient-champagne {
          background: linear-gradient(135deg, #F0E6D8 0%, #C5A880 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .experience-subtext {
          font-family: var(--font-body);
          font-size: 1rem;
          color: #A3A099;
          line-height: 1.68;
          max-width: 620px;
        }

        /* Campaign Stage Layout */
        .experience-campaign-stage {
          display: grid;
          grid-template-columns: 1.05fr 1.35fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .experience-campaign-stage {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        /* Step Selector Rail */
        .steps-selector-rail {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 0.85rem;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .steps-selector-rail::-webkit-scrollbar {
          display: none;
        }

        .step-rail-item {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          background: none;
          border: none;
          cursor: pointer;
          opacity: 0.4;
          transition: opacity 0.25s ease;
          position: relative;
          padding-bottom: 0.85rem;
          white-space: nowrap;
        }

        .step-rail-item.active, .step-rail-item:hover {
          opacity: 1;
        }

        .step-rail-item.active .rail-line-indicator {
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--accent-champagne);
        }

        .rail-num {
          font-family: var(--font-display);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--accent-champagne);
        }

        .rail-title {
          font-family: var(--font-display);
          font-size: 0.84rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: #FFFFFF;
          text-transform: uppercase;
        }

        /* Active Step Content Card */
        .active-step-content-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        @media (max-width: 640px) {
          .active-step-content-card {
            padding: 1.5rem;
          }
        }

        .active-step-subtitle {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: var(--accent-champagne);
          text-transform: uppercase;
        }

        .active-step-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.8vw, 2.6rem);
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #FFFFFF;
          line-height: 1.1;
        }

        .active-step-desc {
          font-size: 0.95rem;
          color: #CBD5E1;
          line-height: 1.6;
        }

        .active-step-telemetry-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(197, 168, 128, 0.12);
          border: 1px solid rgba(197, 168, 128, 0.25);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          width: fit-content;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent-champagne);
        }

        .telemetry-text {
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--accent-champagne);
        }

        .active-step-criteria-box {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 1rem;
        }

        .criteria-label {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: #94A3B8;
          display: block;
          margin-bottom: 0.25rem;
        }

        .criteria-text {
          font-size: 0.82rem;
          color: #E2E8F0;
          line-height: 1.45;
          margin: 0;
        }

        /* Right Stage Viewport */
        .visual-stage-viewport {
          position: relative;
          width: 100%;
          height: 520px;
          background: #111111;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 900px) {
          .visual-stage-viewport {
            height: 380px;
          }
        }

        .vehicle-chassis-wrapper {
          position: relative;
          z-index: 5;
          width: 88%;
          max-height: 80%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .vehicle-chassis-img {
          width: 100%;
          height: auto;
          max-height: 380px;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.7));
          animation: chassisFadeIn 0.5s ease forwards;
        }

        @keyframes chassisFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        .stage-horizon-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center;
          opacity: 0.4;
          pointer-events: none;
        }

        .stage-vignette-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 40%, rgba(9, 9, 9, 0.85) 100%);
          pointer-events: none;
        }

        .stage-hud-watermark {
          position: absolute;
          bottom: 1.25rem;
          left: 1.5rem;
          right: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
          pointer-events: none;
        }

        .hud-phase-code, .hud-location-stamp {
          font-family: var(--font-display);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.35);
        }
      `}</style>
    </section>
  );
};
