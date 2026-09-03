import React from 'react';
import { 
  ShieldCheck, 
  CalendarCheck, 
  Award, 
  Car, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../../data/content';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="why-us-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <span className="pill-badge gold">SECTION 07 // WHY CHOOSE US</span>
          <h2 className="section-title mega-headline">CONFIDENCE ON THE ROAD.</h2>
          <p className="section-subtitle">
            Structured driving instruction designed to build calm instincts, eliminate test anxiety, and ensure you are genuinely ready for Australian roads.
          </p>
        </div>

        <div className="why-us-grid">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div key={idx} className="why-number-card aura-card">
              <div className="why-card-top">
                <span className="large-num-accent">0{idx + 1}</span>
                <span className="num-dot-tag">ACADEMY PILLAR</span>
              </div>
              <h3 className="why-number-title">{item.title}</h3>
              <p className="why-number-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-us-section {
          background-color: var(--bg-warm);
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }
        .why-us-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.75rem;
          margin-top: 2rem;
        }
        @media (max-width: 1024px) {
          .why-us-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .why-us-grid {
            grid-template-columns: 1fr;
          }
        }
        .why-number-card {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.35s var(--ease-cinematic), box-shadow 0.35s var(--ease-cinematic);
        }
        .why-number-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-cinematic);
          border-color: var(--accent-gold);
        }
        .why-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-light);
        }
        .large-num-accent {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 2.8rem;
          line-height: 1;
          color: var(--accent-gold);
        }
        .num-dot-tag {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }
        .why-number-title {
          font-size: 1.25rem;
          font-weight: 900;
          letter-spacing: -0.01em;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }
        .why-number-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
};
