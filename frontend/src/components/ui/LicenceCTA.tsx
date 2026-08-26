import React from 'react';
import { ArrowRight, Sparkles, Compass, Briefcase, Clock } from 'lucide-react';
import { Button } from './Button';

export const LicenceCTA: React.FC = () => {
  return (
    <section className="licence-cta-section section-padding">
      <div className="container">
        <div className="licence-cta-banner">
          <div className="licence-cta-content">
            <span className="pill-badge accent">
              <Sparkles size={14} />
              TRANSFORM YOUR MOBILITY
            </span>
            
            <h2 className="licence-title">
              YOUR LICENCE OPENS UP <br className="hide-mobile" />
              <span className="text-highlight">MORE FREEDOM.</span>
            </h2>

            <p className="licence-desc">
              Getting your Australian driver’s licence is more than just passing a test. It means daily independence, opening up greater career opportunities, spontaneous weekend road trips, and total confidence on every road you travel.
            </p>

            <div className="licence-perks-grid">
              <div className="perk-item">
                <div className="perk-icon"><Briefcase size={18} /></div>
                <div>
                  <strong>Job Opportunities</strong>
                  <p>Qualify for roles requiring valid NSW mobility.</p>
                </div>
              </div>
              <div className="perk-item">
                <div className="perk-icon"><Compass size={18} /></div>
                <div>
                  <strong>Travel & Independence</strong>
                  <p>Explore Australia without relying on public transit.</p>
                </div>
              </div>
              <div className="perk-item">
                <div className="perk-icon"><Clock size={18} /></div>
                <div>
                  <strong>Time & Flexibility</strong>
                  <p>Reclaim hours every day on your own schedule.</p>
                </div>
              </div>
            </div>

            <div className="licence-actions">
              <Button to="/book" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                BOOK YOUR FIRST LESSON
              </Button>
              <Button to="/faq" variant="outline" size="lg">
                SEE FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .licence-cta-section {
          background: var(--bg-surface-alt);
        }
        .licence-cta-banner {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-light);
          padding: 4rem 3.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        @media (max-width: 768px) {
          .licence-cta-banner {
            padding: 2.5rem 1.5rem;
          }
        }
        .licence-cta-content {
          max-width: 800px;
        }
        .licence-title {
          font-size: clamp(2.2rem, 4vw, 3.25rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          margin-top: 1rem;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }
        .text-highlight {
          position: relative;
          display: inline-block;
          z-index: 1;
        }
        .text-highlight::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 4px;
          width: 100%;
          height: 12px;
          background: var(--accent-primary);
          z-index: -1;
          border-radius: 4px;
        }
        .licence-desc {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }
        .licence-perks-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2.75rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid var(--border-light);
        }
        @media (max-width: 900px) {
          .licence-perks-grid {
            grid-template-columns: 1fr;
          }
        }
        .perk-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }
        .perk-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-surface-alt);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          flex-shrink: 0;
        }
        .perk-item strong {
          display: block;
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }
        .perk-item p {
          font-size: 0.825rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .licence-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
      `}</style>
    </section>
  );
};
