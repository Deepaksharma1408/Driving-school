import React, { useState } from 'react';
import { MapPin, Navigation, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TEST_LOCATIONS } from '../../data/content';
import { Button } from '../ui/Button';

export const AbstractMapLocations: React.FC = () => {
  const [selectedLocId, setSelectedLocId] = useState<string>(TEST_LOCATIONS[0].id);

  const selectedLoc = TEST_LOCATIONS.find(l => l.id === selectedLocId) || TEST_LOCATIONS[0];

  return (
    <section className="abstract-map-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="pill-badge accent">SECTION 10 // SERVICE NSW NETWORK</span>
          <h2 className="section-title">OUR TEST CENTRE HUBS</h2>
          <p className="section-subtitle">
            We operate directly on official Service NSW testing routes across Sydney. Click any location point to inspect route challenges and booking availability.
          </p>
        </div>

        <div className="map-interface-grid aura-card">
          {/* Left Abstract Road-Map Schematic */}
          <div className="abstract-map-canvas">
            {/* Stylized Vector Roads Network */}
            <svg className="roads-svg-layer" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 50,200 Q 250,50 550,200" stroke="#D5D2C4" strokeWidth="4" strokeDasharray="6 6" />
              <path d="M 100,50 L 500,350" stroke="#D5D2C4" strokeWidth="6" />
              <path d="M 50,320 Q 300,380 550,80" stroke="#D5D2C4" strokeWidth="4" />
              <circle cx="300" cy="200" r="70" stroke="#E2DFD3" strokeWidth="2" fill="none" />
              <circle cx="300" cy="200" r="140" stroke="#E2DFD3" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            </svg>

            {/* Interactive Location Node Pins */}
            {TEST_LOCATIONS.map((loc, idx) => {
              const isSelected = selectedLocId === loc.id;
              const positions = [
                { top: '35%', left: '25%' },
                { top: '62%', left: '70%' },
                { top: '28%', left: '60%' },
                { top: '75%', left: '35%' }
              ];
              const pos = positions[idx % positions.length];

              return (
                <button
                  key={loc.id}
                  className={`map-node-pin ${isSelected ? 'active' : ''}`}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => setSelectedLocId(loc.id)}
                  aria-label={`Select ${loc.name}`}
                >
                  <span className="node-pulse-ring" />
                  <div className="node-pin-core">
                    <MapPin size={18} />
                  </div>
                  <span className="node-badge-text">{loc.code}</span>
                </button>
              );
            })}

            <div className="map-legend-card">
              <span className="legend-title">GREATER SYDNEY TEST CORRIDOR</span>
              <span className="legend-sub">Service NSW Compliant Routes</span>
            </div>
          </div>

          {/* Right Location Inspector Sidebar */}
          <div className="location-sidebar-panel">
            <div className="loc-panel-top">
              <span className="pill-badge">{selectedLoc.code}</span>
              <span className="pill-badge accent">{selectedLoc.region}</span>
            </div>

            <h3 className="loc-panel-title">{selectedLoc.name}</h3>
            <p className="loc-panel-desc">{selectedLoc.description}</p>

            <div className="loc-route-features">
              <div className="feature-item">
                <CheckCircle2 size={16} className="chk-green" />
                <span>Examiner route nuances practiced</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="chk-green" />
                <span>Pre-test warm-up lesson available</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="chk-green" />
                <span>Dual-control car hire test day service</span>
              </div>
            </div>

            <div className="loc-actions">
              <Button to={`/book?location=${selectedLoc.id}`} variant="primary" size="md" icon={<ArrowRight size={16} />}>
                SCHEDULE AT THIS HUB
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .abstract-map-section {
          background-color: #FFFFFF;
        }
        @media (max-width: 768px) {
          .abstract-map-section {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
        }
        .map-interface-grid {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 2.5rem;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
          align-items: center;
        }
        @media (max-width: 960px) {
          .map-interface-grid {
            grid-template-columns: 1fr;
            padding: 1.25rem 1rem;
            gap: 2rem;
            border-radius: var(--radius-lg);
          }
        }
        .abstract-map-canvas {
          position: relative;
          height: 400px;
          border-radius: var(--radius-lg);
          background: var(--bg-warm-white);
          overflow: hidden;
          border: 1px solid var(--border-light);
        }
        @media (max-width: 640px) {
          .abstract-map-canvas {
            height: 270px;
            border-radius: var(--radius-md);
          }
        }
        .roads-svg-layer {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
        }
        .map-node-pin {
          position: absolute;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
          z-index: 5;
        }
        .node-pin-core {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2px solid var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          transition: all 0.25s var(--ease-cinematic);
        }
        @media (max-width: 640px) {
          .node-pin-core {
            width: 30px;
            height: 30px;
          }
        }
        .map-node-pin.active .node-pin-core {
          background: var(--accent-gold);
          transform: scale(1.15);
          box-shadow: 0 0 0 6px rgba(210, 176, 76, 0.4);
        }
        .node-badge-text {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.65rem;
          background: rgba(16, 24, 32, 0.85);
          color: #FFFFFF;
          padding: 0.12rem 0.45rem;
          border-radius: var(--radius-full);
          letter-spacing: 0.04em;
        }
        .node-pulse-ring {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(210, 176, 76, 0.4);
          animation: ringPulse 2s infinite ease-out;
          pointer-events: none;
        }
        @keyframes ringPulse {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .map-legend-card {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(8px);
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          font-size: 0.65rem;
          font-weight: 700;
          border: 1px solid var(--border-light);
        }
        .legend-title {
          color: var(--text-primary);
        }
        .legend-sub {
          color: var(--text-muted);
        }

        /* Sidebar */
        .location-sidebar-panel {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }
        .loc-panel-top {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .loc-panel-title {
          font-size: clamp(1.4rem, 4vw, 1.85rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-bottom: 0.6rem;
          color: var(--text-primary);
        }
        .loc-panel-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 1.5rem;
        }
        .loc-route-features {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.75rem;
          width: 100%;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .chk-green {
          color: #16A34A;
          flex-shrink: 0;
        }
        .loc-actions {
          width: 100%;
        }
        @media (max-width: 640px) {
          .loc-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};
