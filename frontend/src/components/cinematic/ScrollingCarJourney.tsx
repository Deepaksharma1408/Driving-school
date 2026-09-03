import React, { useState } from 'react';
import { Car, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export const ScrollingCarJourney: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      id: 0,
      label: 'LEARN',
      title: 'Foundation & Vehicle Control',
      carPosPercent: 6,
      desc: 'Mastering smooth throttle, progressive braking, mirror scans, and steering posture in calm residential streets.',
      focusList: ['Pedal sensitivity & speed moderation', 'Blind spot head checks', 'Sydney school zone speed limits']
    },
    {
      id: 1,
      label: 'PRACTICE',
      title: 'Traffic & Manoeuvres',
      carPosPercent: 28,
      desc: 'Executing repeatable reverse parallel parking, 3-point turns, lane changes, and multi-lane roundabouts.',
      focusList: ['Reverse parallel parking within 50cm', 'Sydney roundabout signal rules', 'Safe buffer margins from parked cars']
    },
    {
      id: 2,
      label: 'PREPARE',
      title: 'Mock Route Simulation',
      carPosPercent: 50,
      desc: 'Driving genuine Service NSW practical test routes under full examiner score-sheet conditions.',
      focusList: ['Authentic Service NSW scoring audit', 'Eliminating critical instant fail habits', 'Managing test-day nerves & composure']
    },
    {
      id: 3,
      label: 'TEST',
      title: 'Test-Day Car Hire & Warm-Up',
      carPosPercent: 72,
      desc: '45-minute warm up drive on test day followed by taking the test in our familiar dual-control automatic car.',
      focusList: ['Pre-test vehicle safety verification', 'Instructor accompaniment to desk', 'Immediate post-test feedback']
    },
    {
      id: 4,
      label: 'PASS',
      title: 'P-Plates & Independence',
      carPosPercent: 94,
      desc: 'Receiving your pass result, posing for your licence photo, and driving away with complete lifelong road confidence.',
      focusList: ['NSW Provisional P1 licence issue', 'Total driving freedom unlocked', 'Defensive driving instincts for life']
    }
  ];

  const current = stages[activeStage];

  return (
    <section className="scrolling-car-journey-section section-padding">
      <div className="container-wide">
        <div className="section-header text-center">
          <span className="journey-eyebrow">
            SECTION 03 // THE DRIVER'S JOURNEY
          </span>
          <h2 className="journey-main-title">
            THE SCROLLING <br />
            <span className="text-yellow-highlight">ROAD TO LICENSING.</span>
          </h2>
          <p className="journey-subtitle">
            Experience how our structured syllabus takes you from your first ignition turn all the way to passing your practical driving test.
          </p>
        </div>

        {/* Horizontal Highway Track with Integrated 5 Steps & Traveling Car */}
        <div className="highway-interactive-wrapper">
          <div className="journey-road-track">
            {/* Real Highway Motion Video */}
            <video 
              className="track-road-video" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/videos/gerte_an_vedio_ofa_moving_car.mp4" type="video/mp4" />
              <source src="/videos/canguruber-hero-driving.mp4" type="video/mp4" />
            </video>
            <div className="track-road-dark-scrim" />
            <div className="road-center-stripe" />

            {/* The 5 Step Milestone Buttons Overlaying the Road */}
            <div className="stages-milestones-row">
              {stages.map((stage) => {
                const isSelected = activeStage === stage.id;
                const isPassed = activeStage > stage.id;
                return (
                  <button
                    key={stage.id}
                    className={`stage-step-btn ${isSelected ? 'selected' : ''} ${isPassed ? 'passed' : ''}`}
                    onClick={() => setActiveStage(stage.id)}
                  >
                    <span className="stage-step-tag">{stage.label}</span>
                    <div className="stage-step-indicator">
                      <span>0{stage.id + 1}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* The Traveling Car Element Sliding Across the Road Track */}
            <div 
              className="traveling-car-rig" 
              style={{ left: `${current.carPosPercent}%` }}
            >
              <div className="car-marker-box">
                <Car size={24} className="car-svg" />
                <span className="car-pulsar" />
              </div>
              <span className="car-stage-badge">STAGE: {current.label}</span>
            </div>
          </div>

          {/* Active Stage Editorial Detail Spotlight */}
          <div className="stage-spotlight-box">
            <div className="spotlight-header">
              <span className="spotlight-stage-badge">STAGE 0{current.id + 1} // {current.label}</span>
              <h3 className="spotlight-title">{current.title}</h3>
              <p className="spotlight-desc">{current.desc}</p>
            </div>

            <div className="spotlight-checklist">
              {current.focusList.map((item, idx) => (
                <div key={idx} className="check-row">
                  <CheckCircle2 size={18} className="yellow-check" />
                  <span className="check-text">{item}</span>
                </div>
              ))}
            </div>

            <div className="spotlight-action">
              <Button to={`/book?stage=${current.label.toLowerCase()}`} variant="yellow" size="lg" icon={<ArrowRight size={16} />}>
                BOOK THIS STAGE WITH CANGURUBER
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrolling-car-journey-section {
          background-color: #FFFFFF;
          color: var(--canguruber-navy);
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }
        @media (max-width: 768px) {
          .scrolling-car-journey-section {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
        }
        .journey-eyebrow {
          display: inline-block;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(0.725rem, 2.5vw, 0.825rem);
          letter-spacing: 0.16em;
          color: #B28F00;
          margin-bottom: 0.5rem;
        }
        .journey-main-title {
          font-family: var(--font-display);
          font-size: clamp(1.85rem, 6.5vw, 3.6rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: var(--canguruber-navy);
          margin-bottom: 0.75rem;
        }
        .text-yellow-highlight {
          color: #CCA000;
        }
        .journey-subtitle {
          font-size: clamp(0.925rem, 2.6vw, 1.05rem);
          color: var(--text-body);
          max-width: 680px;
          margin: 0 auto 2.5rem auto;
        }

        /* Highway Interactive Box */
        .highway-interactive-wrapper {
          background: #0A1420;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-xl);
          padding: 3rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
        }
        @media (max-width: 768px) {
          .highway-interactive-wrapper {
            padding: 1.25rem 1rem;
            border-radius: var(--radius-lg);
          }
        }

        /* Integrated Asphalt Road Track */
        .journey-road-track {
          position: relative;
          height: 170px;
          background: #050B12;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.18);
          margin-bottom: 2.25rem;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .journey-road-track {
            height: 150px;
            margin-bottom: 1.5rem;
          }
        }

        .track-road-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.45;
          filter: contrast(115%);
        }
        .track-road-dark-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(5, 11, 18, 0.75) 0%, rgba(5, 11, 18, 0.45) 50%, rgba(5, 11, 18, 0.85) 100%);
          z-index: 1;
        }
        .road-center-stripe {
          position: absolute;
          left: 0;
          right: 0;
          top: 68%;
          height: 4px;
          background: repeating-linear-gradient(90deg, #D2B04C 0px, #D2B04C 45px, transparent 45px, transparent 90px);
          opacity: 0.85;
          z-index: 2;
        }

        /* Milestones Row inside Road Track */
        .stages-milestones-row {
          position: absolute;
          inset: 0;
          padding: 1.25rem 3.5rem;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          z-index: 4;
        }
        @media (max-width: 768px) {
          .stages-milestones-row {
            padding: 1rem 1.5rem;
            overflow-x: auto;
            gap: 1.25rem;
            justify-content: flex-start;
          }
        }
        .stage-step-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          flex-shrink: 0;
          background: transparent;
          border: none;
          z-index: 5;
        }
        .stage-step-tag {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          color: #94A3B8;
          transition: color 0.25s;
        }
        .stage-step-btn.selected .stage-step-tag {
          color: #D2B04C !important;
          font-weight: 900;
        }
        .stage-step-indicator {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #0F1C28;
          border: 2px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 0.85rem;
          color: #FFFFFF !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }
        @media (max-width: 640px) {
          .stage-step-indicator {
            width: 38px;
            height: 38px;
            font-size: 0.775rem;
          }
        }
        .stage-step-btn.selected .stage-step-indicator {
          background: #D2B04C !important;
          color: #07131D !important;
          border-color: #D2B04C !important;
          transform: scale(1.15);
          box-shadow: 0 0 25px rgba(210, 176, 76, 0.8);
        }
        .stage-step-btn.passed .stage-step-indicator {
          background: #FFFFFF !important;
          color: #07131D !important;
          border-color: #FFFFFF !important;
        }

        /* Traveling Car Element sliding on the Road */
        .traveling-car-rig {
          position: absolute;
          bottom: 12px;
          transform: translateX(-50%);
          transition: left 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          z-index: 6;
        }
        .car-marker-box {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #D2B04C;
          color: #07131D;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 30px rgba(210, 176, 76, 0.8);
          position: relative;
        }
        @media (max-width: 640px) {
          .car-marker-box {
            width: 34px;
            height: 34px;
          }
          .car-svg {
            width: 18px;
            height: 18px;
          }
        }
        .car-pulsar {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 2px solid #D2B04C;
          animation: pulseMarker 1.8s infinite ease-out;
        }
        @keyframes pulseMarker {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .car-stage-badge {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          background: rgba(7, 19, 29, 0.95);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          color: #FFFFFF;
          border: 1px solid var(--accent-gold);
          white-space: nowrap;
        }

        /* Spotlight Content Box - Crisp High Contrast */
        .stage-spotlight-box {
          background: #0D1C27;
          border-radius: var(--radius-lg);
          padding: 2.25rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        @media (max-width: 768px) {
          .stage-spotlight-box {
            padding: 1.5rem 1.15rem;
            border-radius: var(--radius-md);
          }
        }
        .spotlight-stage-badge {
          display: inline-block;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.725rem;
          letter-spacing: 0.12em;
          color: #D2B04C;
          background: rgba(210, 176, 76, 0.12);
          border: 1px solid rgba(210, 176, 76, 0.3);
          padding: 0.3rem 0.85rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.5rem;
        }
        .spotlight-title {
          font-family: var(--font-display);
          font-size: clamp(1.45rem, 5vw, 2rem);
          font-weight: 900;
          color: #FFFFFF !important;
          margin-bottom: 0.4rem;
        }
        .spotlight-desc {
          font-size: clamp(0.9rem, 2.5vw, 1.025rem);
          color: #CBD5E1 !important;
          line-height: 1.6;
        }
        .spotlight-checklist {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          padding: 1.25rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }
        @media (max-width: 900px) {
          .spotlight-checklist {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
        }
        .check-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .yellow-check {
          color: #D2B04C !important;
          flex-shrink: 0;
        }
        .check-text {
          font-size: 0.885rem;
          font-weight: 600;
          color: #FFFFFF !important;
        }
        .spotlight-action {
          padding-top: 0.5rem;
        }
        @media (max-width: 640px) {
          .spotlight-action .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default ScrollingCarJourney;
