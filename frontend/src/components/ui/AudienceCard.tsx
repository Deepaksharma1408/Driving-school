import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { AudienceItem } from '../../types';

interface AudienceCardProps {
  audience: AudienceItem;
}

export const AudienceCard: React.FC<AudienceCardProps> = ({ audience }) => {
  return (
    <div className="audience-card aura-card">
      <div className="audience-img-box">
        <img src={audience.image} alt={audience.title} className="audience-img" loading="lazy" />
        <span className="audience-tag">{audience.tag}</span>
      </div>

      <div className="audience-body">
        <h4 className="audience-title">{audience.title}</h4>
        <p className="audience-desc">{audience.description}</p>

        <ul className="audience-points">
          {audience.focusPoints.map((point, i) => (
            <li key={i} className="audience-point">
              <span className="point-dot"><Check size={14} /></span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <Link to={audience.link} className="audience-link">
          <span>Explore customized lessons</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <style>{`
        .audience-card {
          padding: 0;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-xl);
          background: #FFFFFF;
        }
        .audience-img-box {
          position: relative;
          height: 190px;
          overflow: hidden;
          background: #E5E3D8;
        }
        .audience-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .audience-card:hover .audience-img {
          transform: scale(1.05);
        }
        .audience-tag {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(17, 24, 32, 0.85);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .audience-body {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .audience-title {
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        .audience-desc {
          font-size: 0.925rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }
        .audience-points {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        .audience-point {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        .point-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--accent-subtle);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .audience-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
          transition: gap 0.2s ease;
        }
        .audience-link:hover {
          gap: 0.75rem;
          color: #000;
        }
      `}</style>
    </div>
  );
};
