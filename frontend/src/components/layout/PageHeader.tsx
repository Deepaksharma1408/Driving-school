import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  tag?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  badge?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  tag,
  title,
  subtitle,
  breadcrumb,
  badge
}) => {
  return (
    <div className="page-header-wrapper">
      <div className="container">
        <div className="page-header-content">
          {/* Breadcrumb row */}
          <div className="breadcrumb-row">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">{breadcrumb || title}</span>
          </div>

          {tag && (
            <span className="pill-badge accent header-tag">
              {tag}
            </span>
          )}

          <h1 className="page-header-title">{title}</h1>

          {subtitle && (
            <p className="page-header-subtitle">{subtitle}</p>
          )}

          {badge && (
            <div className="page-header-badge-box">
              <span className="header-meta-badge">{badge}</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .page-header-wrapper {
          background-color: var(--bg-warm-white);
          border-bottom: 1px solid var(--border-light);
          padding: 6.5rem 0 2.75rem 0;
          position: relative;
        }
        @media (max-width: 768px) {
          .page-header-wrapper {
            padding: 5.5rem 0 2rem 0;
          }
        }
        .page-header-content {
          max-width: 900px;
        }
        .breadcrumb-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          margin-bottom: 0.85rem;
          font-family: var(--font-display);
        }
        .breadcrumb-link {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb-link:hover {
          color: var(--text-primary);
        }
        .breadcrumb-separator {
          color: var(--border-medium);
        }
        .breadcrumb-current {
          color: var(--text-primary);
          font-weight: 600;
        }
        .header-tag {
          margin-bottom: 1.15rem;
          font-family: var(--font-display);
          letter-spacing: 0.18em;
        }
        .page-header-title {
          font-family: var(--font-serif) !important;
          font-size: clamp(2.4rem, 4.8vw, 3.8rem);
          font-weight: 400;
          letter-spacing: 0.02em;
          color: var(--text-primary);
          line-height: 1.08;
          margin-bottom: 1.15rem;
          text-transform: uppercase;
        }
        .page-header-subtitle {
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.68;
          max-width: 680px;
        }
        .page-header-badge-box {
          margin-top: 1.25rem;
        }
        .header-meta-badge {
          display: inline-block;
          font-family: var(--font-display);
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 0.45rem 1rem;
          background: #FFFFFF;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-full);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};
