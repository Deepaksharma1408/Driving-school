import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const FirstDriveSection: React.FC = () => {
  return (
    <>
      <section id="approach-section" className="editorial-approach-section">
        <div className="container-wide">
          {/* Eyebrow Label with Hairline Rule matching Screenshot */}
          <div className="approach-eyebrow-row">
            <span className="approach-eyebrow-text">OUR APPROACH</span>
            <div className="approach-eyebrow-dash" />
          </div>

          {/* Two-Column Editorial Hero-Follower Layout */}
          <div className="approach-main-editorial-grid">
            {/* Column 1: Monumental Serif Headline */}
            <div className="approach-headline-col">
              <h2 className="approach-serif-title">
                A MODERN WAY<br />
                TO LEARN DRIVING.
              </h2>
            </div>

            {/* Column 2: Narrative Description & Underlined Link */}
            <div className="approach-narrative-col">
              <p className="approach-lead-p">
                We combine professional instruction, real-world experience and modern tools to help you become a safer, smarter and more confident driver.
              </p>

              <Link to="/services" className="approach-explore-link">
                <span>EXPLORE OUR PROGRAMS</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Technical Fleet & Pedagogy Standards Bar */}
          <div className="approach-standards-bar">
            <div className="standard-item">
              <span className="std-label">VEHICLE ARCHITECTURE</span>
              <strong className="std-value">DUAL-CONTROL AUTOMATIC</strong>
              <span className="std-desc">Secondary hydraulic dual-brake pedal</span>
            </div>

            <div className="std-divider" />

            <div className="standard-item">
              <span className="std-label">SAFETY RATING</span>
              <strong className="std-value">5-STAR ANCAP SAFETY</strong>
              <span className="std-desc">Autonomous emergency braking & 8 airbags</span>
            </div>

            <div className="std-divider" />

            <div className="standard-item">
              <span className="std-label">INSTRUCTION</span>
              <strong className="std-value">1-ON-1 ACCREDITED COACHES</strong>
              <span className="std-desc">Transport for NSW licensed instructors</span>
            </div>

            <div className="std-divider" />

            <div className="standard-item">
              <span className="std-label">LOGBOOK VALUE</span>
              <strong className="std-value">3-FOR-1 BONUS HOURS</strong>
              <span className="std-desc">10 structured hours = 30 logbook hours</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ============================================================
           OUR APPROACH SECTION (MATCHING SCREENSHOT DIRECTLY BELOW HERO)
           ============================================================ */
        .editorial-approach-section {
          background-color: var(--bg-warm-ivory);
          padding-top: 5.5rem;
          padding-bottom: 5.5rem;
          border-bottom: 1px solid var(--border-light);
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .editorial-approach-section {
            padding-top: 3.5rem;
            padding-bottom: 3.5rem;
          }
        }

        /* Eyebrow with Line */
        .approach-eyebrow-row {
          display: inline-flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2.2rem;
        }

        .approach-eyebrow-text {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .approach-eyebrow-dash {
          width: 55px;
          height: 1px;
          background-color: var(--text-secondary);
          opacity: 0.4;
        }

        /* 2-Column Editorial Grid */
        .approach-main-editorial-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3.5rem;
          align-items: flex-start;
          margin-bottom: 4.5rem;
        }

        @media (max-width: 1024px) {
          .approach-main-editorial-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            margin-bottom: 3rem;
          }
        }

        /* Column 1: Serif Title */
        .approach-serif-title {
          font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
          font-optical-sizing: auto;
          font-size: clamp(2.4rem, 4.2vw, 3.8rem);
          font-weight: 700;
          line-height: 1.06;
          letter-spacing: 0.035em;
          color: var(--text-primary);
          text-transform: uppercase;
          margin: 0;
        }

        /* Column 2: Lead Paragraph & Underlined Link */
        .approach-narrative-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2rem;
          padding-top: 0.5rem;
        }

        .approach-lead-p {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.3vw, 1.05rem);
          line-height: 1.65;
          color: var(--text-secondary);
          margin: 0;
        }

        .approach-explore-link {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-primary);
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 1.5px solid var(--text-primary);
          transition: all 0.25s ease;
        }

        .approach-explore-link:hover {
          color: var(--accent-champagne);
          border-bottom-color: var(--accent-champagne);
          transform: translateX(3px);
        }

        /* Column 3: Mountain Road Video Card with play button & caption */
        .approach-visual-col {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        @media (max-width: 1024px) {
          .approach-visual-col {
            justify-content: flex-start;
          }
        }

        .road-video-card {
          position: relative;
          width: 100%;
          max-width: 380px;
          height: 155px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          cursor: pointer;
          border: 1px solid var(--border-light);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .road-video-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.14);
        }

        .road-card-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .road-video-card:hover .road-card-image {
          transform: scale(1.05);
        }

        .road-card-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg, 
            rgba(0, 0, 0, 0.1) 0%, 
            rgba(0, 0, 0, 0.65) 60%, 
            rgba(0, 0, 0, 0.88) 100%
          );
        }

        .road-play-circle {
          position: relative;
          z-index: 5;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }

        .road-video-card:hover .road-play-circle {
          background: #FFFFFF;
          color: #111111;
          border-color: #FFFFFF;
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }

        .play-ico {
          margin-left: 2px;
        }

        .road-caption-badge {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          gap: 0.15rem;
        }

        .caption-line {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #FFFFFF;
        }

        /* Standards Bar */
        .approach-standards-bar {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
          gap: 2rem;
          align-items: center;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          padding: 1.5rem 2rem;
          box-shadow: 0 4px 20px rgba(17, 17, 17, 0.03);
        }

        @media (max-width: 1024px) {
          .approach-standards-bar {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            padding: 1.25rem;
          }
          .std-divider {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .approach-standards-bar {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        .standard-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .std-label {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: var(--accent-champagne);
          text-transform: uppercase;
        }

        .std-value {
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-primary);
        }

        .std-desc {
          font-size: 0.76rem;
          color: var(--text-secondary);
        }

        .std-divider {
          width: 1px;
          height: 38px;
          background-color: var(--border-light);
        }

        /* Modal */
        .approach-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .approach-modal-box {
          position: relative;
          width: min(92vw, calc((82vh - 60px) * (16 / 9)));
          max-width: 960px;
          background: #111114;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
          margin: auto;
        }

        .approach-modal-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(18, 18, 22, 0.95);
          flex-shrink: 0;
          min-height: 54px;
          box-sizing: border-box;
        }

        .modal-title-stack {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .modal-sub {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: var(--accent-champagne);
        }

        .modal-heading {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #FFFFFF;
          margin: 0;
        }

        .modal-top-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .icon-circle-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .icon-circle-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }

        .approach-video-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .approach-video-player {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          background: #000000;
        }
      `}</style>
    </>
  );
};
