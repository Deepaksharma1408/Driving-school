import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from '../../types';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="service-card-wrapper">
      <div className="service-card aura-card">
        {/* Card Top & Service Number */}
        <div className="service-header">
          <div className="service-number-badge">
            <span className="service-num">{service.number}</span>
            <span className="service-tag-label">{service.badge}</span>
          </div>
          {service.pricePlaceholder && (
            <span className="service-price-chip">{service.pricePlaceholder}</span>
          )}
        </div>

        {/* Cinematic Card Image with Zoom Container */}
        <div className="service-image-container">
          <img 
            src={service.image} 
            alt={service.title} 
            className="service-img" 
            loading="lazy"
          />
          <div className="service-image-overlay" />
        </div>

        {/* Card Body */}
        <div className="service-content">
          <h3 className="service-title">{service.title}</h3>
          <p className="service-description">{service.shortDesc}</p>

          <ul className="service-highlights">
            {service.highlights.slice(0, 3).map((item, i) => (
              <li key={i} className="highlight-item">
                <CheckCircle2 size={16} className="highlight-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card Footer Action */}
        <div className="service-footer">
          <Link to={service.slug} className="service-cta-link">
            <span className="link-text">LEARN MORE</span>
            <span className="arrow-circle">
              <ArrowRight size={16} />
            </span>
          </Link>
          <Link to={`/book?service=${service.id}`} className="service-quick-book">
            Book Now
          </Link>
        </div>
      </div>

      <style>{`
        .service-card-wrapper {
          display: flex;
          height: 100%;
        }
        .service-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          padding: 2.25rem;
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-light);
          transition: transform 0.35s var(--ease-cinematic), box-shadow 0.35s var(--ease-cinematic), border-color 0.35s ease;
        }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 50px rgba(7, 21, 33, 0.12);
          border-color: var(--accent-gold);
        }
        .service-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .service-number-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .service-num {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.25rem;
          color: var(--bg-deep);
          background: var(--accent-gold);
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .service-tag-label {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }
        .service-price-chip {
          font-size: 0.8rem;
          font-weight: 800;
          padding: 0.35rem 0.85rem;
          background: var(--bg-warm);
          border-radius: var(--radius-full);
          color: var(--text-primary);
        }
        .service-image-container {
          width: 100%;
          height: 240px;
          border-radius: var(--radius-md);
          overflow: hidden;
          position: relative;
          margin-bottom: 1.75rem;
          background: #EAE8DE;
        }
        .service-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s var(--ease-cinematic);
        }
        .service-card:hover .service-img {
          transform: scale(1.06);
        }
        .service-content {
          flex: 1;
        }
        .service-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }
        .service-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .service-highlights {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 2rem;
        }
        .highlight-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        .highlight-icon {
          color: #16A34A;
          flex-shrink: 0;
        }
        .service-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-light);
        }
        .service-cta-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          transition: color 0.2s ease;
        }
        .arrow-circle {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--bg-warm);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }
        .service-card:hover .arrow-circle {
          background: var(--accent-gold);
          transform: translateX(4px);
        }
        .service-quick-book {
          font-size: 0.825rem;
          font-weight: 800;
          color: var(--text-secondary);
          padding: 0.4rem 0.95rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-medium);
          transition: all 0.2s ease;
        }
        .service-quick-book:hover {
          background: var(--bg-deep);
          color: var(--text-light);
          border-color: var(--bg-deep);
        }
      `}</style>
    </div>
  );
};
