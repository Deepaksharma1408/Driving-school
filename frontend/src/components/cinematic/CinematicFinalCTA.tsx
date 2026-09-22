import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

export const CinematicFinalCTA: React.FC = () => {
  return (
    <section className="cinematic-final-cta-section">
      <div className="container-wide">
        <div className="final-experience-stage">
          {/* Deep Horizon Road Perspective */}
          <div className="final-road-perspective" />
          
          {/* Subtle Silhouette of Vehicle Traveling Toward the Horizon */}
          <div className="horizon-traveling-car">
            <div className="car-taillights-glow" />
          </div>

          <div className="final-cta-content text-center">
            <div className="editorial-meta-tag champagne horizon-badge">
              <span>FINAL CALL</span>
              <span className="tag-dash" />
              <span>THE HORIZON</span>
            </div>

            <h2 className="final-mega-headline font-thin">
              READY TO <br />
              <span className="font-medium text-gradient-champagne">TAKE THE WHEEL?</span>
            </h2>

            <p className="final-lead-copy">
              No shouting. No test anxiety. Just structured, patient coaching and modern dual-control safety that turns nervous beginners into calm, licensed Australian motorists.
            </p>

            <div className="final-actions-row">
              <Button to="/book" variant="primary" size="lg" icon={<ArrowRight size={16} />}>
                START YOUR JOURNEY
              </Button>
              <Button to="/services" variant="glass-outline" size="lg">
                EXPLORE PROGRAMS
              </Button>
            </div>

            {/* Official Luxury Brand Signature */}
            <div className="final-brand-signature">
              <span className="sig-main">DRIVIN<span className="sig-champagne">ITY</span></span>
              <span className="sig-sub">DRIVING ACADEMY // NSW</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ============================================================
           CINEMATIC FINAL CTA SECTION STYLING (#080808)
           ============================================================ */
        .cinematic-final-cta-section {
          background-color: var(--bg-warm-ivory);
          padding-top: 3rem;
          padding-bottom: 6rem;
        }

        @media (max-width: 768px) {
          .cinematic-final-cta-section {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }

        .final-experience-stage {
          background: #080808;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          padding: 6rem 3rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.5);
          color: #FFFFFF;
        }

        @media (max-width: 768px) {
          .final-experience-stage {
            padding: 3.5rem 1.5rem;
          }
        }

        /* Perspective Road Line */
        .final-road-perspective {
          position: absolute;
          bottom: 0;
          left: 25%;
          right: 25%;
          height: 65%;
          background: linear-gradient(180deg, rgba(197, 168, 128, 0.08) 0%, rgba(8, 8, 8, 0.95) 100%);
          clip-path: polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%);
          border-top: 1px solid rgba(197, 168, 128, 0.3);
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .final-road-perspective {
            left: 10%;
            right: 10%;
          }
        }

        /* Subtle Taillight Glow Traveling into Horizon */
        .horizon-traveling-car {
          position: absolute;
          top: 36%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 24px;
          pointer-events: none;
        }

        .car-taillights-glow {
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, rgba(239, 68, 68, 0.8) 0%, rgba(239, 68, 68, 0.2) 60%, transparent 100%);
          filter: blur(4px);
          animation: carPulseHorizon 3s ease-in-out infinite alternate;
        }

        @keyframes carPulseHorizon {
          0% { transform: scale(0.85); opacity: 0.6; }
          100% { transform: scale(1.15); opacity: 1; }
        }

        .final-cta-content {
          position: relative;
          z-index: 5;
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .horizon-badge {
          margin-bottom: 1.5rem;
        }

        .final-mega-headline {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 5.5vw, 4.4rem);
          line-height: 1.08;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #FFFFFF !important;
          margin-bottom: 1.5rem;
        }

        .text-gradient-champagne {
          background: linear-gradient(135deg, #F0E6D8 0%, #C5A880 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .final-lead-copy {
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: #A3A099 !important;
          line-height: 1.68;
          max-width: 660px;
          margin-bottom: 2.75rem;
        }

        .final-actions-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 4rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        @media (max-width: 640px) {
          .final-actions-row {
            flex-direction: column;
            width: 100%;
            gap: 0.75rem;
          }
          .final-actions-row .btn {
            width: 100%;
          }
        }

        /* Brand Signature */
        .final-brand-signature {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sig-main {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.35rem;
          letter-spacing: 0.22em;
          color: #FFFFFF;
        }

        .sig-champagne {
          color: var(--accent-champagne);
        }

        .sig-sub {
          font-family: var(--font-display);
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          color: var(--accent-champagne);
          font-weight: 600;
        }
      `}</style>
    </section>
  );
};
