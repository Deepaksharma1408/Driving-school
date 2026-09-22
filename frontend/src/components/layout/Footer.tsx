import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Youtube 
} from 'lucide-react';
import { BRAND_INFO, TEST_LOCATIONS } from '../../data/content';

export const Footer: React.FC = () => {
  const savedSettings = localStorage.getItem('drivinity_business_settings');
  const businessInfo = savedSettings ? JSON.parse(savedSettings) : {
    phone: BRAND_INFO.phonePlaceholder,
    email: BRAND_INFO.emailPlaceholder,
    address: 'Accredited NSW Testing Service Zones',
    openingHours: 'Mon – Sun: 7:00 AM – 7:00 PM'
  };

  return (
    <footer className="compact-luxury-footer">
      <div className="container-wide">
        {/* Top Minimal Brand & Socials Bar */}
        <div className="footer-top-compact">
          <div className="footer-brand-lockup">
            <Link to="/" className="footer-logo-link">
              <span className="footer-logo-title">DRIVINITY</span>
              <span className="footer-logo-sub">DRIVING ACADEMY</span>
            </Link>
            <p className="footer-tagline">
              Professional driving education designed for real roads, real situations and lifelong safety.
            </p>
          </div>

          <div className="footer-social-strip">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="compact-social-btn" aria-label="Instagram">
              <Instagram size={15} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="compact-social-btn" aria-label="Facebook">
              <Facebook size={15} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="compact-social-btn" aria-label="YouTube">
              <Youtube size={15} />
            </a>
          </div>
        </div>

        {/* 4-Column Compact Directory */}
        <div className="footer-compact-grid">
          {/* Col 1: Programs */}
          <div className="footer-col">
            <span className="col-heading">PROGRAMS</span>
            <ul className="footer-links">
              <li><Link to="/driving-lessons">Driving Lessons</Link></li>
              <li><Link to="/car-hire">Car Hire for Test</Link></li>
              <li><Link to="/lesson-and-car">Lesson + Car Combo</Link></li>
              <li><Link to="/test-preparation">Test Route Simulation</Link></li>
            </ul>
          </div>

          {/* Col 2: Academy */}
          <div className="footer-col">
            <span className="col-heading">ACADEMY</span>
            <ul className="footer-links">
              <li><Link to="/about">About Drivinity</Link></li>
              <li><Link to="/instructors">Accredited Coaches</Link></li>
              <li><Link to="/faq">Frequently Asked Questions</Link></li>
              <li><Link to="/blog">The Journal</Link></li>
            </ul>
          </div>

          {/* Col 3: Service Zones (Generic, Copyright-Safe) */}
          <div className="footer-col">
            <span className="col-heading">COVERAGE</span>
            <ul className="footer-links">
              {TEST_LOCATIONS.map((loc) => (
                <li key={loc.id}>
                  <Link to={`/book?location=${loc.id}`}>
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Inquiries & Booking */}
          <div className="footer-col">
            <span className="col-heading">INQUIRIES</span>
            <div className="compact-contact-stack">
              <a href={`tel:${businessInfo.phone}`} className="compact-contact-link">
                <Phone size={13} className="contact-icon" />
                <span>{businessInfo.phone}</span>
              </a>
              <a href={`mailto:${businessInfo.email}`} className="compact-contact-link">
                <Mail size={13} className="contact-icon" />
                <span>{businessInfo.email}</span>
              </a>
              <div className="compact-contact-link">
                <Clock size={13} className="contact-icon" />
                <span>{businessInfo.openingHours}</span>
              </div>
              <Link to="/contact" className="compact-contact-link contact-highlight">
                <span>Direct Contact Portal →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Sleek Legal Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copy-text">
            © {new Date().getFullYear()} Drivinity Driving Academy. All rights reserved. Registered NSW Driving School.
          </p>
          <div className="footer-legal-links">
            <Link to="/faq">FAQ</Link>
            <span className="dot">•</span>
            <Link to="/about">Privacy</Link>
            <span className="dot">•</span>
            <Link to="/about">Terms</Link>
          </div>
        </div>
      </div>

      <style>{`
        /* ============================================================
           COMPACT LUXURY OUTRO FOOTER
           ============================================================ */
        .compact-luxury-footer {
          background-color: #0A0B0E;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          padding: 3.25rem 0 1.75rem 0;
          font-family: var(--font-body);
        }

        @media (max-width: 768px) {
          .compact-luxury-footer {
            padding: 2.5rem 0 1.5rem 0;
          }
        }

        /* Top Brand & Socials Bar */
        .footer-top-compact {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 2.25rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .footer-brand-lockup {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .footer-logo-link {
          display: inline-flex;
          flex-direction: column;
          text-decoration: none;
        }

        .footer-logo-title {
          font-family: 'Cinzel', 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.26em;
          color: #FFFFFF;
          line-height: 1;
        }

        .footer-logo-sub {
          font-family: 'Outfit', -apple-system, sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.24em;
          color: var(--accent-champagne);
          margin-top: 4px;
        }

        .footer-tagline {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.6);
          max-width: 460px;
          line-height: 1.45;
          margin: 0;
        }

        .footer-social-strip {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .compact-social-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .compact-social-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          border-color: #FFFFFF;
          transform: translateY(-2px);
        }

        /* 4-Column Directory Grid */
        .footer-compact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1.2fr 1.2fr;
          gap: 2rem;
          padding-bottom: 2.25rem;
        }

        @media (max-width: 960px) {
          .footer-compact-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1.75rem;
          }
        }

        @media (max-width: 520px) {
          .footer-compact-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .col-heading {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--accent-champagne);
          text-transform: uppercase;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .footer-links a {
          font-size: 0.84rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .footer-links a:hover {
          color: #FFFFFF;
          transform: translateX(3px);
        }

        /* Contact Details Column */
        .compact-contact-stack {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .compact-contact-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .compact-contact-link:hover {
          color: #FFFFFF;
        }

        .contact-icon {
          color: var(--accent-champagne);
          flex-shrink: 0;
        }

        .contact-highlight {
          color: var(--accent-champagne) !important;
          font-weight: 600;
          margin-top: 0.25rem;
        }

        /* Bottom Legal Bar */
        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.45);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-copy-text {
          margin: 0;
        }

        .footer-legal-links {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .footer-legal-links a {
          color: rgba(255, 255, 255, 0.45);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-legal-links a:hover {
          color: #FFFFFF;
        }

        .dot {
          color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </footer>
  );
};
