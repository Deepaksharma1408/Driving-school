import React from 'react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { BlogArticle } from '../../types';

interface BlogCardProps {
  article: BlogArticle;
  onSelect?: (article: BlogArticle) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ article, onSelect }) => {
  const desktopPos = article.imagePositionDesktop || article.imagePosition || 'center center';
  const mobilePos = article.imagePositionMobile || article.imagePosition || desktopPos;
  const fit = article.imageFit || 'cover';
  const bg = article.imageBg || '#E5E3D8';

  return (
    <article className="blog-card aura-card">
      <div 
        className="blog-card-img-wrap"
        style={{
          backgroundColor: bg,
          '--img-pos-desktop': desktopPos,
          '--img-pos-mobile': mobilePos,
          '--img-fit': fit
        } as React.CSSProperties}
      >
        <img 
          src={article.image} 
          alt={article.title} 
          className="blog-card-img" 
          loading="lazy"
          style={{
            objectFit: fit
          }}
        />
        <span className="blog-category-badge">{article.category}</span>
      </div>

      <div className="blog-card-content">
        <div className="blog-meta-row">
          <span className="blog-meta-item">
            <Calendar size={14} />
            {article.date}
          </span>
          <span className="blog-meta-item">
            <Clock size={14} />
            {article.readTime}
          </span>
        </div>

        <h3 className="blog-card-title">{article.title}</h3>
        <p className="blog-card-excerpt">{article.excerpt}</p>

        <button 
          onClick={() => onSelect && onSelect(article)} 
          className="blog-read-btn"
          aria-label={`Read article: ${article.title}`}
        >
          <span>Read Article</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <style>{`
        .blog-card {
          padding: 0;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-xl);
          background: #FFFFFF;
          overflow: hidden;
          height: 100%;
        }
        .blog-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10.5;
          min-height: 210px;
          max-height: 255px;
          overflow: hidden;
          background-color: #E5E3D8;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .blog-card-img-wrap {
            aspect-ratio: 16 / 10;
            min-height: 200px;
            max-height: none;
          }
        }
        .blog-card-img {
          width: 100%;
          height: 100%;
          object-fit: var(--img-fit, cover);
          object-position: var(--img-pos-desktop, center bottom);
          transition: transform 0.5s ease;
          display: block;
        }
        @media (max-width: 640px) {
          .blog-card-img {
            object-position: var(--img-pos-mobile, center bottom) !important;
          }
        }
        .blog-card:hover .blog-card-img {
          transform: scale(1.03);
        }
        .blog-category-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: var(--text-primary);
          font-size: 0.725rem;
          font-weight: 800;
          padding: 0.25rem 0.7rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
          pointer-events: none;
        }
        .blog-card-content {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        @media (max-width: 640px) {
          .blog-card-content {
            padding: 1.35rem 1.25rem;
          }
        }
        .blog-meta-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }
        .blog-meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.775rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .blog-card-title {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          margin-bottom: 0.6rem;
          line-height: 1.35;
        }
        .blog-card-excerpt {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        .blog-read-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.875rem;
          color: var(--text-primary);
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
          transition: gap 0.2s ease, color 0.2s ease;
          width: 100%;
          justify-content: space-between;
          margin-top: auto;
        }
        .blog-read-btn:hover {
          color: #000;
        }
      `}</style>
    </article>
  );
};
