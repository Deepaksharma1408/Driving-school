import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { LocationItem } from '../../types';

interface LocationCardProps {
  location: LocationItem;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <div className="location-card aura-card">
      <div className="location-top">
        <div className="location-icon-badge">
          <MapPin size={20} />
        </div>
        <span className="location-code">{location.code}</span>
      </div>

      <h4 className="location-title">{location.name}</h4>
      <p className="location-region">{location.testCenterType}</p>
      <p className="location-desc">{location.description}</p>

      <div className="location-checklist">
        <div className="location-check-item">
          <CheckCircle size={14} className="check-icon" />
          <span>Familiar test routes practiced</span>
        </div>
        <div className="location-check-item">
          <CheckCircle size={14} className="check-icon" />
          <span>Pre-test warm up & car hire available</span>
        </div>
      </div>

      <div className="location-footer">
        <Link to={`/book?location=${location.id}`} className="location-cta-link">
          <span>Schedule at this location</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <style>{`
        .location-card {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid var(--border-light);
        }
        .location-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .location-icon-badge {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: var(--bg-surface-alt);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }
        .location-card:hover .location-icon-badge {
          background: var(--accent-primary);
        }
        .location-code {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          background: var(--bg-main);
          border-radius: var(--radius-full);
          color: var(--text-muted);
        }
        .location-title {
          font-size: 1.2rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          margin-bottom: 0.3rem;
        }
        .location-region {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          margin-bottom: 0.85rem;
        }
        .location-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }
        .location-checklist {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          margin-bottom: 1.5rem;
        }
        .location-check-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.825rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        .check-icon {
          color: #16A34A;
          flex-shrink: 0;
        }
        .location-footer {
          padding-top: 1.15rem;
          border-top: 1px solid var(--border-light);
        }
        .location-cta-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.875rem;
          color: var(--text-primary);
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .location-cta-link:hover {
          color: #000;
          transform: translateX(3px);
        }
      `}</style>
    </div>
  );
};
