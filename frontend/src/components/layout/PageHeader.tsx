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
          padding: 2.25rem 0 1.75rem 0;
          position: relative;
        }
        @media (max-width: 768px) {
          .page-header-wrapper {
            padding: 1.75rem 0 1.25rem 0;
          }
        }
        .page-header-content {
          max-width: 860px;
        }
        .breadcrumb-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          margin-bottom: 0.65rem;
        }
        .breadcrumb-link {
          color: var(--text-muted);
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
          font-weight: 700;
        }
        .header-tag {
          margin-bottom: 1rem;
        }
        .page-header-title {
          font-size: clamp(2.2rem, 4.5vw, 3.4rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .page-header-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .page-header-badge-box {
          margin-top: 1.25rem;
        }
        .header-meta-badge {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.35rem 0.85rem;
          background: #FFFFFF;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-full);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
};
