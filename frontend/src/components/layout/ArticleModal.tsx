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
          background: rgba(7, 19, 29, 0.78);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          overflow-y: auto;
        }
        .article-modal-container {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          max-width: 760px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
        }
        .article-modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 10;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: transform 0.2s, background-color 0.2s;
        }
        .article-modal-close:hover {
          background: #FFFFFF;
          transform: scale(1.05);
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
          top: 14px;
          left: 14px;
          z-index: 3;
          background: rgba(7, 19, 29, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-size: 0.725rem;
          font-weight: 800;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          border: 1px solid rgba(255, 255, 255, 0.2);
          letter-spacing: 0.05em;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          pointer-events: none;
        }
        .article-modal-body {
          padding: 2.5rem 2rem;
        }
        .article-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .article-title {
          font-size: 1.85rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.25;
        }
        .article-lead {
          font-size: 1.1rem;
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          border-left: 3px solid var(--accent-primary);
          padding-left: 1rem;
        }
        .article-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        .article-p {
          font-size: 1rem;
          color: var(--text-primary);
          line-height: 1.7;
        }
        .article-cta-box {
          background: var(--bg-surface-alt);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .cta-box-text h4 {
          font-size: 1.1rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }
        .cta-box-text p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};
