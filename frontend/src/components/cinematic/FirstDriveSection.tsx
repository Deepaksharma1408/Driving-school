import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const FirstDriveSection: React.FC = () => {
  return (
    <section id="first-drive-section" className="first-drive-section">
      <div className="container-wide">
        <div className="first-drive-header">
          <span className="pill-badge accent">
            <Sparkles size={14} />
            SECTION 01 // THE FIRST DRIVE
          </span>
          <h2 className="first-drive-headline mega-title">
            EVERY DRIVER <br />
            <span className="text-stroke">STARTS SOMEWHERE.</span>
          </h2>
          <p className="first-drive-subcopy">
            Whether you’re learning from scratch or preparing for your practical test, we build instincts and road confidence one lesson at a time.
          </p>
        </div>

        {/* Cinematic Horizontal Roadway Track */}
        <div className="roadway-cinematic-stage">
          <div className="road-lane-line" />
          <div className="road-vehicle-element">
            <img 
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80" 
              alt="Driving Academy Training Vehicle on road" 
              className="road-car-img" 
            />
            <div className="road-car-caption">
              <span className="caption-tag">SYDNEY ROADWAYS</span>
              <strong>Dual-Control Safety Fleet</strong>
            </div>
          </div>
          <div className="road-telemetry-box">
            <div className="telemetry-item">
              <span className="t-label">LOGBOOK STATUS</span>
              <strong className="t-val">3x Multiplier (NSW)</strong>
            </div>
            <div className="telemetry-item">
              <span className="t-label">TRANSMISSION</span>
              <strong className="t-val">Smooth Automatic</strong>
            </div>
            <div className="telemetry-item">
              <span className="t-label">SAFETY ASSISTS</span>
              <strong className="t-val">Dual Secondary Brakes</strong>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .first-drive-section {
          padding: 8rem 0 6rem 0;
          background: #FFFFFF;
          border-bottom: 1px solid var(--border-light);
          position: relative;
          overflow: hidden;
        }
        .first-drive-header {
          max-width: 980px;
          margin-bottom: 3.5rem;
        }
        .first-drive-headline {
          margin-top: 1rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }
        .text-stroke {
          color: var(--text-primary);
          position: relative;
          display: inline-block;
        }
        .text-stroke::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 8px;
          width: 100%;
          height: 16px;
          background: var(--accent-subtle);
          z-index: -1;
          border-radius: 4px;
        }
        .first-drive-subcopy {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 680px;
          line-height: 1.6;
        }

        /* Roadway Stage */
        .roadway-cinematic-stage {
          position: relative;
          width: 100%;
          height: 480px;
          border-radius: var(--radius-xl);
          background: #EAE8DE;
          overflow: hidden;
          box-shadow: var(--shadow-cinematic);
          display: flex;
          align-items: flex-end;
          padding: 2.5rem;
        }
        @media (max-width: 768px) {
          .roadway-cinematic-stage {
            height: 360px;
            padding: 1.5rem;
          }
        }
        .road-lane-line {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background: repeating-linear-gradient(90deg, #FFFFFF 0px, #FFFFFF 30px, transparent 30px, transparent 60px);
          opacity: 0.6;
          z-index: 2;
        }
        .road-vehicle-element {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .road-car-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .road-car-caption {
          position: absolute;
          top: 24px;
          left: 24px;
          background: rgba(16, 24, 32, 0.85);
          backdrop-filter: blur(10px);
          color: #FFFFFF;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          z-index: 5;
        }
        .caption-tag {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--accent-lime);
        }
        .road-car-caption strong {
          font-size: 0.95rem;
        }

        /* Telemetry Box */
        .road-telemetry-box {
          position: relative;
          z-index: 5;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(14px);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 1.25rem 2rem;
          display: flex;
          align-items: center;
          gap: 2.5rem;
          box-shadow: var(--shadow-card);
        }
        @media (max-width: 768px) {
          .road-telemetry-box {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 1rem;
            width: 100%;
          }
        }
        .telemetry-item {
          display: flex;
          flex-direction: column;
        }
        .t-label {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }
        .t-val {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.05rem;
          color: var(--text-primary);
        }
      `}</style>
    </section>
  );
};
