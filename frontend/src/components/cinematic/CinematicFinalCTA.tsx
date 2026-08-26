import React from 'react';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export const CinematicFinalCTA: React.FC = () => {
  return (
    <section className="cinematic-final-cta-section section-padding">
      <div className="container-wide">
        <div className="final-experience-stage">
          <div className="final-road-perspective" />
          
          {/* Car moving into distance towards horizon */}
          <div className="horizon-traveling-car">
            <div className="horizon-headlights" />
          </div>

          <div className="final-cta-content text-center">
            <span className="horizon-eyebrow-badge">
              SECTION 11 // THE HORIZON
            </span>

            <h2 className="final-mega-headline">
              READY FOR <br />
              <span className="text-yellow-glow">YOUR NEXT DRIVE?</span>
            </h2>

            <p className="final-lead-copy">
              No stress. No shouting. Just structured, calm coaching and modern dual-control safety that turns nervous learners into confident, licensed Australian drivers.
            </p>

            <div className="final-actions-row">
              <Button to="/book" variant="yellow" size="lg" icon={<ArrowRight size={20} />}>
                BOOK YOUR FIRST LESSON
              </Button>
              <Button to="/services" variant="glass-outline" size="lg">
                EXPLORE ALL SERVICES
              </Button>
            </div>

            <div className="final-brand-signature">
              <span className="sig-main">CANGURU<span className="sig-yellow">BER</span></span>
              <span className="sig-sub">DRIVING SCHOOL // NSW</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cinematic-final-cta-section {
          background-color: #FFFFFF;
          padding-top: 4rem;
          padding-bottom: 5rem;
        }
        @media (max-width: 768px) {
          .cinematic-final-cta-section {
            padding-top: 2.5rem;
            padding-bottom: 3rem;
          }
        }
        .final-experience-stage {
          background: #0A1420;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-lg);
          padding: 4rem 2.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
        }
        @media (max-width: 768px) {
          .final-experience-stage {
            padding: 2.5rem 1.25rem;
            border-radius: var(--radius-md);
          }
        }
        .final-road-perspective {
          position: absolute;
          bottom: 0;
          left: 20%;
          right: 20%;
          height: 60%;
          background: linear-gradient(180deg, rgba(255, 208, 0, 0.08) 0%, rgba(5, 11, 18, 0.95) 100%);
          clip-path: polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%);
          border-top: 1px solid rgba(255, 208, 0, 0.25);
          pointer-events: none;
        }
        @media (max-width: 640px) {
          .final-road-perspective {
            left: 5%;
            right: 5%;
            height: 65%;
          }
        }
        .horizon-traveling-car {
          position: absolute;
          top: 38%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 40px;
          background: radial-gradient(ellipse at center, rgba(255, 208, 0, 0.9) 0%, rgba(255, 208, 0, 0.2) 60%, transparent 100%);
          filter: blur(6px);
          animation: carHorizonGlow 3s ease-in-out infinite alternate;
        }
        @keyframes carHorizonGlow {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        }
        .final-cta-content {
          position: relative;
          z-index: 5;
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .horizon-eyebrow-badge {
          display: inline-block;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(0.68rem, 2.4vw, 0.75rem);
          letter-spacing: 0.16em;
          color: var(--accent-gold);
          background: rgba(210, 176, 76, 0.12);
          border: 1px solid rgba(210, 176, 76, 0.3);
          padding: 0.3rem 0.8rem;
          border-radius: var(--radius-full);
          margin-bottom: 1.15rem;
        }
        .final-mega-headline {
          font-family: var(--font-display);
          font-size: clamp(1.85rem, 6.5vw, 3.4rem);
          font-weight: 900;
          letter-spacing: -0.035em;
          line-height: 1.05;
          color: #FFFFFF !important;
          margin-bottom: 1.15rem;
        }
        .text-yellow-glow {
          color: var(--accent-gold);
          text-shadow: 0 0 35px rgba(210, 176, 76, 0.5);
        }
        .final-lead-copy {
          font-size: clamp(0.925rem, 2.5vw, 1.05rem);
          color: #CBD5E1 !important;
          line-height: 1.6;
          max-width: 620px;
          margin-bottom: 2rem;
        }
        .final-actions-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }
        @media (max-width: 640px) {
          .final-actions-row {
            flex-direction: column;
            gap: 0.75rem;
            margin-bottom: 2.25rem;
          }
          .final-actions-row .btn {
            width: 100%;
            justify-content: center;
          }
        }
        .final-brand-signature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding-top: 1.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }
        .sig-main {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.4rem;
          letter-spacing: 0.15em;
          color: #FFFFFF;
        }
        .sig-yellow {
          color: var(--accent-gold);
        }
        .sig-sub {
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          color: var(--accent-gold);
          font-weight: 800;
        }
      `}</style>
    </section>
  );
};
