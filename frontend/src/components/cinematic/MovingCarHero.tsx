import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Star, 
  UserCheck, 
  Car, 
  ShieldCheck 
} from 'lucide-react';
import { Button } from '../ui/Button';

interface MovingCarHeroProps {
  onHeroReady?: () => void;
}

export const MovingCarHero: React.FC<MovingCarHeroProps> = ({ onHeroReady }) => {
  // Quick & Crisp Cinematic Timeline
  const [timelineStep, setTimelineStep] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setTimelineStep(1), 100);
    const t2 = setTimeout(() => setTimelineStep(2), 250);
    const t3 = setTimeout(() => setTimelineStep(3), 400);
    const t4 = setTimeout(() => setTimelineStep(4), 550);
    const t5 = setTimeout(() => setTimelineStep(5), 700);
    const t6 = setTimeout(() => {
      setTimelineStep(6);
      if (onHeroReady) onHeroReady();
    }, 850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onHeroReady]);

  const scrollToServices = () => {
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`cinematic-real-video-hero stage-${timelineStep}`}>
      {/* ============================================================
          1. REAL MP4 DRIVING VIDEO BACKGROUND (PRIMARY MOTION SOURCE)
          ============================================================ */}
      <div className="hero-video-viewport">
        <video 
          className="hero-driving-mp4-element"
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85"
        >
          {/* User Provided Driving Video Asset */}
          <source src="/videos/gerte_an_vedio_ofa_moving_car.mp4" type="video/mp4" />
          <source src="/videos/canguruber-hero-driving.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-through-a-highway-42862-large.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Scrim: Left side dark for typography readability, Right/Center car visible */}
        <div className="hero-cinematic-vignette" />
        <div className="hero-left-text-scrim" />
        <div className="hero-bottom-road-glow" />
      </div>

      {/* Right Minimal Stage Indicator (01) */}
      <div className="hero-vertical-tracker hide-mobile">
        <span className="tracker-num">01</span>
        <div className="tracker-line">
          <div className="tracker-fill" />
        </div>
        <span className="tracker-label">DRIVE</span>
      </div>

      {/* ============================================================
          2. EDITORIAL STAGGERED TYPOGRAPHY & HERO CTAS (LEFT POSITIONED)
          ============================================================ */}
      <div className="container-wide hero-editorial-container">
        <div className="hero-main-column">
          {/* Eyebrow */}
          <div className={`hero-eyebrow-wrapper ${timelineStep >= 1 ? 'revealed' : ''}`}>
            <span className="hero-gold-tag">CANGURUBER DRIVING SCHOOL</span>
            <span className="tag-divider">•</span>
            <span className="hero-sub-tag">NSW TRANSPORT AUTHORISED</span>
          </div>

          {/* Staggered Line-by-Line Headline */}
          <div className="staggered-headline-block">
            <div className="line-mask">
              <h1 className={`headline-row line-1 ${timelineStep >= 2 ? 'visible' : ''}`}>
                GET YOUR
              </h1>
            </div>
            <div className="line-mask">
              <h1 className={`headline-row line-2 ${timelineStep >= 3 ? 'visible' : ''}`}>
                AUSTRALIAN
              </h1>
            </div>
            <div className="line-mask">
              <h1 className={`headline-row line-3 ${timelineStep >= 4 ? 'visible' : ''}`}>
                DRIVER'S LICENCE
              </h1>
            </div>
            <div className="line-mask script-line-mask">
              <span className={`headline-script-gold ${timelineStep >= 5 ? 'visible' : ''}`}>
                WITH CONFIDENCE.
              </span>
            </div>
          </div>

          {/* Supporting Narrative */}
          <p className={`hero-lead-narrative ${timelineStep >= 5 ? 'revealed' : ''}`}>
            Whether you're a beginner learning from scratch, an experienced overseas driver, or preparing for your practical test – Canguruber helps you become a safer, calmer, and fully licensed Australian driver.
          </p>

          {/* Action CTAs */}
          <div className={`hero-ctas-action-row ${timelineStep >= 6 ? 'revealed' : ''}`}>
            <Button to="/book" variant="gold" size="lg" icon={<ArrowRight size={18} />}>
              BOOK A LESSON
            </Button>

            <button onClick={scrollToServices} className="btn btn-glass-outline btn-lg">
              <span>EXPLORE SERVICES</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        {/* ============================================================
            3. BOTTOM FLOATING 4-COLUMN TRUST STRIP
            ============================================================ */}
        <div className={`hero-floating-trust-strip ${timelineStep >= 6 ? 'revealed' : ''}`}>
          <div className="trust-strip-item">
            <div className="trust-icon-box">
              <Star size={18} className="gold-accent-icon" fill="currentColor" />
            </div>
            <div className="trust-meta">
              <strong className="trust-heading">150+ Google Reviews</strong>
              <span className="trust-sub">5.0 Star Student Satisfaction</span>
            </div>
          </div>

          <div className="trust-strip-divider hide-mobile" />

          <div className="trust-strip-item">
            <div className="trust-icon-box">
              <UserCheck size={18} className="gold-accent-icon" />
            </div>
            <div className="trust-meta">
              <strong className="trust-heading">Licensed Instructor</strong>
              <span className="trust-sub">NSW Transport Certified</span>
            </div>
          </div>

          <div className="trust-strip-divider hide-mobile" />

          <div className="trust-strip-item">
            <div className="trust-icon-box">
              <Car size={18} className="gold-accent-icon" />
            </div>
            <div className="trust-meta">
              <strong className="trust-heading">Modern Dual-Control</strong>
              <span className="trust-sub">5★ ANCAP Safety Automatic Fleet</span>
            </div>
          </div>

          <div className="trust-strip-divider hide-mobile" />

          <div className="trust-strip-item">
            <div className="trust-icon-box">
              <ShieldCheck size={18} className="gold-accent-icon" />
            </div>
            <div className="trust-meta">
              <strong className="trust-heading">High Pass Rate</strong>
              <span className="trust-sub">Service NSW Route Mastery</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cinematic-real-video-hero {
          position: relative;
          min-height: 94vh;
          width: 100%;
          background: #07131D;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          padding-top: 5rem;
          padding-bottom: 3.5rem;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .cinematic-real-video-hero {
            min-height: auto;
            padding-top: 2.25rem;
            padding-bottom: 2.5rem;
          }
        }

        /* Real Video Viewport */
        .hero-video-viewport {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
        .hero-driving-mp4-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 65% center;
          transform: scale(1.02);
        }

        /* Scrim & Gradients: Text is clear on left, moving car remains clearly visible on right/center */
        .hero-cinematic-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(7, 19, 29, 0.45) 0%, rgba(7, 19, 29, 0.1) 40%, rgba(7, 19, 29, 0.9) 100%);
        }
        .hero-left-text-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(7, 19, 29, 0.96) 0%, rgba(7, 19, 29, 0.85) 45%, rgba(7, 19, 29, 0.3) 75%, rgba(7, 19, 29, 0.1) 100%);
        }
        @media (max-width: 768px) {
          .hero-left-text-scrim {
            background: linear-gradient(180deg, rgba(7, 19, 29, 0.92) 0%, rgba(7, 19, 29, 0.85) 55%, rgba(7, 19, 29, 0.96) 100%);
          }
        }
        .hero-bottom-road-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30%;
          background: linear-gradient(180deg, transparent 0%, rgba(7, 19, 29, 0.9) 100%);
        }

        /* Right Stage Tracker */
        .hero-vertical-tracker {
          position: absolute;
          right: 3rem;
          top: 35%;
          z-index: 15;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
        }
        .tracker-num {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.85rem;
          color: var(--accent-gold);
          letter-spacing: 0.05em;
        }
        .tracker-line {
          width: 2px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          position: relative;
          border-radius: 2px;
        }
        .tracker-fill {
          position: absolute;
          top: 0;
          left: -1px;
          width: 4px;
          height: 32px;
          background: var(--accent-gold);
          border-radius: 2px;
        }
        .tracker-label {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: #9BB0C1;
          writing-mode: vertical-rl;
          margin-top: 0.4rem;
        }

        /* Foreground Content (Left-Aligned) */
        .hero-editorial-container {
          position: relative;
          z-index: 10;
          width: 100%;
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        @media (max-width: 768px) {
          .hero-editorial-container {
            min-height: auto;
          }
        }
        .hero-main-column {
          max-width: 820px;
          padding-top: 1rem;
        }

        /* Eyebrow */
        .hero-eyebrow-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.15rem;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          flex-wrap: wrap;
        }
        .hero-eyebrow-wrapper.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-gold-tag {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(0.725rem, 2.8vw, 0.85rem);
          letter-spacing: 0.18em;
          color: var(--accent-gold);
        }
        .tag-divider {
          color: rgba(255, 255, 255, 0.4);
        }
        .hero-sub-tag {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(0.68rem, 2.5vw, 0.775rem);
          letter-spacing: 0.1em;
          color: #9BB0C1;
        }

        /* Line-by-Line Staggered Typography */
        .staggered-headline-block {
          margin-bottom: 1.15rem;
        }
        .line-mask {
          overflow: hidden;
          margin-bottom: -0.06em;
        }
        .headline-row {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 900;
          font-size: clamp(1.85rem, 6.8vw, 4.2rem);
          letter-spacing: -0.025em;
          line-height: 0.98;
          text-transform: uppercase;
          color: #FFFFFF;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.8);
          transform: translateY(60px);
          opacity: 0;
          filter: blur(4px);
          transition: transform 0.4s var(--ease-cinematic), opacity 0.4s ease, filter 0.4s ease;
        }
        .headline-row.visible {
          transform: translateY(0);
          opacity: 1;
          filter: blur(0);
        }

        /* Gold Script Highlight */
        .script-line-mask {
          overflow: visible;
          position: relative;
          margin-top: 0.05em;
        }
        .headline-script-gold {
          display: inline-block;
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 900;
          font-size: clamp(1.55rem, 5.8vw, 3.4rem);
          letter-spacing: 0.02em;
          color: var(--accent-gold);
          line-height: 1.05;
          text-transform: uppercase;
          transform: translateY(60px);
          opacity: 0;
          filter: blur(4px);
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.9), 0 0 35px rgba(201, 168, 78, 0.4);
          transition: transform 0.42s var(--ease-cinematic), opacity 0.42s ease, filter 0.42s ease;
        }
        .headline-script-gold.visible {
          transform: translateY(0);
          opacity: 1;
          filter: blur(0);
        }

        /* Narrative paragraph */
        .hero-lead-narrative {
          font-size: clamp(0.925rem, 2.6vw, 1.025rem);
          color: #D3E0EA;
          line-height: 1.6;
          max-width: 580px;
          margin-top: 1rem;
          margin-bottom: 2rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .hero-lead-narrative.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* CTAs */
        .hero-ctas-action-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .hero-ctas-action-row.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 640px) {
          .hero-ctas-action-row {
            flex-direction: column;
            width: 100%;
            gap: 0.75rem;
            margin-bottom: 2rem;
          }
          .hero-ctas-action-row .btn,
          .hero-ctas-action-row button {
            width: 100%;
            justify-content: center;
          }
        }

        /* Floating Trust Strip */
        .hero-floating-trust-strip {
          background: rgba(13, 28, 39, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-md);
          padding: 1rem 1.75rem;
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
          align-items: center;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.45);
          margin-top: auto;
          width: 100%;
          max-width: 1180px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .hero-floating-trust-strip.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 1024px) {
          .hero-floating-trust-strip {
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
            padding: 1.25rem;
          }
          .trust-strip-divider {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .hero-floating-trust-strip {
            grid-template-columns: 1fr;
            gap: 0.85rem;
            padding: 1rem;
            margin-top: 1.5rem;
          }
        }

        .trust-strip-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .trust-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .gold-accent-icon {
          color: var(--accent-gold);
        }
        .trust-meta {
          display: flex;
          flex-direction: column;
        }
        .trust-heading {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.925rem;
          color: #FFFFFF;
          line-height: 1.15;
        }
        .trust-sub {
          font-size: 0.72rem;
          color: #9BB0C1;
          font-weight: 500;
        }
        .trust-strip-divider {
          width: 1px;
          height: 32px;
          background: rgba(255, 255, 255, 0.15);
        }

        /* Video Modal */
        .hero-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          z-index: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .hero-modal-content {
          background: #07131D;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.15);
          width: 100%;
          max-width: 820px;
          padding: 1.25rem;
          position: relative;
        }
        .modal-close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: #9BB0C1;
          transition: color 0.2s;
          background: transparent;
        }
        .modal-close-button:hover {
          color: #FFFFFF;
        }
        .modal-video-box {
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #000000;
        }
        .modal-actual-video {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
    </section>
  );
};
