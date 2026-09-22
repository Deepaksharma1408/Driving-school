import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface EditorialHeroProps {
  onHeroReady?: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({ onHeroReady }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const steps = [
    { num: '01', title: 'LEARN', desc: 'Dual-control vehicle mastery, road rules, and observation routines.' },
    { num: '02', title: 'PRACTICE', desc: 'Complex intersections, multi-lane roundabouts, and precision parking.' },
    { num: '03', title: 'BUILD CONFIDENCE', desc: 'Mock test simulations on authentic Service NSW exam routes.' },
    { num: '04', title: 'DRIVE ANYWHERE', desc: 'Lifelong defensive driving instincts and full independence.' }
  ];

  useEffect(() => {
    if (onHeroReady) {
      onHeroReady();
    }
  }, [onHeroReady]);

  // Auto-cycle steps smoothly every 5.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [steps.length]);

  // Subtle luxury 3D mouse parallax tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <>
      <section 
        className="cinematic-editorial-hero" 
        aria-label="Drivinity Driving Academy Hero"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Visual Layer with Ken-Burns and Parallax */}
        <div className="hero-scenic-backdrop">
          <motion.div 
            className="hero-backdrop-motion-wrapper"
            animate={{
              x: mouseOffset.x * -12,
              y: mouseOffset.y * -8,
              scale: [1.02, 1.05, 1.02]
            }}
            transition={{
              x: { type: 'spring', damping: 25, stiffness: 60 },
              y: { type: 'spring', damping: 25, stiffness: 60 },
              scale: { duration: 18, repeat: Infinity, ease: 'easeInOut' }
            }}
          >
            <img 
              src="/assets/hero-arch-porsche.jpg?v=2026" 
              alt="Drivinity Luxury Dark Sports Car Framed by Architectural Arch at Sunrise" 
              className="hero-backdrop-image"
            />
          </motion.div>

          {/* Ambient Lighting & Luminous Floor Light Shimmer */}
          <div className="ambient-floor-beam" />
          <div className="hero-dark-vignette" />
          <div className="hero-top-scrim" />
          <div className="hero-bottom-scrim" />
        </div>

        {/* Hero Content Stage with Foreground Floating Parallax */}
        <motion.div 
          className="container-wide hero-content-container"
          animate={{
            x: mouseOffset.x * 6,
            y: mouseOffset.y * 4
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 70 }}
        >
          {/* Main Two-Column Editorial Stage */}
          <div className="hero-editorial-main-grid">
            {/* Left Column: Monumental Headline & Narrative CTAs */}
            <div className="hero-left-narrative">
              {/* Animated Eyebrow */}
              <motion.span 
                className="hero-eyebrow-tag"
                initial={{ opacity: 0, y: 16, letterSpacing: '0.14em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.28em' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                SKILLS TODAY. A BRIGHTER TOMORROW.
              </motion.span>

              {/* Staggered Split-Mask Headline */}
              <h1 className="hero-monumental-headline" aria-label="CONFIDENCE DRIVES FURTHER.">
                <span className="headline-mask-row">
                  <motion.span
                    className="headline-masked-word"
                    initial={{ y: '115%', rotateX: 18, opacity: 0 }}
                    animate={{ y: '0%', rotateX: 0, opacity: 1 }}
                    transition={{ duration: 1.25, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    CONFIDENCE
                  </motion.span>
                </span>
                <span className="headline-mask-row">
                  <motion.span
                    className="headline-masked-word"
                    initial={{ y: '115%', rotateX: 18, opacity: 0 }}
                    animate={{ y: '0%', rotateX: 0, opacity: 1 }}
                    transition={{ duration: 1.25, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    DRIVES
                  </motion.span>
                </span>
                <span className="headline-mask-row">
                  <motion.span
                    className="headline-masked-word"
                    initial={{ y: '115%', rotateX: 18, opacity: 0 }}
                    animate={{ y: '0%', rotateX: 0, opacity: 1 }}
                    transition={{ duration: 1.25, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    FURTHER.
                  </motion.span>
                </span>
              </h1>

              {/* Smooth Blur-In Lead Paragraph */}
              <motion.p 
                className="hero-lead-description"
                initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.15, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
              >
                Professional driving education designed for real roads, real situations and a brighter you.
              </motion.p>

              {/* Action Buttons with Micro-interactions */}
              <motion.div 
                className="hero-action-buttons-group"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Link to="/book" className="hero-primary-pill-btn">
                    <span>START YOUR JOURNEY</span>
                    <ArrowRight size={16} className="btn-arrow" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column: Quote Lockup & Vertical Stepper Rail */}
            <div className="hero-right-editorial-column">
              {/* Top Right Quote Lockup */}
              <motion.div 
                className="hero-quote-lockup"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="hero-quote-text">
                  “ More than a lesson,<br />
                  it's a lifelong skill. ”
                </blockquote>
                <motion.div 
                  className="quote-divider-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>

              {/* Vertical Step Track Indicator with Live Progress Fill */}
              <motion.div 
                className="hero-vertical-stepper"
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="stepper-track-rail">
                  <motion.div 
                    className="stepper-track-fill" 
                    animate={{ 
                      height: `${((activeStep + 1) / steps.length) * 100}%` 
                    }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  />
                </div>

                <div className="stepper-items-list">
                  {steps.map((step, idx) => {
                    const isActive = activeStep === idx;
                    return (
                      <button
                        key={step.num}
                        type="button"
                        className={`stepper-step-row ${isActive ? 'active' : ''}`}
                        onClick={() => setActiveStep(idx)}
                        aria-label={`Step ${step.num}: ${step.title}`}
                      >
                        <div className="step-row-head">
                          <span className="step-num-code">{step.num}</span>
                          <span className="step-title-text">{step.title}</span>
                          {isActive && <motion.span layoutId="stepperDot" className="step-active-dot" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Floating Metrics Bar */}
          <motion.div 
            className="hero-bottom-stats-bar"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="stats-kpi-group">
              <motion.div 
                className="kpi-stat-block"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.95 }}
              >
                <strong className="kpi-num">10K+</strong>
                <span className="kpi-label">Students Trained</span>
              </motion.div>

              <div className="kpi-divider-line" />

              <motion.div 
                className="kpi-stat-block"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.05 }}
              >
                <strong className="kpi-num">98%</strong>
                <span className="kpi-label">Pass Rate</span>
              </motion.div>

              <div className="kpi-divider-line" />

              <motion.div 
                className="kpi-stat-block"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.15 }}
              >
                <strong className="kpi-num">15+</strong>
                <span className="kpi-label">Expert Instructors</span>
              </motion.div>
            </div>

            <motion.div 
              className="stats-tagline-lockup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 1.1 }}
            >
              <span className="tagline-row">BETTER DRIVERS</span>
              <span className="tagline-row">BRIGHTER FUTURES</span>
              <div className="tagline-dash-rule" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>



      <style>{`
        /* ============================================================
           CINEMATIC EDITORIAL HERO (MATCHING BENCHMARK SCREENSHOT)
           ============================================================ */
        .cinematic-editorial-hero {
          position: relative;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 6.5rem;
          padding-bottom: 2.2rem;
          overflow: hidden;
          background-color: #0c0d10;
          color: #FFFFFF;
        }

        @media (max-width: 768px) {
          .cinematic-editorial-hero {
            padding-top: 5.5rem;
            padding-bottom: 1.5rem;
            min-height: auto;
          }
        }

        /* Full-Bleed Photographic Scenic Backdrop */
        .hero-scenic-backdrop {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
          pointer-events: none;
        }

        .hero-backdrop-motion-wrapper {
          position: absolute;
          inset: -30px;
          width: calc(100% + 60px);
          height: calc(100% + 60px);
          will-change: transform;
        }

        .hero-backdrop-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 40%;
          display: block;
          image-rendering: -webkit-optimize-contrast;
        }

        /* Ambient Floor Curved Neon Light Sweep */
        .ambient-floor-beam {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 45% 65%,
            rgba(255, 215, 160, 0.08) 0%,
            transparent 60%
          );
          mix-blend-mode: screen;
          pointer-events: none;
          animation: lightPulse 6s ease-in-out infinite alternate;
        }

        @keyframes lightPulse {
          0% { opacity: 0.4; }
          100% { opacity: 0.9; }
        }

        /* Subtle Gradient Scrims for High Editorial Contrast */
        .hero-dark-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(6, 7, 10, 0.75) 0%,
            rgba(6, 7, 10, 0.48) 40%,
            rgba(6, 7, 10, 0.15) 65%,
            rgba(6, 7, 10, 0.4) 100%
          );
          pointer-events: none;
        }

        .hero-top-scrim {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 22vh;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%);
          pointer-events: none;
        }

        .hero-bottom-scrim {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30vh;
          background: linear-gradient(0deg, rgba(8, 9, 12, 0.92) 0%, rgba(8, 9, 12, 0.4) 60%, rgba(8, 9, 12, 0) 100%);
          pointer-events: none;
        }

        /* Container Layout */
        .hero-content-container {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          will-change: transform;
        }

        .hero-editorial-main-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.9fr;
          gap: 3.5rem;
          align-items: center;
          margin-top: auto;
          margin-bottom: auto;
          padding-top: 1.5rem;
          padding-bottom: 2.5rem;
        }

        @media (max-width: 1024px) {
          .hero-editorial-main-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            padding-top: 1rem;
            padding-bottom: 1.5rem;
          }
        }

        /* Left Column Content */
        .hero-left-narrative {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-eyebrow-tag {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 1.5rem;
          display: inline-block;
        }

        /* Monumental Headline with Masked Rows */
        .hero-monumental-headline {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 1.6rem;
        }

        .headline-mask-row {
          display: block;
          overflow: hidden;
          line-height: 1.02;
          padding-bottom: 0.08em;
        }

        .headline-masked-word {
          display: inline-block;
          font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
          font-optical-sizing: auto;
          font-size: clamp(1.85rem, 5.2vw, 3.9rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: 0.035em;
          color: #FFFFFF;
          text-transform: uppercase;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.45);
          will-change: transform, opacity;
        }

        @media (max-width: 480px) {
          .headline-masked-word {
            font-size: clamp(1.6rem, 7.5vw, 2.3rem);
            letter-spacing: 0.02em;
          }
        }

        .hero-lead-description {
          font-family: var(--font-body);
          font-size: clamp(0.85rem, 1.05vw, 0.95rem);
          font-weight: 350;
          line-height: 1.65;
          letter-spacing: 0.01em;
          color: rgba(245, 243, 238, 0.78);
          max-width: 420px;
          margin-bottom: 2rem;
        }

        /* Action Buttons with Sheen & Radar Wave */
        .hero-action-buttons-group {
          display: flex;
          align-items: center;
          gap: 1.8rem;
          flex-wrap: wrap;
        }

        @media (max-width: 480px) {
          .hero-action-buttons-group {
            gap: 1rem;
            width: 100%;
          }
          .hero-primary-pill-btn {
            width: 100%;
            justify-content: center;
          }
        }

        .hero-primary-pill-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: #F4F1EA;
          color: #0E0F12;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.95rem 2.2rem;
          border-radius: var(--radius-full);
          transition: all 0.28s var(--ease-cinematic);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 30px rgba(244, 241, 234, 0.15);
        }

        .hero-primary-pill-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.5) 50%,
            transparent 100%
          );
          transform: translateX(-100%);
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-primary-pill-btn:hover::after {
          transform: translateX(100%);
        }

        .hero-primary-pill-btn:hover {
          background: #FFFFFF;
          color: #000000;
          box-shadow: 0 8px 32px rgba(255, 255, 255, 0.3);
        }

        .btn-arrow {
          transition: transform 0.25s ease;
        }

        .hero-primary-pill-btn:hover .btn-arrow {
          transform: translateX(3px);
        }



        /* Right Column Elements */
        .hero-right-editorial-column {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4rem;
        }

        @media (max-width: 1024px) {
          .hero-right-editorial-column {
            align-items: flex-start;
            gap: 2rem;
          }
        }

        /* Quote Lockup */
        .hero-quote-lockup {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          max-width: 380px;
          text-align: right;
        }

        @media (max-width: 1024px) {
          .hero-quote-lockup {
            align-items: flex-start;
            text-align: left;
          }
        }

        .hero-quote-text {
          font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
          font-size: clamp(1.15rem, 1.8vw, 1.45rem);
          font-weight: 600;
          font-style: normal;
          line-height: 1.38;
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.92);
          margin-bottom: 0.85rem;
        }

        .quote-divider-line {
          width: 44px;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.38);
          transform-origin: right;
        }

        @media (max-width: 1024px) {
          .quote-divider-line {
            transform-origin: left;
          }
        }

        /* Vertical Stepper Rail on Far Right */
        .hero-vertical-stepper {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }

        .stepper-track-rail {
          width: 1.5px;
          height: 160px;
          background-color: rgba(255, 255, 255, 0.16);
          position: relative;
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .stepper-track-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(180deg, #FFFFFF, var(--accent-champagne));
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.85);
        }

        .stepper-items-list {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .stepper-step-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          text-align: left;
          opacity: 0.42;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .step-row-head {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .stepper-step-row:hover, .stepper-step-row.active {
          opacity: 1;
          transform: translateX(4px);
        }

        .step-num-code {
          font-family: var(--font-display);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.55);
          transition: color 0.25s ease;
        }

        .stepper-step-row.active .step-num-code {
          color: var(--accent-champagne);
        }

        .step-title-text {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #FFFFFF;
        }

        .step-active-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--accent-champagne);
          box-shadow: 0 0 8px var(--accent-champagne);
        }

        /* Bottom Floating Metrics Bar */
        .hero-bottom-stats-bar {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          width: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1.5rem;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .hero-bottom-stats-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
        }

        .stats-kpi-group {
          display: flex;
          align-items: center;
          gap: 3rem;
        }

        @media (max-width: 640px) {
          .stats-kpi-group {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 0.75rem;
            width: 100%;
          }
        }

        @media (max-width: 400px) {
          .stats-kpi-group {
            grid-template-columns: 1fr 1fr;
            gap: 1rem 0.75rem;
          }
        }

        .kpi-stat-block {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .kpi-num {
          font-family: 'Cinzel', 'Outfit', sans-serif;
          font-size: clamp(1.65rem, 3.4vw, 2.75rem);
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #FFFFFF;
          line-height: 1;
        }

        .kpi-label {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 450;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.65);
        }

        .kpi-divider-line {
          width: 1px;
          height: 36px;
          background-color: rgba(255, 255, 255, 0.15);
        }

        @media (max-width: 640px) {
          .headline-masked-word {
            font-size: clamp(1.85rem, 8.5vw, 3.2rem);
          }
          .hero-lead-description {
            font-size: 0.92rem;
            max-width: 100%;
          }
          .kpi-divider-line {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .stats-kpi-group {
            display: flex;
            flex-wrap: wrap;
            gap: 1.25rem 1.75rem;
            width: 100%;
          }
          .kpi-num {
            font-size: 1.9rem;
          }
          .hero-primary-pill-btn {
            width: 100%;
            justify-content: center;
            padding: 0.9rem 1.6rem;
          }
        }

        .stats-tagline-lockup {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          gap: 0.15rem;
        }

        @media (max-width: 768px) {
          .stats-tagline-lockup {
            align-items: flex-start;
            text-align: left;
          }
        }

        .tagline-row {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.75);
        }

        .tagline-dash-rule {
          width: 48px;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.4);
          margin-top: 0.4rem;
          animation: pulseDash 3s ease-in-out infinite alternate;
        }

        @keyframes pulseDash {
          0% { width: 32px; opacity: 0.4; }
          100% { width: 56px; opacity: 0.9; }
        }
      `}</style>
    </>
  );
};
