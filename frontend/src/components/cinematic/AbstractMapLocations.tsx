import React, { useState } from 'react';
import { MapPin, Navigation, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { TEST_LOCATIONS } from '../../data/content';
import { Button } from '../ui/Button';

export const AbstractMapLocations: React.FC = () => {
  const [selectedLocId, setSelectedLocId] = useState<string>(TEST_LOCATIONS[0].id);

  const selectedLoc = TEST_LOCATIONS.find(l => l.id === selectedLocId) || TEST_LOCATIONS[0];

  return (
    <section id="locations-section" className="abstract-map-section section-padding">
      <div className="container-wide">
        {/* Section Header */}
        <div className="locations-header-block">
          <div className="editorial-meta-tag champagne">
            <span>SECTION 09</span>
            <span className="tag-dash" />
            <span>SERVICE NETWORK</span>
          </div>

          <h2 className="locations-headline font-thin">
            FIND YOUR <br />
            <span className="font-medium">STARTING POINT.</span>
          </h2>

          <p className="locations-subcopy">
            We operate comprehensive driver assessment corridors across key regional service zones. Select a training zone to inspect route characteristics and slot availability.
          </p>
        </div>

        {/* Architectural Schematic Map & Inspector */}
        <div className="map-interface-grid">
          {/* Architectural Road-Map Schematic */}
          <div className="abstract-map-canvas">
            {/* Stylized Architectural Geometry Vector Roads */}
            <svg className="roads-svg-layer" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 40,200 Q 240,60 560,200" stroke="rgba(17,17,17,0.14)" strokeWidth="3" strokeDasharray="6 6" />
              <path d="M 80,40 L 520,360" stroke="rgba(17,17,17,0.18)" strokeWidth="4" />
              <path d="M 40,320 Q 300,380 560,70" stroke="rgba(17,17,17,0.14)" strokeWidth="3" />
              <circle cx="300" cy="200" r="80" stroke="rgba(197,168,128,0.3)" strokeWidth="1.5" fill="none" />
              <circle cx="300" cy="200" r="160" stroke="rgba(17,17,17,0.08)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            </svg>

            {/* Interactive Location Node Pins */}
            {TEST_LOCATIONS.map((loc, idx) => {
              const isSelected = selectedLocId === loc.id;
              const positions = [
                { top: '32%', left: '26%' },
                { top: '64%', left: '72%' },
                { top: '26%', left: '62%' },
                { top: '74%', left: '36%' }
              ];
              const pos = positions[idx % positions.length];

              return (
                <button
                  key={loc.id}
                  className={`map-node-pin ${isSelected ? 'active' : ''}`}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => setSelectedLocId(loc.id)}
                  onMouseEnter={() => setSelectedLocId(loc.id)}
                  aria-label={`Select test centre: ${loc.name}`}
                >
                  <span className="node-pulse-ring" />
                  <div className="node-pin-core">
                    <span className="node-code-num">0{idx + 1}</span>
                  </div>
                  <span className="node-badge-text">{loc.region}</span>
                </button>
              );
            })}

            <div className="map-legend-card">
              <span className="legend-title">ACCREDITED DRIVING CORRIDORS</span>
              <span className="legend-sub">Practical Test & Assessment Routes</span>
            </div>
          </div>

          {/* Right Location Inspector Sidebar */}
          <div className="location-sidebar-panel">
            <div className="loc-panel-top">
              <span className="editorial-meta-tag champagne">{selectedLoc.code}</span>
              <span className="loc-region-pill">{selectedLoc.region}</span>
            </div>

            <h3 className="loc-panel-title">{selectedLoc.name}</h3>
            <p className="loc-panel-desc">{selectedLoc.description}</p>

            <div className="loc-route-features">
              <div className="feature-item">
                <CheckCircle2 size={16} className="champagne-icon" />
                <span>Exact examiner scoring corners practiced</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="champagne-icon" />
                <span>Pre-test 45-min warm-up drive included</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="champagne-icon" />
                <span>Dual-control test hire vehicle delivered to test centre</span>
              </div>
            </div>

            <div className="loc-actions">
              <Button to={`/book?location=${selectedLoc.id}`} variant="primary" size="md" icon={<ArrowRight size={15} />}>
                SCHEDULE AT THIS HUB
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ============================================================
           EDITORIAL ABSTRACT MAP SECTION STYLING (WARM IVORY)
           ============================================================ */
        .abstract-map-section {
          background-color: var(--bg-warm-ivory);
          border-bottom: 1px solid var(--border-light);
        }

        .locations-header-block {
          max-width: 820px;
          margin-bottom: 3.5rem;
        }

        .locations-headline {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 4.8vw, 3.8rem);
          line-height: 1.08;
          letter-spacing: 0.02em;
          color: var(--text-primary);
          text-transform: uppercase;
          margin-top: 0.75rem;
          margin-bottom: 1rem;
        }

        .locations-subcopy {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.68;
        }

        /* Map Interface Grid */
        .map-interface-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(17, 17, 17, 0.05);
        }

        @media (max-width: 960px) {
          .map-interface-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Canvas Half */
        .abstract-map-canvas {
          position: relative;
          min-height: 480px;
          background-color: #FAF8F5;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-right: 1px solid var(--border-light);
        }

        @media (max-width: 960px) {
          .abstract-map-canvas {
            min-height: 360px;
            border-right: none;
            border-bottom: 1px solid var(--border-light);
          }
        }

        @media (max-width: 640px) {
          .abstract-map-canvas {
            min-height: 280px;
          }
        }

        .roads-svg-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }

        /* Node Pins */
        .map-node-pin {
          position: absolute;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 10;
        }

        .node-pin-core {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(17, 17, 17, 0.12);
          transition: all 0.25s ease;
        }

        .node-code-num {
          font-family: var(--font-display);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-primary);
        }

        .map-node-pin.active .node-pin-core,
        .map-node-pin:hover .node-pin-core {
          background: var(--bg-charcoal);
          border-color: var(--accent-champagne);
          transform: scale(1.15);
        }

        .map-node-pin.active .node-code-num,
        .map-node-pin:hover .node-code-num {
          color: var(--accent-champagne);
        }

        .node-badge-text {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.85);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-light);
          white-space: nowrap;
        }

        .node-pulse-ring {
          position: absolute;
          top: 0;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--accent-champagne);
          animation: pulseNode 2.2s infinite;
          pointer-events: none;
        }

        @keyframes pulseNode {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .map-legend-card {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          padding: 0.65rem 1rem;
          display: flex;
          flex-direction: column;
        }

        .legend-title {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--text-primary);
        }

        .legend-sub {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        /* Sidebar Half */
        .location-sidebar-panel {
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (max-width: 640px) {
          .location-sidebar-panel {
            padding: 2rem 1.5rem;
          }
        }

        .loc-panel-top {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .loc-region-pill {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .loc-panel-title {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          line-height: 1.15;
          margin-bottom: 1rem;
        }

        .loc-panel-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }

        .loc-route-features {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.5rem;
          margin-bottom: 2.25rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .champagne-icon {
          color: var(--accent-champagne);
          flex-shrink: 0;
        }

        .loc-actions .btn {
          width: 100%;
        }
      `}</style>
    </section>
  );
};
