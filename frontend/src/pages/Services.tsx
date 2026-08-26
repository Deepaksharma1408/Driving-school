import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { SERVICES } from '../data/content';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export const Services: React.FC = () => {
  return (
    <div className="services-overview-page">
      <PageHeader 
        tag="SERVICES & PACKAGES"
        title="STRUCTURED DRIVER TRAINING & TEST VEHICLE PACKAGES."
        subtitle="Transparent options tailored to your exact driving goals — from individual skills training to test-day vehicle hire."
        breadcrumb="Services"
      />

      {/* Services Grid Detailed */}
      <section className="section-padding">
        <div className="container">
          <div className="services-detailed-list">
            {SERVICES.map((service, index) => (
              <div key={service.id} className="service-detail-card aura-card">
                <div className="service-detail-grid">
                  <div className="service-detail-left">
                    <div className="service-header-mini">
                      <span className="service-number-pill">{service.number}</span>
                      <span className="pill-badge">{service.badge}</span>
                    </div>

                    <h2 className="service-detail-title">{service.title}</h2>
                    <p className="service-detail-desc">{service.shortDesc}</p>

                    <div className="ideal-for-box">
                      <strong>Best suited for:</strong>
                      <p>{service.idealFor}</p>
                    </div>

                    <div className="service-price-area">
                      <div className="price-tag">
                        <span className="price-val">{service.pricePlaceholder}</span>
                        <span className="price-note">Transparent pricing — no hidden fees</span>
                      </div>
                      <Button to={`/book?service=${service.id}`} variant="primary" icon={<ArrowRight size={16} />}>
                        BOOK THIS SERVICE
                      </Button>
                    </div>
                  </div>

                  <div className="service-detail-right">
                    <div className="service-features-box">
                      <h4 className="features-heading">What’s Included:</h4>
                      <ul className="detailed-features-list">
                        {service.highlights.map((h, i) => (
                          <li key={i} className="detailed-feature-item">
                            <CheckCircle2 size={18} className="feat-check" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="service-subpage-link">
                        <Link to={service.slug} className="more-info-link">
                          <span>View full curriculum & details</span>
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service Comparison Matrix */}
          <div className="comparison-box aura-card">
            <h3 className="comparison-title">Which Package Do You Need?</h3>
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature / Inclusions</th>
                    <th>Driving Lesson</th>
                    <th>Car Hire Only</th>
                    <th>Lesson + Car Package</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1-on-1 Instructor Coaching</td>
                    <td><CheckCircle2 size={18} className="tbl-check" /></td>
                    <td>-</td>
                    <td><CheckCircle2 size={18} className="tbl-check" /></td>
                  </tr>
                  <tr>
                    <td>NSW Transport Dual-Control Vehicle</td>
                    <td><CheckCircle2 size={18} className="tbl-check" /></td>
                    <td><CheckCircle2 size={18} className="tbl-check" /></td>
                    <td><CheckCircle2 size={18} className="tbl-check" /></td>
                  </tr>
                  <tr>
                    <td>Practical Test Car Insurance & Rego</td>
                    <td>-</td>
                    <td><CheckCircle2 size={18} className="tbl-check" /></td>
                    <td><CheckCircle2 size={18} className="tbl-check" /></td>
                  </tr>
                  <tr>
                    <td>Pre-Test Warm-Up Mock Test</td>
                    <td>Optional</td>
                    <td>-</td>
                    <td><CheckCircle2 size={18} className="tbl-check" /></td>
                  </tr>
                  <tr>
                    <td>Instructor Accompaniment at Service NSW</td>
                    <td>-</td>
                    <td><CheckCircle2 size={18} className="tbl-check" /></td>
                    <td><CheckCircle2 size={18} className="tbl-check" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .services-detailed-list {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          margin-bottom: 4rem;
        }
        .service-detail-card {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 2.5rem;
        }
        @media (max-width: 768px) {
          .service-detail-card {
            padding: 1.5rem;
          }
        }
        .service-detail-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3rem;
        }
        @media (max-width: 960px) {
          .service-detail-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        .service-header-mini {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .service-number-pill {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.9rem;
          background: var(--accent-primary);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          color: var(--text-primary);
        }
        .service-detail-title {
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }
        .service-detail-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .ideal-for-box {
          background: var(--bg-surface-alt);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          margin-bottom: 2rem;
        }
        .ideal-for-box strong {
          display: block;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }
        .ideal-for-box p {
          font-size: 0.9rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        .service-price-area {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-light);
          flex-wrap: wrap;
          gap: 1.25rem;
        }
        .price-val {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--text-primary);
        }
        .price-note {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .service-features-box {
          background: var(--bg-main);
          border-radius: var(--radius-lg);
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .features-heading {
          font-size: 1.1rem;
          font-weight: 800;
          margin-bottom: 1.25rem;
        }
        .detailed-features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.75rem;
        }
        .detailed-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.9rem;
          color: var(--text-primary);
          font-weight: 600;
          line-height: 1.45;
        }
        .feat-check {
          color: #16A34A;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .more-info-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.875rem;
          color: var(--text-primary);
          transition: gap 0.2s;
        }
        .more-info-link:hover {
          gap: 0.75rem;
        }

        /* Comparison Table */
        .comparison-box {
          background: #FFFFFF;
          padding: 2.5rem;
          border-radius: var(--radius-xl);
        }
        .comparison-title {
          font-size: 1.5rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .comparison-table-wrap {
          overflow-x: auto;
        }
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .comparison-table th, .comparison-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-light);
          font-size: 0.9rem;
        }
        .comparison-table th {
          font-family: var(--font-heading);
          font-weight: 800;
          background: var(--bg-surface-alt);
          color: var(--text-primary);
        }
        .tbl-check {
          color: #16A34A;
        }
      `}</style>
    </div>
  );
};
