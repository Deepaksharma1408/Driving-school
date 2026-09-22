import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ArrowUpRight, Sparkles, Star } from 'lucide-react';
import { SERVICES } from '../../data/content';

interface CardTheme {
  themeClass: string;
  accentColor: string;
  gradientBorder: string;
  badgeBg: string;
  badgeColor: string;
  glowColor: string;
}

const CARD_THEMES: Record<string, CardTheme> = {
  'driving-lessons': {
    themeClass: 'theme-champagne',
    accentColor: '#C5A880',
    gradientBorder: 'linear-gradient(135deg, rgba(197, 168, 128, 0.6) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(197, 168, 128, 0.3) 100%)',
    badgeBg: 'rgba(197, 168, 128, 0.15)',
    badgeColor: '#C5A880',
    glowColor: 'rgba(197, 168, 128, 0.25)'
  },
  'car-hire': {
    themeClass: 'theme-platinum',
    accentColor: '#8EADC6',
    gradientBorder: 'linear-gradient(135deg, rgba(142, 173, 198, 0.6) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(142, 173, 198, 0.3) 100%)',
    badgeBg: 'rgba(142, 173, 198, 0.16)',
    badgeColor: '#7A9EB9',
    glowColor: 'rgba(142, 173, 198, 0.25)'
  },
  'lesson-and-car': {
    themeClass: 'theme-imperial-gold',
    accentColor: '#D4AF37',
    gradientBorder: 'linear-gradient(135deg, #D4AF37 0%, rgba(240, 208, 140, 0.8) 40%, rgba(255, 255, 255, 0.3) 70%, #D4AF37 100%)',
    badgeBg: 'linear-gradient(135deg, #D4AF37 0%, #C49826 100%)',
    badgeColor: '#111114',
    glowColor: 'rgba(212, 175, 55, 0.38)'
  }
};

export const EditorialPrograms: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="programs-section" className="editorial-programs-section section-padding">
      <div className="container-wide">
        {/* Editorial Section Header */}
        <motion.div 
          className="programs-header-row"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="header-text-block">
            <div className="editorial-meta-tag champagne">
              <Sparkles size={13} className="meta-icon" />
              <span>SECTION 03</span>
              <span className="tag-dash" />
              <span>ACADEMY CURRICULUM</span>
            </div>

            <h2 className="programs-headline">
              OUR DRIVING <br />
              <span className="headline-accent">PROGRAMS.</span>
            </h2>
            <p className="programs-subtitle-lead">
              Three distinct training tracks tailored for foundational learners, exam-ready students, and complete test-day mastery.
            </p>
          </div>

          <div className="header-link-block hide-mobile">
            <Link to="/services" className="editorial-compare-link">
              <span>EXPLORE ALL PACKAGES & PRICING</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* 3 Side-by-Side Luxury Gradient Cards Grid */}
        <div className="programs-side-by-side-grid">
          {SERVICES.map((program, idx) => {
            const isHovered = hoveredIdx === idx;
            const theme = CARD_THEMES[program.id] || CARD_THEMES['driving-lessons'];
            const isFeatured = program.id === 'lesson-and-car';

            return (
              <motion.article 
                key={program.id}
                className={`program-luxury-card ${theme.themeClass} ${isFeatured ? 'featured-card' : ''} ${isHovered ? 'hovered' : ''}`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  y: -10,
                  transition: { type: 'spring', stiffness: 350, damping: 22 }
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Ambient Soft Under-Glow */}
                <div 
                  className="card-ambient-glow"
                  style={{ background: theme.glowColor }}
                />

                {/* Animated Shimmer Gleam Line */}
                <div className="card-top-gradient-rim" />

                {/* Card Top Image Viewport */}
                <div className="card-media-viewport">
                  <img 
                    src={program.image} 
                    alt={program.title} 
                    className="card-media-image"
                    loading="lazy" 
                  />
                  <div className="card-image-scrim" />

                  {/* Top Floating Badges - Clean Non-Overlapping Layout */}
                  <div className="media-overlay-header">
                    <span className="card-step-code">{program.number || `0${idx + 1}`}</span>
                    <span 
                      className={`card-category-badge ${isFeatured ? 'gold-badge' : ''}`}
                      style={{ 
                        background: theme.badgeBg, 
                        color: theme.badgeColor 
                      }}
                    >
                      {isFeatured ? '★ MOST POPULAR' : program.badge}
                    </span>
                  </div>

                  {/* Floating Price Lockup */}
                  <div className="card-price-overlay">
                    <span className="price-tag-value">{program.pricePlaceholder}</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="card-body-content">
                  <div className="card-meta-row">
                    <span className="ideal-for-text">Ideal for: {program.idealFor}</span>
                  </div>

                  <h3 className="card-title-heading">
                    <Link to={program.slug} className="card-title-link">
                      {program.title}
                    </Link>
                  </h3>

                  <p className="card-description-text">
                    {program.shortDesc}
                  </p>

                  {/* Feature Highlights with Checkmarks */}
                  <div className="card-highlights-divider" />
                  <ul className="card-highlights-list">
                    {program.highlights.slice(0, 4).map((hl, hIdx) => (
                      <li key={hIdx} className="highlight-item-row">
                        <CheckCircle2 size={15} className="highlight-icon" style={{ color: theme.accentColor }} />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action Bar: Primary Pill + Details */}
                  <div className="card-footer-actions">
                    <Link 
                      to={`/book?service=${program.id}`} 
                      className={`card-book-button ${isFeatured ? 'gold-btn' : ''}`}
                    >
                      <span>BOOK THIS PROGRAM</span>
                      <ArrowRight size={14} className="btn-arrow" />
                    </Link>

                    <Link to={program.slug} className="card-details-link">
                      <span>Specifications</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile View All Pricing Button */}
        <div className="mobile-explore-pricing show-mobile">
          <Link to="/services" className="editorial-compare-link">
            <span>EXPLORE ALL PACKAGES & PRICING</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        /* ============================================================
           EDITORIAL PROGRAMS SECTION (LUXURY 3-CARD SIDE-BY-SIDE)
           ============================================================ */
        .editorial-programs-section {
          background-color: var(--bg-warm-ivory);
          border-bottom: 1px solid var(--border-light);
          padding-top: 5.5rem;
          padding-bottom: 6rem;
          position: relative;
          overflow: hidden;
        }

        .programs-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3.5rem;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .programs-header-row {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 2.25rem;
          }
        }

        .editorial-meta-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent-champagne);
          margin-bottom: 0.65rem;
        }

        .meta-icon {
          flex-shrink: 0;
        }

        .tag-dash {
          width: 24px;
          height: 1px;
          background-color: var(--accent-champagne);
          opacity: 0.5;
        }

        .programs-headline {
          font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
          font-optical-sizing: auto;
          font-size: clamp(1.85rem, 6vw, 3.8rem);
          font-weight: 700;
          line-height: 1.06;
          letter-spacing: 0.035em;
          color: var(--text-primary);
          text-transform: uppercase;
          margin: 0.5rem 0 0.85rem 0;
        }

        .headline-accent {
          font-weight: 400;
          color: var(--text-primary);
        }

        .programs-subtitle-lead {
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.2vw, 1.02rem);
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 540px;
          margin: 0;
        }

        .editorial-compare-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: var(--text-primary);
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--text-primary);
          transition: all 0.2s ease;
        }

        .editorial-compare-link:hover {
          color: var(--accent-champagne);
          border-color: var(--accent-champagne);
          transform: translateX(3px);
        }

        /* 3-Column Side-by-Side Card Grid */
        .programs-side-by-side-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          align-items: stretch;
        }

        @media (max-width: 1100px) {
          .programs-side-by-side-grid {
            grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
            gap: 1.75rem;
          }
        }

        @media (max-width: 640px) {
          .programs-side-by-side-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        /* Program Luxury Card Base */
        .program-luxury-card {
          position: relative;
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(17, 17, 20, 0.08);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 35px rgba(17, 17, 20, 0.04);
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }

        /* Gradient Theme Variations */
        .program-luxury-card.theme-champagne {
          background: linear-gradient(175deg, rgba(250, 246, 238, 0.95) 0%, #FFFFFF 35%, #FFFFFF 100%);
        }

        .program-luxury-card.theme-platinum {
          background: linear-gradient(175deg, rgba(243, 246, 250, 0.95) 0%, #FFFFFF 35%, #FFFFFF 100%);
        }

        .program-luxury-card.theme-imperial-gold {
          background: linear-gradient(175deg, rgba(253, 248, 236, 0.98) 0%, #FFFFFF 30%, #FFFFFF 100%);
          border-color: rgba(212, 175, 55, 0.35);
          box-shadow: 0 16px 45px rgba(212, 175, 55, 0.12), 0 4px 16px rgba(17, 17, 20, 0.04);
        }

        /* Top Glowing Rim */
        .card-top-gradient-rim {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          z-index: 10;
          background: linear-gradient(90deg, transparent 0%, rgba(197, 168, 128, 0.8) 50%, transparent 100%);
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        .theme-platinum .card-top-gradient-rim {
          background: linear-gradient(90deg, transparent 0%, rgba(142, 173, 198, 0.8) 50%, transparent 100%);
        }

        .theme-imperial-gold .card-top-gradient-rim {
          background: linear-gradient(90deg, #D4AF37 0%, #F5DE88 50%, #D4AF37 100%);
          opacity: 1;
          height: 3.5px;
        }

        .program-luxury-card:hover .card-top-gradient-rim {
          opacity: 1;
        }

        /* Ambient Under-Glow */
        .card-ambient-glow {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 120px;
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
          z-index: 0;
        }

        .program-luxury-card:hover .card-ambient-glow {
          opacity: 0.7;
        }

        /* Card Media Viewport */
        .card-media-viewport {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          background-color: #0c0d10;
        }

        .card-media-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .program-luxury-card:hover .card-media-image {
          transform: scale(1.06);
        }

        .card-image-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg, 
            rgba(0, 0, 0, 0.35) 0%, 
            rgba(0, 0, 0, 0.05) 50%, 
            rgba(0, 0, 0, 0.75) 100%
          );
        }

        .media-overlay-header {
          position: absolute;
          top: 1rem;
          left: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 5;
        }

        .card-step-code {
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #FFFFFF;
          background: rgba(14, 15, 18, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .card-category-badge {
          font-family: var(--font-display);
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .gold-badge {
          box-shadow: 0 4px 14px rgba(212, 175, 55, 0.35);
        }

        /* Floating Price Tag */
        .card-price-overlay {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          background: rgba(12, 13, 16, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }

        .theme-imperial-gold .card-price-overlay {
          border-color: rgba(212, 175, 55, 0.5);
        }

        .price-tag-value {
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #FFFFFF;
        }

        .theme-imperial-gold .price-tag-value {
          color: #F5DE88;
        }

        /* Card Content Body */
        .card-body-content {
          padding: 1.85rem 1.75rem 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          position: relative;
          z-index: 2;
        }

        .card-meta-row {
          margin-bottom: 0.65rem;
        }

        .ideal-for-text {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.02em;
          display: block;
        }

        .card-title-heading {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          line-height: 1.2;
          margin: 0 0 0.75rem 0;
          text-transform: uppercase;
        }

        .card-title-link {
          color: var(--text-primary);
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .card-title-link:hover {
          color: var(--accent-champagne);
        }

        .card-description-text {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          min-height: 56px;
        }

        .card-highlights-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, var(--border-light) 0%, transparent 100%);
          margin-bottom: 1.25rem;
        }

        .card-highlights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin: 0 0 1.75rem 0;
          padding: 0;
          flex: 1;
        }

        .highlight-item-row {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          font-family: var(--font-display);
          font-size: 0.8rem;
          color: var(--text-primary);
          font-weight: 500;
          line-height: 1.4;
        }

        .highlight-icon {
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* Card Footer Actions */
        .card-footer-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.85rem;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
        }

        .card-book-button {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #111114;
          color: #FFFFFF;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.85rem 1.45rem;
          border-radius: var(--radius-full);
          transition: all 0.28s var(--ease-cinematic);
          box-shadow: 0 4px 14px rgba(17, 17, 20, 0.2);
        }

        .card-book-button:hover {
          background: var(--text-primary);
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(17, 17, 20, 0.3);
        }

        .gold-btn {
          background: linear-gradient(135deg, #111114 0%, #1e1f26 100%);
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: #F5DE88;
        }

        .gold-btn:hover {
          background: #000000;
          border-color: #D4AF37;
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.25);
        }

        .btn-arrow {
          transition: transform 0.2s ease;
        }

        .card-book-button:hover .btn-arrow {
          transform: translateX(3px);
        }

        .card-details-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .card-details-link:hover {
          color: var(--text-primary);
          transform: translateX(2px);
        }

        .mobile-explore-pricing {
          margin-top: 2.5rem;
          text-align: center;
        }
      `}</style>
    </section>
  );
};
