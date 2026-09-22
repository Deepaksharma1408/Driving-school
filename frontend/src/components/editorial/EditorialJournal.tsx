import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { BLOG_ARTICLES } from '../../data/content';
import { BlogArticle } from '../../types';

interface EditorialJournalProps {
  onSelectArticle?: (article: BlogArticle) => void;
}

export const EditorialJournal: React.FC<EditorialJournalProps> = ({ onSelectArticle }) => {
  const articles = BLOG_ARTICLES.slice(0, 3);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleArticleClick = (e: React.MouseEvent, article: BlogArticle) => {
    if (onSelectArticle) {
      e.preventDefault();
      onSelectArticle(article);
    }
  };

  return (
    <section id="journal-section" className="editorial-journal-section section-padding">
      <div className="container-wide">
        {/* Section Header */}
        <div className="journal-header-row">
          <div>
            <div className="editorial-meta-tag champagne">
              <span>SECTION 10</span>
              <span className="tag-dash" />
              <span>THE JOURNAL</span>
            </div>

            <h2 className="journal-headline">
              ON THE ROAD <br />
              <span className="font-accent">MAGAZINE.</span>
            </h2>
            <p className="journal-subtitle-lead">
              Curated masterclasses, examiner road audits, and essential driving intelligence published by our senior NSW instructors.
            </p>
          </div>

          <Link to="/blog" className="view-journal-link hide-mobile">
            <span>VIEW ALL EDITORIAL ARTICLES</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Side-by-Side 3-Card Editorial Grid */}
        <div className="journal-cards-grid">
          {articles.map((article, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <motion.article 
                key={article.id}
                className="journal-luxury-card"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => handleArticleClick(e, article)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Top Glowing Metallic Accent Rim */}
                <div className={`card-top-rim ${isHovered ? 'active' : ''}`} />

                {/* Media Image Viewport */}
                <div className="journal-card-media">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="journal-cover-img"
                    loading="lazy"
                  />
                  <div className="journal-photo-scrim" />

                  {/* Category Pill Tag */}
                  <div className="journal-badge-row">
                    <span className="journal-category-pill">
                      {article.category}
                    </span>
                    <span className="journal-read-time-pill">
                      <Clock size={11} />
                      <span>{article.readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="journal-card-body">
                  <div className="journal-meta-row">
                    <span className="journal-issue-tag">ISSUE 0{idx + 1}</span>
                    <span className="journal-meta-dot">•</span>
                    <span className="journal-date">{article.date || 'Updated for 2026'}</span>
                  </div>

                  <h3 className="journal-card-title">
                    {article.title}
                  </h3>

                  <p className="journal-card-excerpt">
                    {article.excerpt}
                  </p>

                  <div className="journal-card-footer">
                    <div className="read-article-action">
                      <span className="read-action-text">READ COMPLETE ANALYSIS</span>
                      <div className="read-action-icon-circle">
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile View All Link */}
        <div className="show-mobile-only" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link to="/blog" className="view-journal-link">
            <span>VIEW ALL EDITORIAL ARTICLES</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        /* ============================================================
           EDITORIAL JOURNAL SECTION — 3-COLUMN LUXURY CARDS
           ============================================================ */
        .editorial-journal-section {
          background-color: var(--bg-warm-ivory);
          border-bottom: 1px solid var(--border-light);
          position: relative;
          overflow: hidden;
        }

        .journal-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3.5rem;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .journal-header-row {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 2.25rem;
          }
        }

        .journal-headline {
          font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
          font-size: clamp(2.4rem, 4.8vw, 3.8rem);
          font-weight: 700;
          line-height: 1.06;
          letter-spacing: 0.035em;
          color: var(--text-primary);
          text-transform: uppercase;
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .font-accent {
          color: var(--text-primary);
        }

        .journal-subtitle-lead {
          font-family: var(--font-body);
          font-size: clamp(0.92rem, 1.2vw, 1.02rem);
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 580px;
          margin: 0;
        }

        .view-journal-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: var(--text-primary);
          border-bottom: 1.5px solid var(--text-primary);
          padding-bottom: 4px;
          transition: all 0.25s ease;
          text-decoration: none;
          text-transform: uppercase;
        }

        .view-journal-link:hover {
          color: var(--accent-champagne);
          border-color: var(--accent-champagne);
          transform: translateX(4px);
        }

        /* 3-Column Side-by-Side Card Grid */
        .journal-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          align-items: stretch;
        }

        @media (max-width: 1024px) {
          .journal-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 680px) {
          .journal-cards-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        /* Luxury Card Styling */
        .journal-luxury-card {
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.4s var(--ease-cinematic);
          box-shadow: 0 4px 20px rgba(17, 17, 17, 0.03);
        }

        .journal-luxury-card:hover {
          transform: translateY(-8px);
          border-color: rgba(197, 168, 128, 0.45);
          box-shadow: 0 20px 45px rgba(17, 17, 17, 0.09), 0 4px 12px rgba(197, 168, 128, 0.08);
        }

        /* Glowing Top Rim */
        .card-top-rim {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, rgba(197, 168, 128, 0.9) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 10;
        }

        .card-top-rim.active {
          opacity: 1;
        }

        /* Media Viewport */
        .journal-card-media {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
          background: #111111;
        }

        @media (max-width: 680px) {
          .journal-card-media {
            height: 210px;
          }
        }

        .journal-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s var(--ease-cinematic);
        }

        .journal-luxury-card:hover .journal-cover-img {
          transform: scale(1.06);
        }

        .journal-photo-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.45) 100%);
          transition: opacity 0.3s ease;
        }

        .journal-badge-row {
          position: absolute;
          top: 1.15rem;
          left: 1.15rem;
          right: 1.15rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 5;
        }

        .journal-category-pill {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: rgba(12, 13, 16, 0.85);
          color: var(--accent-champagne);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .journal-read-time-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          background: rgba(12, 13, 16, 0.75);
          color: rgba(255, 255, 255, 0.85);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* Card Body */
        .journal-card-body {
          padding: 1.85rem 1.75rem 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .journal-meta-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.65rem;
        }

        .journal-issue-tag {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-champagne);
        }

        .journal-meta-dot {
          color: var(--text-muted);
          font-size: 0.65rem;
        }

        .journal-date {
          font-family: var(--font-display);
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }

        .journal-card-title {
          font-family: var(--font-display);
          font-size: 1.22rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          line-height: 1.28;
          color: var(--text-primary);
          margin-bottom: 0.85rem;
          transition: color 0.25s ease;
        }

        .journal-luxury-card:hover .journal-card-title {
          color: #8C6D3F;
        }

        .journal-card-excerpt {
          font-family: var(--font-body);
          font-size: 0.88rem;
          line-height: 1.62;
          color: var(--text-secondary);
          margin-bottom: 1.75rem;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Footer Action Row */
        .journal-card-footer {
          padding-top: 1.15rem;
          border-top: 1px solid var(--border-subtle);
          margin-top: auto;
        }

        .read-article-action {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .read-action-text {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-primary);
          transition: color 0.25s ease;
        }

        .journal-luxury-card:hover .read-action-text {
          color: var(--accent-champagne);
        }

        .read-action-icon-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(17, 17, 17, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .journal-luxury-card:hover .read-action-icon-circle {
          background: var(--accent-champagne);
          color: #111111;
          transform: translateX(4px);
        }

        .show-mobile-only {
          display: none;
        }

        @media (max-width: 768px) {
          .show-mobile-only {
            display: block;
          }
        }
      `}</style>
    </section>
  );
};
