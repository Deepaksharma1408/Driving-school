import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Star, Award, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { SERVICES } from '../data/content';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export const Services: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Luxury Card Themes matching the Design System
  const cardThemes = [
    {
      themeClass: 'theme-champagne',
      rimGradient: 'linear-gradient(90deg, transparent 0%, rgba(197, 168, 128, 0.9) 50%, transparent 100%)',
      glowColor: 'radial-gradient(circle, rgba(197, 168, 128, 0.22) 0%, transparent 70%)',
      badgeBg: 'rgba(12, 13, 16, 0.88)',
      badgeColor: '#C5A880',
      badgeText: 'CAR AVAILABLE'
    },
    {
      themeClass: 'theme-platinum',
      rimGradient: 'linear-gradient(90deg, transparent 0%, rgba(142, 173, 198, 0.9) 50%, transparent 100%)',
      glowColor: 'radial-gradient(circle, rgba(142, 173, 198, 0.22) 0%, transparent 70%)',
      badgeBg: 'rgba(12, 13, 16, 0.88)',
      badgeColor: '#A8C5DC',
      badgeText: 'TEST-DAY VEHICLE'
    },
    {
      themeClass: 'theme-imperial-gold',
      rimGradient: 'linear-gradient(90deg, #D4AF37 0%, #F5DE88 50%, #D4AF37 100%)',
      glowColor: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
      badgeBg: 'linear-gradient(135deg, #D4AF37 0%, #B8972E 100%)',
      badgeColor: '#0A0A0A',
      badgeText: '★ MOST POPULAR'
    }
  ];

  return (
    <div className="services-overview-page">
      <PageHeader 
        tag="SERVICES & PACKAGES"
        title="STRUCTURED DRIVER TRAINING & TEST VEHICLE PACKAGES."
        subtitle="Transparent options tailored to your exact driving goals — from individual skills training to complete test-day vehicle hire."
        breadcrumb="Services"
      />

      {/* 3-Column Luxury Cards Section */}
      <section className="services-cards-section section-padding">
        <div className="container-wide">
          {/* Side-by-Side 3-Card Grid */}
          <div className="services-luxury-grid">
            {SERVICES.map((service, index) => {
              const theme = cardThemes[index % cardThemes.length];
              const isFeatured = index === 2 || service.id === 'lesson-and-car';
              const isHovered = hoveredIdx === index;

              return (
                <motion.article 
                  key={service.id}
                  className={`service-luxury-card ${theme.themeClass} ${isFeatured ? 'featured-card' : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.75, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Ambient Under-Glow on Hover */}
                  <div 
                    className="card-ambient-glow" 
                    style={{ background: theme.glowColor, opacity: isHovered ? 0.75 : 0 }} 
                  />

                  {/* Top Glowing Metallic Accent Rim */}
                  <div 
                    className="card-top-gradient-rim" 
                    style={{ background: theme.rimGradient, opacity: isHovered || isFeatured ? 1 : 0.6 }}
                  />

                  {/* Card Media / Image Viewport */}
                  <div className="card-media-viewport">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="card-media-image" 
                      loading="lazy" 
                    />
                    <div className="card-image-scrim" />

                    {/* Top Floating Badges */}
                    <div className="media-overlay-header">
                      <span className="card-step-code">{service.number || `0${index + 1}`}</span>
                      <span 
                        className={`card-category-badge ${isFeatured ? 'gold-badge' : ''}`}
                        style={{ 
                          background: theme.badgeBg, 
                          color: theme.badgeColor 
                        }}
                      >
                        {theme.badgeText}
                      </span>
                    </div>

                    {/* Floating Price Tag Pill */}
                    <div className="card-price-overlay">
                      <span className="price-tag-value">{service.pricePlaceholder}</span>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="card-body-content">
                    <div className="card-meta-row">
                      <span className="ideal-for-text">BEST SUITED FOR:</span>
                      <p className="ideal-for-desc">{service.idealFor}</p>
                    </div>

                    <h2 className="card-title-heading">
                      {service.title}
                    </h2>

                    <p className="card-short-desc">
                      {service.shortDesc}
                    </p>

                    {/* What's Included Checklist */}
                    <div className="card-features-block">
                      <span className="features-subhead">PACKAGE INCLUSIONS:</span>
                      <ul className="detailed-features-list">
                        {service.highlights.map((h, i) => (
                          <li key={i} className="detailed-feature-item">
                            <div className="check-icon-circle">
                              <Check size={11} className="feat-check" />
                            </div>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* View Details Link */}
                    <div className="card-subpage-link">
                      <Link to={service.slug} className="more-info-link">
                        <span>View full curriculum & test routes</span>
                        <ArrowRight size={14} className="link-arrow" />
                      </Link>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="card-action-bottom">
                      <Button 
                        to={`/book?service=${service.id}`} 
                        variant={isFeatured ? 'gold' : 'dark'} 
                        size="md" 
                        icon={<ArrowRight size={15} />}
                        style={{ width: '100%' }}
                      >
                        BOOK THIS PACKAGE
                      </Button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Service Comparison Matrix */}
          <div className="comparison-box aura-card">
            <div className="comparison-header">
              <span className="comparison-eyebrow">TRANSPARENT EVALUATION</span>
              <h3 className="comparison-title">Which Package Do You Need?</h3>
              <p className="comparison-lead">
                Compare package features side-by-side to choose the exact curriculum required for your licence transition.
              </p>
            </div>

            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature / Inclusions</th>
                    <th>01 Driving Lessons</th>
                    <th>02 Car Hire Only</th>
                    <th>03 Lesson + Car Combo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1-on-1 Instructor Coaching</td>
                    <td><CheckCircle2 size={18} className="tbl-check gold" /></td>
                    <td>—</td>
                    <td><CheckCircle2 size={18} className="tbl-check gold" /></td>
                  </tr>
                  <tr>
                    <td>NSW Transport Dual-Control Vehicle</td>
                    <td><CheckCircle2 size={18} className="tbl-check gold" /></td>
                    <td><CheckCircle2 size={18} className="tbl-check gold" /></td>
                    <td><CheckCircle2 size={18} className="tbl-check gold" /></td>
                  </tr>
                  <tr>
                    <td>Practical Test Car Insurance & Rego</td>
                    <td>—</td>
                    <td><CheckCircle2 size={18} className="tbl-check gold" /></td>
                    <td><CheckCircle2 size={18} className="tbl-check gold" /></td>
                  </tr>
                  <tr>
                    <td>Pre-Test Warm-Up Mock Test</td>
                    <td>Optional (Book as lesson)</td>
                    <td>—</td>
                    <td><CheckCircle2 size={18} className="tbl-check gold" /></td>
                  </tr>
                  <tr>
                    <td>Instructor Accompaniment at Service NSW</td>
                    <td>—</td>
                    <td><CheckCircle2 size={18} className="tbl-check gold" /></td>
                    <td><CheckCircle2 size={18} className="tbl-check gold" /></td>
                  </tr>
                  <tr>
                    <td>3-for-1 NSW Logbook Bonus Hours</td>
                    <td><CheckCircle2 size={18} className="tbl-check gold" /></td>
                    <td>—</td>
                    <td><CheckCircle2 size={18} className="tbl-check gold" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ============================================================
           STRUCTURED SERVICES & PACKAGES — 3-COLUMN LUXURY CARDS
           ============================================================ */
        .services-overview-page {
          background-color: var(--bg-warm-ivory);
          min-height: 100vh;
        }

        .services-cards-section {
          position: relative;
        }

        /* 3-Column Side-by-Side Grid */
        .services-luxury-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          align-items: stretch;
          margin-bottom: 4.5rem;
        }

        @media (max-width: 1024px) {
          .services-luxury-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 720px) {
          .services-luxury-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
        }

        /* Luxury Card Styling */
        .service-luxury-card {
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: transform 0.4s var(--ease-cinematic),
                      box-shadow 0.4s var(--ease-cinematic),
                      border-color 0.4s ease;
          box-shadow: 0 4px 20px rgba(17, 17, 20, 0.03);
        }

        .service-luxury-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 50px rgba(17, 17, 20, 0.1), 0 4px 12px rgba(197, 168, 128, 0.08);
          border-color: rgba(197, 168, 128, 0.45);
        }

        .service-luxury-card.featured-card {
          border-color: rgba(212, 175, 55, 0.4);
          background: linear-gradient(175deg, rgba(253, 248, 236, 0.98) 0%, #FFFFFF 30%, #FFFFFF 100%);
          box-shadow: 0 16px 45px rgba(212, 175, 55, 0.12), 0 4px 16px rgba(17, 17, 20, 0.04);
        }

        /* Top Glowing Rim */
        .card-top-gradient-rim {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3.5px;
          z-index: 10;
          transition: opacity 0.3s ease;
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
          pointer-events: none;
          transition: opacity 0.4s ease;
          z-index: 0;
        }

        /* Card Media Viewport */
        .card-media-viewport {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          background-color: #0E0F12;
        }

        @media (max-width: 680px) {
          .card-media-viewport {
            height: 200px;
          }
        }

        .card-media-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s var(--ease-cinematic);
        }

        .service-luxury-card:hover .card-media-image {
          transform: scale(1.06);
        }

        .card-image-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.5) 100%);
        }

        /* Header Badges */
        .media-overlay-header {
          position: absolute;
          top: 1.15rem;
          left: 1.15rem;
          right: 1.15rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 5;
        }

        .card-step-code {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #FFFFFF;
          background: rgba(12, 13, 16, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 0.35rem 0.7rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .card-category-badge {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .card-category-badge.gold-badge {
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.35);
          border-color: rgba(255, 255, 255, 0.4);
        }

        /* Price Overlay Tag */
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

        .featured-card .card-price-overlay {
          border-color: rgba(212, 175, 55, 0.5);
        }

        .price-tag-value {
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #FFFFFF;
        }

        .featured-card .price-tag-value {
          color: #F5DE88;
        }

        /* Card Body */
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
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--accent-champagne);
          letter-spacing: 0.12em;
          display: block;
        }

        .ideal-for-desc {
          font-family: var(--font-display);
          font-size: 0.76rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
          line-height: 1.4;
        }

        .card-title-heading {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          line-height: 1.22;
          color: var(--text-primary);
          margin-bottom: 0.65rem;
          text-transform: uppercase;
        }

        .card-short-desc {
          font-family: var(--font-body);
          font-size: 0.86rem;
          line-height: 1.58;
          color: var(--text-secondary);
          margin-bottom: 1.35rem;
        }

        /* Features List */
        .card-features-block {
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .features-subhead {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--text-primary);
          display: block;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }

        .detailed-features-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .detailed-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .check-icon-circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(197, 168, 128, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .feat-check {
          color: var(--accent-champagne);
        }

        .card-subpage-link {
          margin-bottom: 1.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
        }

        .more-info-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-display);
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .more-info-link:hover {
          color: var(--accent-champagne);
        }

        .more-info-link:hover .link-arrow {
          transform: translateX(4px);
        }

        .card-action-bottom {
          margin-top: auto;
        }

        /* Comparison Matrix Box */
        .comparison-box {
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-xl);
          padding: 3rem 2.5rem;
          box-shadow: 0 4px 25px rgba(17, 17, 20, 0.04);
        }

        @media (max-width: 768px) {
          .comparison-box {
            padding: 1.5rem 1.15rem;
          }
        }

        .comparison-header {
          max-width: 650px;
          margin-bottom: 2rem;
        }

        .comparison-eyebrow {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--accent-champagne);
          display: block;
          margin-bottom: 0.5rem;
        }

        .comparison-title {
          font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
          font-size: clamp(1.4rem, 5vw, 2.6rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }

        .comparison-lead {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .comparison-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 640px;
        }

        .comparison-table th {
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: left;
          padding: 1.15rem 1.25rem;
          background: var(--bg-soft-cream);
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-light);
        }

        .comparison-table td {
          font-size: 0.88rem;
          padding: 1.15rem 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }

        .comparison-table tbody tr:hover td {
          background-color: rgba(243, 240, 233, 0.4);
        }

        .tbl-check.gold {
          color: var(--accent-champagne);
        }
      `}</style>
    </div>
  );
};
