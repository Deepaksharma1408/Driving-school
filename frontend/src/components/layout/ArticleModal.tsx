import React from 'react';
import { X, Calendar, Clock, Share2, ArrowRight } from 'lucide-react';
import { BlogArticle } from '../../types';
import { Button } from '../ui/Button';

interface ArticleModalProps {
  article: BlogArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="article-modal-overlay" onClick={onClose}>
      <div className="article-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="article-modal-close" onClick={onClose} aria-label="Close article">
          <X size={22} />
        </button>

        <div className="article-hero-image">
          {/* Ambient blurred backdrop derived from the article image */}
          <div 
            className="article-hero-backdrop"
            style={{ backgroundImage: `url(${article.image})` }}
          />
          
          {/* Main crisp full image */}
          <img 
            src={article.image} 
            alt={article.title} 
            className="article-hero-main-img"
          />
          
          <span className="article-tag">{article.category}</span>
        </div>

        <div className="article-modal-body">
          <div className="article-meta">
            <span className="meta-item"><Calendar size={14} /> {article.date}</span>
            <span className="meta-item"><Clock size={14} /> {article.readTime}</span>
            <span className="meta-item">Author: {article.author}</span>
          </div>

          <h2 className="article-title">{article.title}</h2>
          <p className="article-lead">{article.excerpt}</p>

          <div className="article-paragraphs">
            {article.content.map((p, i) => (
              <p key={i} className="article-p">{p}</p>
            ))}
          </div>

          <div className="article-cta-box">
            <div className="cta-box-text">
              <h4>Ready to put this knowledge into practice?</h4>
              <p>Book a personalized lesson or mock test preparation session today.</p>
            </div>
            <Button to="/book" variant="primary" size="md" icon={<ArrowRight size={16} />} onClick={onClose}>
              BOOK LESSON
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        .article-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(8, 9, 12, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 2500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          overflow-y: auto;
        }
        .article-modal-container {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          max-width: 780px;
          width: 100%;
          max-height: 88vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
          border: 1px solid var(--border-light);
        }
        .article-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 30;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition: transform 0.2s, background-color 0.2s;
        }
        .article-modal-close:hover {
          background: #FFFFFF;
          transform: scale(1.08);
        }
        .article-hero-image {
          position: relative;
          width: 100%;
          height: 330px;
          overflow: hidden;
          background: #07131D;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .article-hero-image {
            height: 240px;
          }
        }
        .article-hero-backdrop {
          position: absolute;
          inset: -25px;
          background-size: cover;
          background-position: center;
          filter: blur(28px) brightness(0.4);
          opacity: 0.9;
          transform: scale(1.15);
          pointer-events: none;
        }
        .article-hero-main-img {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
        .article-tag {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 3;
          background: rgba(14, 14, 18, 0.88);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-family: var(--font-display);
          font-size: 0.725rem;
          font-weight: 700;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          border: 1px solid rgba(255, 255, 255, 0.2);
          letter-spacing: 0.08em;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          pointer-events: none;
        }
        .article-modal-body {
          padding: 2.5rem 2.25rem;
        }
        .article-meta {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          font-family: var(--font-display);
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .article-title {
          font-family: var(--font-serif) !important;
          font-size: clamp(1.8rem, 3.5vw, 2.4rem);
          font-weight: 400;
          letter-spacing: -0.015em;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
          line-height: 1.15;
        }
        .article-lead {
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: var(--text-secondary);
          font-weight: 400;
          margin-bottom: 1.75rem;
          line-height: 1.6;
          border-left: 3px solid var(--accent-champagne);
          padding-left: 1.15rem;
        }
        .article-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        .article-p {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-primary);
          line-height: 1.7;
        }
        @media (max-width: 600px) {
          .article-modal-overlay {
            padding: 0.75rem;
          }
          .article-modal-body {
            padding: 1.5rem 1.15rem;
          }
        }
        .article-cta-box {
          background: var(--bg-warm-ivory);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          padding: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        @media (max-width: 600px) {
          .article-cta-box {
            padding: 1.25rem;
            flex-direction: column;
            align-items: flex-start;
          }
          .article-cta-box button,
          .article-cta-box a {
            width: 100%;
          }
        }
        .cta-box-text h4 {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
        }
        .cta-box-text p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};
