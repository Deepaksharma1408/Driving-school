import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Instagram, 
  Facebook, 
  Youtube, 
  Sparkles 
} from 'lucide-react';
import { BRAND_INFO, SERVICES, TEST_LOCATIONS } from '../../data/content';

export const Footer: React.FC = () => {
  const savedSettings = localStorage.getItem('drivinity_business_settings');
  const businessInfo = savedSettings ? JSON.parse(savedSettings) : {
    phone: BRAND_INFO.phonePlaceholder,
    email: BRAND_INFO.emailPlaceholder,
    address: BRAND_INFO.serviceArea,
    openingHours: BRAND_INFO.hoursPlaceholder
  };

  return (
    <footer className="automotive-outro-footer">
      {/* Visual Separation Boundary & Top Glow */}
      <div className="footer-scene-boundary" />

      {/* Main Spacious Outro Stage */}
      <div className="container-wide">
        <div className="footer-outro-layout">
          {/* Top Row: Grand Brand Lockup & Instructor Accreditation */}
          <div className="footer-grand-brand-row">
            <div className="brand-outro-lockup">
              <Link to="/" className="brand-outro-logo">
                <span className="brand-outro-main">
                  DRIVIN<span className="brand-outro-gold">ITY</span>
                </span>
                <span className="brand-outro-sub">DRIVING ACADEMY // NSW</span>
              </Link>
              <p className="brand-outro-tagline">
                Premier automotive driver academy in Greater Sydney. Developing calm, defensive, and test-ready motorists for Australian roads.
              </p>
            </div>

            <div className="accreditation-pill-outro">
              <ShieldCheck size={22} className="gold-icon-outro" />
              <div>
                <strong className="acc-title">NSW Transport Authorised</strong>
                <span className="acc-sub">Fully Licensed & Dual-Control Insured Fleet</span>
              </div>
            </div>
          </div>

          {/* Middle Row: Structured 4-Column Navigation Directory */}
          <div className="footer-directory-grid">
            {/* Col 1: Services */}
            <div className="directory-column">
              <span className="col-eyebrow">SERVICES</span>
              <ul className="directory-links-list">
                <li>
                  <Link to="/driving-lessons" className="directory-link">
                    <span>Driving Lessons</span>
                    <ArrowRight size={13} className="link-chevron" />
                  </Link>
                </li>
                <li>
                  <Link to="/car-hire" className="directory-link">
                    <span>Car Hire for Test</span>
                    <ArrowRight size={13} className="link-chevron" />
                  </Link>
                </li>
                <li>
                  <Link to="/lesson-and-car" className="directory-link">
                    <span>Lesson + Car Package</span>
                    <ArrowRight size={13} className="link-chevron" />
                  </Link>
                </li>
                <li>
                  <Link to="/test-preparation" className="directory-link">
                    <span>Test Preparation & Audit</span>
                    <ArrowRight size={13} className="link-chevron" />
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="directory-link gold-highlight">
                    <span>All Packages & Pricing ($XX)</span>
                    <ArrowRight size={13} className="link-chevron" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 2: Company */}
            <div className="directory-column">
              <span className="col-eyebrow">COMPANY</span>
              <ul className="directory-links-list">
                <li>
                  <Link to="/about" className="directory-link">About Drivinity</Link>
                </li>
                <li>
                  <Link to="/faq" className="directory-link">Frequently Asked Questions</Link>
                </li>
                <li>
                  <Link to="/blog" className="directory-link">Blog & "On The Road" Guides</Link>
                </li>
                <li>
                  <Link to="/contact" className="directory-link">Contact Instructor</Link>
                </li>
                <li>
                  <Link to="/book" className="directory-link gold-highlight">Book Driving Lesson Online →</Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Service Locations */}
            <div className="directory-column">
              <span className="col-eyebrow">LOCATIONS</span>
              <ul className="directory-links-list">
                {TEST_LOCATIONS.map((loc) => (
                  <li key={loc.id}>
                    <Link to={`/book?location=${loc.id}`} className="directory-link">
                      <MapPin size={13} className="loc-pin" />
                      <span>{loc.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact & Hours */}
            <div className="directory-column contact-col">
              <span className="col-eyebrow">CONTACT</span>
              <div className="contact-outro-card">
                <div className="contact-item">
                  <Phone size={15} className="gold-icon-outro" />
                  <a href={`tel:${businessInfo.phone}`} className="contact-text-link">
                    {businessInfo.phone}
                  </a>
                </div>
                <div className="contact-item">
                  <Mail size={15} className="gold-icon-outro" />
                  <a href={`mailto:${businessInfo.email}`} className="contact-text-link">
                    {businessInfo.email}
                  </a>
                </div>
                <div className="contact-item">
                  <Clock size={15} className="gold-icon-outro" />
                  <span>{businessInfo.openingHours}</span>
                </div>
                <div className="contact-item">
                  <MapPin size={15} className="gold-icon-outro" />
                  <span>{businessInfo.address}</span>
                </div>

                <div className="social-pill-buttons">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Instagram">
                    <Instagram size={16} />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Facebook">
                    <Facebook size={16} />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="YouTube">
                    <Youtube size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="footer-legal-outro-bar">
            <p className="copyright-outro-text">
              © {new Date().getFullYear()} {BRAND_INFO.fullName}. All rights reserved. Registered NSW Driving School.
            </p>
            <div className="legal-outro-links">
              <Link to="/faq" className="legal-outro-link">FAQ</Link>
              <span className="legal-dot">•</span>
              <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: Customer data is handled strictly for booking and licence administration.'); }} className="legal-outro-link">Privacy Policy</a>
              <span className="legal-dot">•</span>
              <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: Standard NSW driving school training terms apply.'); }} className="legal-outro-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ============================================================
           SEPARATE DARK OUTRO FOOTER STYLING
           ============================================================ */
        .automotive-outro-footer {
          position: relative;
          background-color: #07131D !important;
          color: #FFFFFF !important;
          padding-top: 6rem;
          padding-bottom: 4rem;
          border-top: 1px solid rgba(210, 176, 76, 0.2);
          box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.4);
          z-index: 20;
        }
        @media (max-width: 768px) {
          .automotive-outro-footer {
            padding-top: 3.5rem;
            padding-bottom: 2.5rem;
          }
        }

        .footer-scene-boundary {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(210, 176, 76, 0.6) 50%, transparent 100%);
        }

        .footer-outro-layout {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }
        @media (max-width: 768px) {
          .footer-outro-layout {
            gap: 2.5rem;
          }
        }

        /* Top Brand Row */
        .footer-grand-brand-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .brand-outro-logo {
          display: flex;
          flex-direction: column;
          margin-bottom: 0.5rem;
        }
        .brand-outro-main {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(1.6rem, 5vw, 2.2rem);
          letter-spacing: 0.04em;
          color: #FFFFFF;
          line-height: 1;
        }
        .brand-outro-gold {
          color: var(--accent-gold);
        }
        .brand-outro-sub {
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          color: var(--accent-gold);
          margin-top: 4px;
        }
        .brand-outro-tagline {
          font-size: 0.925rem;
          color: #9BB0C1;
          max-width: 520px;
          line-height: 1.55;
        }

        .accreditation-pill-outro {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(13, 28, 39, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.85rem 1.35rem;
          border-radius: var(--radius-lg);
          max-width: 100%;
        }
        .gold-icon-outro {
          color: var(--accent-gold);
          flex-shrink: 0;
        }
        .acc-title {
          display: block;
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 800;
          color: #FFFFFF;
        }
        .acc-sub {
          font-size: 0.75rem;
          color: #9BB0C1;
        }

        /* 4 Column Directory Grid */
        .footer-directory-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1.2fr 1.2fr;
          gap: 2.5rem;
        }
        @media (max-width: 1024px) {
          .footer-directory-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }
        @media (max-width: 640px) {
          .footer-directory-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
        }

        .col-eyebrow {
          display: block;
          font-family: var(--font-display);
          font-size: 0.825rem;
          font-weight: 900;
          letter-spacing: 0.15em;
          color: var(--accent-gold);
          margin-bottom: 1.15rem;
        }

        .directory-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .directory-link {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.9rem;
          color: #CBD5E1;
          transition: all 0.2s ease;
        }
        .directory-link:hover {
          color: #FFFFFF;
          transform: translateX(4px);
        }
        .directory-link.gold-highlight {
          color: var(--accent-gold);
          font-weight: 700;
        }
        .link-chevron {
          color: var(--accent-gold);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .directory-link:hover .link-chevron {
          opacity: 1;
        }
        .loc-pin {
          color: var(--accent-gold);
          margin-right: 0.5rem;
          flex-shrink: 0;
        }

        /* Contact Outro */
        .contact-outro-card {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.885rem;
          color: #CBD5E1;
        }
        .contact-text-link {
          color: #CBD5E1;
          transition: color 0.2s;
        }
        .contact-text-link:hover {
          color: var(--accent-gold);
        }

        .social-pill-buttons {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.75rem;
        }
        .social-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(13, 28, 39, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          transition: all 0.2s ease;
        }
        .social-circle:hover {
          background: var(--accent-gold);
          color: #07131D;
          border-color: var(--accent-gold);
          transform: translateY(-2px);
        }

        /* Legal Outro Bottom Bar */
        .footer-legal-outro-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          flex-wrap: wrap;
          gap: 1rem;
        }
        .copyright-outro-text {
          font-size: 0.8rem;
          color: #9BB0C1;
        }
        .legal-outro-links {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }
        .legal-outro-link {
          font-size: 0.8rem;
          color: #9BB0C1;
          transition: color 0.2s;
        }
        .legal-outro-link:hover {
          color: #FFFFFF;
        }
        .legal-dot {
          color: rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </footer>
  );
};
