import React, { useState } from 'react';
import { Car, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const ScrollingCarJourney: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      id: 0,
      code: '01',
      label: 'START',
      title: 'Ignition & Cabin Calibration',
      carPosPercent: 6,
      desc: 'Ergonomic seat and mirror adjustment, pedal calibration, dual-control linkage safety checks, and first quiet-street departures.',
      focusList: ['Progressive pedal sensitivity', 'Blind-spot visual scanning', 'School zone 40 km/h awareness']
    },
    {
      id: 1,
      code: '02',
      label: 'LEARN',
      title: 'Vehicle Dynamics & Road Rules',
      carPosPercent: 24,
      desc: 'Building instinctive vehicle control, progressive braking curves, 12-second forward scanning, and NSW road rule intuition.',
      focusList: ['Smooth progressive stopping distance', 'Give-way and stop-sign priorities', '3-mirror check sequence']
    },
    {
      id: 2,
      code: '03',
      label: 'PRACTICE',
      title: 'Manoeuvres & Traffic Flow',
      carPosPercent: 44,
      desc: 'Executing repeatable reverse parallel parking, 3-point turns, lane merging, and multi-lane Sydney roundabouts without hesitation.',
      focusList: ['Parallel parking within 50cm of kerb', 'Sydney roundabout exit signals', '1-metre buffer from parked vehicles']
    },
    {
      id: 3,
      code: '04',
      label: 'PREPARE',
      title: 'Mock Test Route Simulation',
      carPosPercent: 64,
      desc: 'Driving genuine Service NSW practical test routes under full examiner score-sheet conditions to eliminate instant fail habits.',
      focusList: ['Full 105-item examiner scoring audit', 'Eliminating critical driving errors', 'Composure under exam conditions']
    },
    {
      id: 4,
      code: '05',
      label: 'TEST',
      title: 'Test-Day Car Hire & Warm-Up',
      carPosPercent: 82,
      desc: '45-minute warm up drive on test day followed by taking the test in our familiar dual-control automatic car with instructor support.',
      focusList: ['Pre-test vehicle verification', 'Instructor accompaniment to desk', 'Immediate post-test feedback']
    },
    {
      id: 5,
      code: '06',
      label: 'PASS',
      title: 'Provisional P1 Licence & Freedom',
      carPosPercent: 96,
      desc: 'Receiving your pass certificate, collecting your NSW P-plates, and embarking on a lifetime of confident, independent driving.',
      focusList: ['NSW Provisional P1 licence issue', 'Total driving autonomy unlocked', 'Defensive driving instincts for life']
    }
  ];

  const current = stages[activeStage];

  return (
    <section id="journey-section" className="scrolling-car-journey-section section-padding">
      <div className="container-wide">
        {/* Editorial Section Header */}
        <div className="journey-header-block">
          <div className="editorial-meta-tag champagne">
            <span>SECTION 04</span>
            <span className="tag-dash" />
            <span>LEARNING JOURNEY</span>
          </div>

          <h2 className="journey-main-title">
            THE ROAD <br />
            <span className="headline-accent">TO INDEPENDENCE.</span>
          </h2>

          <p className="journey-subtitle">
            A structured, six-phase curriculum engineered to transform beginner hesitation into effortless, lifelong driving mastery.
          </p>
        </div>

        {/* Horizontal Roadway Track as Progress Bar */}
        <div className="highway-interactive-wrapper">
          <div className="journey-road-track">
            {/* Background Highway Motion Video */}
            <video 
              className="track-road-video" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/videos/gerte_an_vedio_ofa_moving_car.mp4" type="video/mp4" />
              <source src="/videos/drivinity-hero-driving.mp4" type="video/mp4" />
            </video>
            <div className="track-road-dark-scrim" />
            <div className="road-center-stripe" />

            {/* Active Road Progress Bar Line */}
            <div 
              className="road-active-progress-fill" 
              style={{ width: `${current.carPosPercent}%` }} 
            />

            {/* Traveling Vehicle Icon Indicator */}
            <div 
              className="traveling-car-rig" 
              style={{ left: `${current.carPosPercent}%` }}
            >
              <div className="car-marker-box">
                <Car size={20} className="car-icon-champagne" />
                <span className="car-pulsar" />
              </div>
              <span className="car-stage-badge">{current.code} // {current.label}</span>
            </div>
          </div>

          {/* Stage Milestone Buttons Across the Bottom of the Track */}
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
                    <span>{stage.code}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Editorial Detail Spotlight */}
          <div className="stage-spotlight-box">
            <div className="spotlight-header">
              <span className="spotlight-stage-badge">STAGE {current.code} // {current.label}</span>
              <h3 className="spotlight-title">{current.title}</h3>
              <p className="spotlight-desc">{current.desc}</p>
            </div>

            <div className="spotlight-checklist">
              {current.focusList.map((item, idx) => (
                <div key={idx} className="check-row">
                  <CheckCircle2 size={16} className="champagne-icon" />
                  <span className="check-text">{item}</span>
                </div>
              ))}
            </div>

            <div className="spotlight-action">
              <Button to={`/book?stage=${current.label.toLowerCase()}`} variant="primary" size="md" icon={<ArrowRight size={15} />}>
                SCHEDULE STAGE {current.code} SESSION
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ============================================================
           EDITORIAL SCROLLING ROAD JOURNEY STYLING
           ============================================================ */
        .scrolling-car-journey-section {
          background-color: var(--bg-warm-ivory);
          border-bottom: 1px solid var(--border-light);
        }

        .journey-header-block {
          max-width: 680px;
          margin: 0 0 3.5rem 0;
          text-align: left;
        }

        .journey-main-title {
          font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
          font-size: clamp(2.4rem, 4.8vw, 3.8rem);
          font-weight: 700;
          line-height: 1.06;
          letter-spacing: 0.035em;
          color: var(--text-primary);
          text-transform: uppercase;
          margin-top: 0.75rem;
          margin-bottom: 0.85rem;
        }

        .headline-accent {
          color: var(--text-primary);
        }

        .journey-subtitle {
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.2vw, 1.02rem);
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        /* Highway Interactive Box */
        .highway-interactive-wrapper {
          background: #0A0A0A;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-md);
          padding: 3rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
          color: #FFFFFF;
        }

        @media (max-width: 768px) {
          .highway-interactive-wrapper {
            padding: 1.5rem 1rem;
          }
        }

        /* Integrated Road Track */
        .journey-road-track {
          position: relative;
          height: 140px;
          background: #111111;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.14);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .track-road-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
        }

        .track-road-dark-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10, 10, 10, 0.6) 0%, rgba(10, 10, 10, 0.85) 100%);
        }

        .road-center-stripe {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0px, rgba(255, 255, 255, 0.4) 30px, transparent 30px, transparent 60px);
          transform: translateY(-50%);
        }

        .road-active-progress-fill {
          position: absolute;
          top: 50%;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #C5A880, #E6D5BE);
          transform: translateY(-50%);
          box-shadow: 0 0 16px rgba(197, 168, 128, 0.7);
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 2;
        }

        /* Traveling Car Marker */
        .traveling-car-rig {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          transition: left 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
        }

        .car-marker-box {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #111111;
          border: 1.5px solid var(--accent-champagne);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(197, 168, 128, 0.5);
        }

        .car-icon-champagne {
          color: var(--accent-champagne);
        }

        .car-pulsar {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid var(--accent-champagne);
          animation: pulseMarker 2s infinite;
        }

        @keyframes pulseMarker {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        .car-stage-badge {
          font-family: var(--font-display);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--accent-champagne);
          background: rgba(17, 17, 17, 0.85);
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-xs);
          white-space: nowrap;
          border: 1px solid rgba(197, 168, 128, 0.3);
        }

        /* Milestones Row */
        .stages-milestones-row {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        @media (max-width: 768px) {
          .stages-milestones-row {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
          }
        }

        .stage-step-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-sm);
          padding: 0.85rem 0.5rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .stage-step-btn:hover, .stage-step-btn.selected {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-champagne);
        }

        .stage-step-btn.selected .stage-step-tag {
          color: var(--accent-champagne);
        }

        .stage-step-tag {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #A3A099;
          text-transform: uppercase;
        }

        .stage-step-indicator {
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 600;
          color: #FFFFFF;
        }

        /* Spotlight Box */
        .stage-spotlight-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-sm);
          padding: 2.5rem;
          display: grid;
          grid-template-columns: 1.2fr 1fr 0.8fr;
          gap: 2.5rem;
          align-items: center;
        }

        @media (max-width: 960px) {
          .stage-spotlight-box {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1.5rem;
          }
        }

        .spotlight-stage-badge {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--accent-champagne);
          display: block;
          margin-bottom: 0.45rem;
        }

        .spotlight-title {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 2.5vw, 1.8rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #FFFFFF;
          margin-bottom: 0.65rem;
        }

        .spotlight-desc {
          font-size: 0.88rem;
          color: #A3A099;
          line-height: 1.55;
          margin: 0;
        }

        .spotlight-checklist {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          padding-left: 1.75rem;
        }

        @media (max-width: 960px) {
          .spotlight-checklist {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 1rem;
          }
        }

        .check-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.82rem;
          color: #E2DFD8;
        }

        .champagne-icon {
          color: var(--accent-champagne);
          flex-shrink: 0;
        }

        .spotlight-action {
          display: flex;
          justify-content: flex-end;
        }

        @media (max-width: 960px) {
          .spotlight-action {
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  );
};
