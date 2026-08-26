import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, Play, FastForward } from 'lucide-react';
import { Button } from '../ui/Button';

interface IntroExperienceProps {
  onIntroComplete?: () => void;
}

export const IntroExperience: React.FC<IntroExperienceProps> = ({ onIntroComplete }) => {
  // Intro Phases:
  // 0: Gate Closed & Studio Ambient
  // 1: Gate Opening & Light Flood
  // 2: Car Pushing Forward & Perspective Drive
  // 3: Word Reveal 1 "LEARN."
  // 4: Word Reveal 2 "DRIVE."
  // 5: Word Reveal 3 "CONFIDENTLY."
  // 6: Master Headline "YOUR LICENCE. YOUR FREEDOM." & Hero Action Reveal
  const [phase, setPhase] = useState<number>(0);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);

  useEffect(() => {
    if (isSkipped) {
      setPhase(6);
      if (onIntroComplete) onIntroComplete();
      return;
    }

    const t1 = setTimeout(() => setPhase(1), 600);    // Gate starts opening
    const t2 = setTimeout(() => setPhase(2), 1600);   // Car pushes forward
    const t3 = setTimeout(() => setPhase(3), 2600);   // "LEARN."
    const t4 = setTimeout(() => setPhase(4), 3300);   // "DRIVE."
    const t5 = setTimeout(() => setPhase(5), 4000);   // "CONFIDENTLY."
    const t6 = setTimeout(() => {
      setPhase(6);                                    // Master Campaign Typography & Hero CTAs
      if (onIntroComplete) onIntroComplete();
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [isSkipped, onIntroComplete]);

  const handleSkip = () => {
    setIsSkipped(true);
    setPhase(6);
    if (onIntroComplete) onIntroComplete();
  };

  const scrollToFirstSection = () => {
    const el = document.getElementById('first-drive-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`intro-hero-wrapper phase-${phase}`}>
      {/* Skip Intro Button (for repeat visitors) */}
      {phase < 6 && (
        <button className="skip-intro-btn" onClick={handleSkip} aria-label="Skip intro animation">
          <span>Skip Cinematic Intro</span>
          <FastForward size={14} />
        </button>
      )}

      {/* Showroom Studio Background with Perspective Grid Lines */}
      <div className="studio-background">
        <div className="studio-light-beam" />
        <div className="studio-perspective-floor" />
      </div>

      {/* ============================================================
          SHOWROOM GARAGE GATE / SHUTTER MECHANISM
          ============================================================ */}
      <div className={`garage-gate-container ${phase >= 1 ? 'gate-open' : ''}`}>
        <div className="gate-shutter-left">
          <div className="gate-slats">
            <span className="gate-brand-emboss">DRIVEWISE SHOWROOM // BAY 01</span>
            <div className="slat" />
            <div className="slat" />
            <div className="slat" />
            <div className="slat" />
            <div className="slat" />
          </div>
        </div>
        <div className="gate-shutter-right">
          <div className="gate-slats">
            <span className="gate-brand-emboss">NSW AUTHORIZED ACADEMY</span>
            <div className="slat" />
            <div className="slat" />
            <div className="slat" />
            <div className="slat" />
            <div className="slat" />
          </div>
        </div>
        <div className="gate-light-leak" />
      </div>

      {/* ============================================================
          CINEMATIC CAR ENTRANCE
          ============================================================ */}
      <div className={`cinematic-car-stage ${phase >= 2 ? 'car-advanced' : ''}`}>
        <div className="car-vehicle-chassis">
          <img 
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=85" 
            alt="Modern luxury dual-control training vehicle entering showroom" 
            className="car-photo-element"
          />
          {/* Headlight beam overlay simulation */}
          <div className={`car-headlight-beams ${phase >= 2 ? 'beams-on' : ''}`} />
          {/* Ambient Vehicle Shadow */}
          <div className="car-ground-shadow" />
        </div>
      </div>

      {/* ============================================================
          CINEMATIC TYPOGRAPHY OVERLAY
          ============================================================ */}
      <div className="cinematic-typography-stage">
        <div className="container text-center">
          {/* 3-Word Sequential Reveal */}
          {phase >= 3 && phase < 6 && (
            <div className="sequential-word-box">
              {phase === 3 && <h1 className="reveal-word word-1">LEARN.</h1>}
              {phase === 4 && <h1 className="reveal-word word-2">DRIVE.</h1>}
              {phase === 5 && <h1 className="reveal-word word-3">CONFIDENTLY.</h1>}
            </div>
          )}

          {/* Master Final Headline & Hero Content */}
          <div className={`master-hero-content ${phase >= 6 ? 'visible' : ''}`}>
            <div className="hero-top-badge">
              <span className="pill-badge accent">
                <Sparkles size={14} />
                THE NEXT-GENERATION DRIVING ACADEMY
              </span>
              <span className="pill-badge">
                <ShieldCheck size={14} />
                NSW TRANSPORT AUTHORIZED
              </span>
            </div>

            <h1 className="master-campaign-headline">
              YOUR LICENCE. <br />
              <span className="lime-highlight">YOUR FREEDOM.</span>
            </h1>

            <p className="master-subcopy">
              A bespoke, calm, and test-route mastered driving experience. Designed for beginners, overseas licence conversions, and first-attempt practical test excellence.
            </p>

            <div className="hero-cta-group">
              <Button to="/book" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                BOOK YOUR FIRST LESSON
              </Button>
              <button onClick={scrollToFirstSection} className="btn btn-outline btn-lg explore-btn">
                <span>EXPLORE THE EXPERIENCE</span>
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Micro Metrics Trust Strip */}
            <div className="hero-metrics-strip">
              <div className="metric-cell">
                <span className="metric-val">1-ON-1</span>
                <span className="metric-lbl">Tailored In-Car Coaching</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-cell">
                <span className="metric-val">3-FOR-1</span>
                <span className="metric-lbl">NSW Logbook Bonus Hours</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-cell">
                <span className="metric-val">5★ ANCAP</span>
                <span className="metric-lbl">Dual-Control Auto Fleet</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .intro-hero-wrapper {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background-color: var(--bg-main);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 0 4rem 0;
        }

        /* Skip Intro Button */
        .skip-intro-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-medium);
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.75rem;
          color: var(--text-primary);
          transition: all 0.2s ease;
        }
        .skip-intro-btn:hover {
          background: var(--text-primary);
          color: #FFFFFF;
        }

        /* Showroom Studio Environment */
        .studio-background {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 30%, #FFFFFF 0%, #F5F4EC 60%, #E8E6DB 100%);
          z-index: 1;
        }
        .studio-light-beam {
          position: absolute;
          top: -20%;
          left: 20%;
          right: 20%;
          height: 70%;
          background: radial-gradient(ellipse at 50% 0%, rgba(216, 243, 106, 0.28) 0%, rgba(255, 255, 255, 0) 70%);
          filter: blur(40px);
          pointer-events: none;
        }
        .studio-perspective-floor {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 45%;
          background: linear-gradient(180deg, rgba(232, 230, 219, 0) 0%, rgba(220, 217, 204, 0.35) 100%);
          border-top: 1px solid rgba(210, 206, 192, 0.4);
        }

        /* ============================================================
           GARAGE / SHOWROOM GATE
           ============================================================ */
        .garage-gate-container {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          pointer-events: none;
          transition: opacity 1.2s var(--ease-heavy);
        }
        .gate-shutter-left, .gate-shutter-right {
          flex: 1;
          height: 100%;
          background: #E5E3D8;
          border-right: 1px solid var(--border-medium);
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem;
          transition: transform 1.6s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .gate-shutter-left {
          transform-origin: left center;
        }
        .gate-shutter-right {
          transform-origin: right center;
        }
        .gate-slats {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          opacity: 0.85;
        }
        .gate-brand-emboss {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .slat {
          height: 14px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 4px;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04);
        }
        .gate-open .gate-shutter-left {
          transform: translateX(-105%) skewY(2deg);
        }
        .gate-open .gate-shutter-right {
          transform: translateX(105%) skewY(-2deg);
        }
        .gate-open {
          opacity: 0;
          pointer-events: none;
        }

        /* ============================================================
           CINEMATIC CAR STAGE
           ============================================================ */
        .cinematic-car-stage {
          position: absolute;
          z-index: 4;
          width: 85%;
          max-width: 1080px;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(60px) scale(0.88);
          opacity: 0.5;
          filter: blur(3px);
          transition: transform 1.8s var(--ease-cinematic), opacity 1.4s ease, filter 1.2s ease;
          pointer-events: none;
        }
        .cinematic-car-stage.car-advanced {
          transform: translateY(10px) scale(1);
          opacity: 0.95;
          filter: blur(0);
        }
        .car-vehicle-chassis {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-cinematic);
          background: #E5E3D8;
        }
        .car-photo-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.04);
          transition: transform 3s ease-out;
        }
        .car-advanced .car-photo-element {
          transform: scale(1);
        }
        .car-headlight-beams {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(180deg, rgba(216, 243, 106, 0) 0%, rgba(216, 243, 106, 0.25) 100%);
          opacity: 0;
          transition: opacity 1.5s ease;
          mix-blend-mode: overlay;
        }
        .beams-on {
          opacity: 1;
        }
        .car-ground-shadow {
          position: absolute;
          bottom: -20px;
          left: 10%;
          right: 10%;
          height: 40px;
          background: radial-gradient(ellipse at center, rgba(16, 24, 32, 0.4) 0%, rgba(0, 0, 0, 0) 70%);
          filter: blur(14px);
        }

        /* ============================================================
           TYPOGRAPHY STAGE
           ============================================================ */
        .cinematic-typography-stage {
          position: relative;
          z-index: 15;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Sequential word reveals */
        .sequential-word-box {
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .reveal-word {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 9vw, 8rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          animation: wordPop 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          text-shadow: 0 10px 40px rgba(255, 255, 255, 0.9);
        }
        @keyframes wordPop {
          0% { opacity: 0; transform: scale(0.85) translateY(20px); filter: blur(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }

        /* Master Hero Content */
        .master-hero-content {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s var(--ease-cinematic), transform 1s var(--ease-cinematic);
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
        }
        .master-hero-content.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .hero-top-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .master-campaign-headline {
          font-size: clamp(3.2rem, 7.5vw, 6.8rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 0.96;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }
        .lime-highlight {
          position: relative;
          display: inline-block;
          color: var(--text-primary);
        }
        .lime-highlight::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 10px;
          width: 100%;
          height: 18px;
          background: var(--accent-lime);
          z-index: -1;
          border-radius: 6px;
        }
        .master-subcopy {
          font-size: clamp(1.05rem, 1.8vw, 1.25rem);
          max-width: 720px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2.75rem;
        }
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .explore-btn {
          cursor: pointer;
        }

        /* Metrics Strip */
        .hero-metrics-strip {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-full);
          padding: 0.85rem 2.25rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          box-shadow: var(--shadow-card);
        }
        @media (max-width: 768px) {
          .hero-metrics-strip {
            flex-direction: column;
            gap: 0.75rem;
            border-radius: var(--radius-lg);
            padding: 1.25rem;
            width: 100%;
          }
          .metric-divider {
            display: none;
          }
        }
        .metric-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .metric-val {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.1rem;
          color: var(--text-primary);
        }
        .metric-lbl {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .metric-divider {
          width: 1px;
          height: 28px;
          background: var(--border-medium);
        }
      `}</style>
    </section>
  );
};
