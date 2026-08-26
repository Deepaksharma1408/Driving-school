import React, { useState } from 'react';
import { Eye, Navigation, Disc, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Hotspot {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  coords: { x: string; y: string };
  details: string;
  markingCriteria: string;
}

export const InteractiveCarSection: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<string>('01');

  const hotspots: Hotspot[] = [
    {
      id: '01',
      number: '01',
      title: 'OBSERVATION',
      subtitle: 'Blind-spots & Scanning',
      icon: <Eye size={18} />,
      coords: { x: '24%', y: '28%' },
      details: 'Critical 12-second forward visual scanning, 3-mirror checks before braking, and mandatory over-the-shoulder blind spot head checks before turning or changing lanes.',
      markingCriteria: 'Service NSW Item: Fail-item for turning or merging without verifying shoulder blind spot.'
    },
    {
      id: '02',
      number: '02',
      title: 'POSITIONING',
      subtitle: 'Lane Buffering & Gap Selection',
      icon: <Navigation size={18} />,
      coords: { x: '68%', y: '32%' },
      details: 'Maintaining a 1-metre safety buffer from parked cars, proper lane discipline across multi-lane Sydney roundabouts, and precise stop line alignment at traffic lights.',
      markingCriteria: 'Service NSW Item: Must maintain 3-second crash avoidance distance in dry conditions.'
    },
    {
      id: '03',
      number: '03',
      title: 'PARKING',
      subtitle: 'Kerb & Reverse Precision',
      icon: <Disc size={18} />,
      coords: { x: '45%', y: '72%' },
      details: 'Mastering reverse parallel parking, 90-degree angle bays, and 3-point turns using repeatable visual reference points on modern dual-control training vehicles.',
      markingCriteria: 'Service NSW Item: Max 4 movements, within 50cm of kerb, without mounting or striking.'
    },
    {
      id: '04',
      number: '04',
      title: 'CONFIDENCE',
      subtitle: 'Speed & Decision Instincts',
      icon: <ShieldCheck size={18} />,
      coords: { x: '78%', y: '65%' },
      details: 'Consistent throttle control, strict 40 km/h school zone compliance, assertive gap selection at busy intersections, and calm management of unexpected traffic situations.',
      markingCriteria: 'Service NSW Item: Instant fail for exceeding speed limits by 1 km/h or hesitant obstruction.'
    }
  ];

  const current = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  return (
    <section className="interactive-car-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="pill-badge accent">SECTION 03 // VEHICLE BLUEPRINT</span>
          <h2 className="section-title">THE ARCHITECTURE OF A LICENSED DRIVER</h2>
          <p className="section-subtitle">
            Explore the four critical evaluation pillars assessed during the official Service NSW practical driving test. Hover or tap each hotspot to inspect key marking criteria.
          </p>
        </div>

        {/* Blueprint Interactive Stage */}
        <div className="blueprint-stage aura-card">
          {/* Main Visual Chassis Background */}
          <div className="blueprint-vehicle-wrap">
            <img 
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80" 
              alt="Drivewise interactive vehicle blueprint" 
              className="blueprint-img"
            />
            <div className="blueprint-grid-overlay" />

            {/* Interactive Hotspot Trigger Pins */}
            {hotspots.map((spot) => {
              const isActive = activeHotspot === spot.id;
              return (
                <button
                  key={spot.id}
                  className={`hotspot-pin ${isActive ? 'active' : ''}`}
                  style={{ top: spot.coords.y, left: spot.coords.x }}
                  onClick={() => setActiveHotspot(spot.id)}
                  onMouseEnter={() => setActiveHotspot(spot.id)}
                  aria-label={`Inspect ${spot.title}`}
                >
                  <span className="pin-pulse" />
                  <span className="pin-circle">
                    <span className="pin-number">{spot.number}</span>
                  </span>
                  <span className="pin-tooltip">{spot.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Hotspot Inspector Card */}
          <div className="inspector-panel">
            <div className="inspector-header">
              <div className="inspector-num-badge">
                {current.icon}
                <span>PILLAR {current.number}</span>
              </div>
              <span className="pill-badge">{current.subtitle}</span>
            </div>

            <h3 className="inspector-title">{current.title}</h3>
            <p className="inspector-desc">{current.details}</p>

            <div className="inspector-marking-box">
              <CheckCircle2 size={18} className="check-gold" />
              <div>
                <strong>Service NSW Examiner Standard</strong>
                <p>{current.markingCriteria}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .interactive-car-section {
          background-color: var(--bg-surface-alt);
        }
        .blueprint-stage {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 2.5rem;
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 3rem;
          align-items: center;
        }
        @media (max-width: 960px) {
          .blueprint-stage {
            grid-template-columns: 1fr;
            padding: 1.5rem;
          }
        }
        .blueprint-vehicle-wrap {
          position: relative;
          height: 440px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #EAE8DE;
        }
        @media (max-width: 640px) {
          .blueprint-vehicle-wrap {
            height: 320px;
          }
        }
        .blueprint-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .blueprint-grid-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(16, 24, 32, 0.2) 0%, rgba(16, 24, 32, 0.5) 100%);
          pointer-events: none;
        }

        /* Hotspot Pins */
        .hotspot-pin {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .pin-circle {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2px solid var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 0.85rem;
          color: var(--text-primary);
          box-shadow: var(--shadow-card);
          transition: all 0.25s var(--ease-cinematic);
        }
        .hotspot-pin.active .pin-circle {
          background: var(--accent-lime);
          transform: scale(1.15);
          box-shadow: 0 0 0 6px rgba(216, 243, 106, 0.4);
        }
        .pin-pulse {
          position: absolute;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(216, 243, 106, 0.5);
          animation: pulsePin 2s infinite ease-out;
          pointer-events: none;
        }
        @keyframes pulsePin {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .pin-tooltip {
          position: absolute;
          bottom: -28px;
          background: rgba(16, 24, 32, 0.9);
          backdrop-filter: blur(4px);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-xs);
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .hotspot-pin:hover .pin-tooltip, .hotspot-pin.active .pin-tooltip {
          opacity: 1;
        }

        /* Inspector Panel */
        .inspector-panel {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .inspector-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .inspector-num-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--accent-lime);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.75rem;
        }
        .inspector-title {
          font-size: 2.2rem;
          font-weight: 900;
          letter-spacing: -0.03em;
          margin-bottom: 0.85rem;
          color: var(--text-primary);
        }
        .inspector-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }
        .inspector-marking-box {
          background: var(--bg-surface-alt);
          border-left: 3px solid var(--accent-lime);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          width: 100%;
        }
        .check-gold {
          color: #16A34A;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .inspector-marking-box strong {
          display: block;
          font-size: 0.85rem;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }
        .inspector-marking-box p {
          font-size: 0.825rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }
      `}</style>
    </section>
  );
};
