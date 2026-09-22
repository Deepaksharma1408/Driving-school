import React from 'react';
import { ArrowRight, Activity, Gauge, Shield, Navigation } from 'lucide-react';
import { Button } from '../ui/Button';

export const EditorialProgress: React.FC = () => {
  const telemetryMetrics = [
    { label: 'VEHICLE CONTROL', value: 82, note: 'Braking curve & steering sensitivity' },
    { label: 'KERB PRECISION & PARKING', value: 64, note: 'Reverse parallel 4-movement audit' },
    { label: 'ROAD AWARENESS & SCANNING', value: 76, note: '12-second horizon scan & head checks' },
    { label: 'TEST COMPOSTURE & INSTINCT', value: 71, note: 'Roundabout gaps & school zone compliance' }
  ];

  return (
    <section className="editorial-progress-section section-padding">
      <div className="container-wide">
        <div className="progress-editorial-grid">
          {/* Left Text & Positioning */}
          <div className="progress-narrative-side">
            <div className="editorial-meta-tag champagne">
              <span>SECTION 07</span>
              <span className="tag-dash" />
              <span>DRIVER TELEMETRY</span>
            </div>

            <h2 className="progress-headline font-thin">
              YOUR DRIVING <br />
              <span className="font-medium">JOURNEY.</span>
            </h2>

            <p className="progress-lead-copy">
              Every turn, brake application, and mock examination metric is synthesized into actionable driver readiness telemetry. Monitor your progression toward your NSW driver licence in real time.
            </p>

            <div className="progress-actions">
              <Button to="/track" variant="primary" size="lg" icon={<ArrowRight size={15} />}>
                TRACK YOUR PROGRESS
              </Button>
              <Button to="/badges" variant="outline" size="lg">
                VIEW MILESTONES
              </Button>
            </div>
          </div>

          {/* Right: Automotive Telemetry Cockpit Preview */}
          <div className="telemetry-display-panel">
            {/* Top HUD Status Bar */}
            <div className="hud-header-bar">
              <div className="hud-title-wrap">
                <Activity size={16} className="hud-live-icon" />
                <span className="hud-system-title">TELEMETRY DIAGNOSTIC // ACTIVE CURRICULUM</span>
              </div>
              <span className="hud-status-chip">RMS CALIBRATED</span>
            </div>

            {/* Metric Bars */}
            <div className="metrics-stack">
              {telemetryMetrics.map((metric, idx) => (
                <div key={idx} className="metric-row">
                  <div className="metric-labels-row">
                    <span className="metric-name">{metric.label}</span>
                    <span className="metric-number font-medium">{metric.value}%</span>
                  </div>

                  <div className="metric-progress-track">
                    <div 
                      className="metric-progress-bar" 
                      style={{ width: `${metric.value}%` }} 
                    />
                  </div>

                  <span className="metric-annotation">{metric.note}</span>
                </div>
              ))}
            </div>

            {/* Bottom Telemetry Meta Summary */}
            <div className="telemetry-bottom-meta">
              <div className="meta-stat-item">
                <span className="meta-k">NSW BONUS MULTIPLIER</span>
                <strong className="meta-v">3X (30 HRS)</strong>
              </div>
              <div className="meta-stat-item">
                <span className="meta-k">READINESS RATING</span>
                <strong className="meta-v champagne-text">HIGH CONFIDENCE</strong>
              </div>
              <div className="meta-stat-item">
                <span className="meta-k">NEXT ROUTE AUDIT</span>
                <strong className="meta-v">BOTANY SERVICE NSW</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ============================================================
           EDITORIAL PROGRESS & TELEMETRY SECTION STYLING
           ============================================================ */
        .editorial-progress-section {
          background-color: var(--bg-soft-cream);
          border-bottom: 1px solid var(--border-light);
        }

        .progress-editorial-grid {
          display: grid;
          grid-template-columns: 1.05fr 1.25fr;
          gap: 4.5rem;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .progress-editorial-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .progress-headline {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 4.8vw, 3.8rem);
          line-height: 1.08;
          letter-spacing: 0.02em;
          color: var(--text-primary);
          text-transform: uppercase;
          margin-top: 0.85rem;
          margin-bottom: 1.35rem;
        }

        .progress-lead-copy {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.68;
          margin-bottom: 2.5rem;
          max-width: 580px;
        }

        .progress-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        @media (max-width: 600px) {
          .progress-actions {
            flex-direction: column;
            width: 100%;
          }
          .progress-actions .btn {
            width: 100%;
          }
        }

        /* Telemetry Cockpit Panel (Refined Automotive Aesthetic) */
        .telemetry-display-panel {
          background: #111111;
          border: 1px solid rgba(17, 17, 17, 0.2);
          border-radius: var(--radius-md);
          padding: 2.5rem;
          color: #FFFFFF;
          box-shadow: 0 20px 50px rgba(17, 17, 17, 0.12);
        }

        @media (max-width: 640px) {
          .telemetry-display-panel {
            padding: 1.5rem;
          }
        }

        .hud-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .hud-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .hud-live-icon {
          color: var(--accent-champagne);
        }

        .hud-system-title {
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.7);
        }

        .hud-status-chip {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--accent-champagne);
          background: rgba(197, 168, 128, 0.12);
          border: 1px solid rgba(197, 168, 128, 0.28);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-xs);
        }

        /* Metrics Stack */
        .metrics-stack {
          display: flex;
          flex-direction: column;
          gap: 1.65rem;
          margin-bottom: 2.25rem;
        }

        .metric-row {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .metric-labels-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }

        .metric-name {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #E2DFD8;
        }

        .metric-number {
          font-family: var(--font-display);
          font-size: 1.1rem;
          letter-spacing: 0.04em;
          color: var(--accent-champagne);
        }

        .metric-progress-track {
          width: 100%;
          height: 3px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-xs);
          overflow: hidden;
        }

        .metric-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #A88D6A, #C5A880, #E6D5BE);
          border-radius: var(--radius-xs);
          box-shadow: 0 0 10px rgba(197, 168, 128, 0.4);
          transition: width 0.8s ease;
        }

        .metric-annotation {
          font-size: 0.72rem;
          color: #8C8982;
        }

        /* Bottom Meta Summary */
        .telemetry-bottom-meta {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1.5rem;
        }

        @media (max-width: 640px) {
          .telemetry-bottom-meta {
            grid-template-columns: 1fr;
            gap: 0.85rem;
          }
        }

        .meta-stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .meta-k {
          font-family: var(--font-display);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: #8C8982;
        }

        .meta-v {
          font-family: var(--font-display);
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          color: #FFFFFF;
        }

        .champagne-text {
          color: var(--accent-champagne) !important;
        }
      `}</style>
    </section>
  );
};
