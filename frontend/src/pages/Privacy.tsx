import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { ShieldCheck, Lock, Eye, FileText, Database, Server, RefreshCw } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="privacy-page-wrapper">
      <PageHeader
        tag="DATA GOVERNANCE & PRIVACY"
        title="PRIVACY POLICY"
        subtitle="How Drivinity Driving Academy collects, protects, processes, and respects your personal information across all driving education services."
        breadcrumb="Privacy Policy"
        badge="Last Updated: September 2026 // NSW Transport Compliance Verified"
      />

      <section className="privacy-content-section section-padding">
        <div className="container">
          <div className="privacy-grid">
            {/* Left Sidebar Table of Contents */}
            <aside className="privacy-sidebar hide-mobile">
              <div className="sidebar-sticky-box">
                <span className="sidebar-tag">DOCUMENT INDEX</span>
                <nav className="toc-nav">
                  <a href="#collection" className="toc-link">1. Information We Collect</a>
                  <a href="#usage" className="toc-link">2. How We Use Data</a>
                  <a href="#protection" className="toc-link">3. Security & Storage</a>
                  <a href="#cookies" className="toc-link">4. Digital Telemetry & Cookies</a>
                  <a href="#sharing" className="toc-link">5. Third-Party Disclosures</a>
                  <a href="#rights" className="toc-link">6. Your Data Rights</a>
                  <a href="#contact" className="toc-link">7. Data Governance Contact</a>
                </nav>
              </div>
            </aside>

            {/* Main Editorial Privacy Articles */}
            <div className="privacy-articles-column">
              {/* Introduction Banner */}
              <div className="editorial-lead-card">
                <div className="card-badge-header">
                  <ShieldCheck size={20} className="badge-ico" />
                  <span>TRANSPARENCY GUARANTEE</span>
                </div>
                <p>
                  At <strong>Drivinity Driving Academy</strong>, your privacy and trust are fundamental to our teaching philosophy. This Privacy Policy details the policies and procedures governing how we collect, handle, store, and safeguard your personal data when you interact with our website, booking platform, or dual-control driver training services in New South Wales.
                </p>
              </div>

              {/* Section 1 */}
              <article id="collection" className="privacy-article-block">
                <div className="article-header">
                  <span className="section-num font-mono">01</span>
                  <h2 className="article-heading">Information We Collect</h2>
                </div>
                <p>
                  To provide accredited driving instruction, logbook verification, and Service NSW test preparation, we collect information directly provided by you during account creation, lesson booking, or inquiry forms:
                </p>
                <ul className="editorial-check-list">
                  <li><strong>Personal Identifier Data:</strong> Full legal name, date of birth, residential address, email address, and mobile contact numbers.</li>
                  <li><strong>Licence & Transport Details:</strong> NSW Learner Licence number, Overseas Licence translation records, logbook completion status, and test appointment dates.</li>
                  <li><strong>Booking & Transaction Records:</strong> Driving package selections, scheduled lesson dates, pickup/drop-off locations, and encrypted payment confirmations.</li>
                  <li><strong>Instructor Progress Feedback:</strong> Instructor evaluation notes, competencies achieved, and mock test score records.</li>
                </ul>
              </article>

              {/* Section 2 */}
              <article id="usage" className="privacy-article-block">
                <div className="article-header">
                  <span className="section-num font-mono">02</span>
                  <h2 className="article-heading">How We Use Your Information</h2>
                </div>
                <p>
                  Your information is utilized strictly to fulfill driver education services, facilitate logbook credit, and maintain high standards of road safety:
                </p>
                <div className="usage-cards-row">
                  <div className="usage-mini-card">
                    <FileText size={18} className="card-icon" />
                    <strong>Lesson Scheduling</strong>
                    <p>Coordinating instructor dispatch, vehicle allocation, and automated SMS lesson reminders.</p>
                  </div>
                  <div className="usage-mini-card">
                    <Lock size={18} className="card-icon" />
                    <strong>Logbook Validation</strong>
                    <p>Recording 3-for-1 structured bonus hours under Transport for NSW regulation requirements.</p>
                  </div>
                  <div className="usage-mini-card">
                    <Server size={18} className="card-icon" />
                    <strong>Test Preparation</strong>
                    <p>Verifying vehicle hire suitability and Service NSW exam route readiness evaluations.</p>
                  </div>
                </div>
              </article>

              {/* Section 3 */}
              <article id="protection" className="privacy-article-block">
                <div className="article-header">
                  <span className="section-num font-mono">03</span>
                  <h2 className="article-heading">Data Security & Storage Controls</h2>
                </div>
                <p>
                  We employ enterprise-grade administrative, technical, and physical security measures to protect your personal data against unauthorized access, loss, alteration, or disclosure:
                </p>
                <div className="security-feature-box">
                  <div className="security-point">
                    <Database size={18} className="sec-ico" />
                    <div>
                      <strong>AES-256 Encryption & SSL Safeguards</strong>
                      <p>All online transmissions and database entries are protected using TLS 1.3 encryption protocols.</p>
                    </div>
                  </div>
                  <div className="security-point">
                    <RefreshCw size={18} className="sec-ico" />
                    <div>
                      <strong>Strict Access Controls</strong>
                      <p>Only verified Drivinity management and your assigned licensed instructor have access to necessary student details.</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Section 4 */}
              <article id="cookies" className="privacy-article-block">
                <div className="article-header">
                  <span className="section-num font-mono">04</span>
                  <h2 className="article-heading">Digital Telemetry & Cookies</h2>
                </div>
                <p>
                  Our web platform uses essential operational cookies and telemetry analytics to deliver a seamless user experience, remember your language preferences, and optimize site navigation speed. We do not use intrusive third-party cross-site tracking cookies.
                </p>
              </article>

              {/* Section 5 */}
              <article id="sharing" className="privacy-article-block">
                <div className="article-header">
                  <span className="section-num font-mono">05</span>
                  <h2 className="article-heading">Third-Party Disclosures</h2>
                </div>
                <p>
                  Drivinity Driving Academy does <strong>NOT</strong> sell, rent, or trade your personal information to marketing third parties. Data is only shared under strict legal or operational obligations:
                </p>
                <ul className="editorial-check-list">
                  <li><strong>Service NSW & Regulatory Audits:</strong> Verified logbook hours shared as required by NSW road transport legislation.</li>
                  <li><strong>Payment Processing Gateways:</strong> Payment details processed via PCI-DSS compliant payment gateways (Stripe/PayPal).</li>
                  <li><strong>Emergency Services:</strong> Emergency contact details supplied to emergency responders in the unlikely event of a road incident.</li>
                </ul>
              </article>

              {/* Section 6 */}
              <article id="rights" className="privacy-article-block">
                <div className="article-header">
                  <span className="section-num font-mono">06</span>
                  <h2 className="article-heading">Your Data Rights</h2>
                </div>
                <p>
                  Under Australian Privacy Principles (APPs) and the Privacy Act 1988, you have full authority over your personal information:
                </p>
                <div className="rights-list-grid">
                  <div className="right-badge-item">
                    <strong>Right to Access</strong>
                    <p>Request a copy of all personal records and lesson logs held in your account.</p>
                  </div>
                  <div className="right-badge-item">
                    <strong>Right to Correction</strong>
                    <p>Request immediate updates to incorrect contact or licence details.</p>
                  </div>
                  <div className="right-badge-item">
                    <strong>Right to Erasure</strong>
                    <p>Request data deletion subject to statutory legal record-keeping requirements.</p>
                  </div>
                </div>
              </article>

              {/* Section 7 */}
              <article id="contact" className="privacy-article-block contact-article">
                <div className="article-header">
                  <span className="section-num font-mono">07</span>
                  <h2 className="article-heading">Data Governance & Enquiries</h2>
                </div>
                <p>
                  If you have questions regarding this Privacy Policy, wish to exercise your data rights, or submit a privacy inquiry, please contact our Data Governance Officer:
                </p>
                <div className="governance-contact-card">
                  <strong>Drivinity Data Privacy Governance</strong>
                  <p>Email: <a href="mailto:privacy@drivinity.com" className="email-link">privacy@drivinity.com</a></p>
                  <p>Support Hotline: (02) 8000 0000</p>
                  <p>Location: Accredited NSW Driver Training Service Zones</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .privacy-page-wrapper {
          background-color: var(--bg-warm-ivory);
          color: var(--text-primary);
        }

        .privacy-grid {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 3.5rem;
          align-items: flex-start;
        }

        @media (max-width: 960px) {
          .privacy-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        /* Sidebar Index */
        .sidebar-sticky-box {
          position: sticky;
          top: 100px;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(17, 17, 17, 0.03);
        }

        .sidebar-tag {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: var(--accent-champagne);
          display: block;
          margin-bottom: 1rem;
        }

        .toc-nav {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .toc-link {
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .toc-link:hover {
          color: var(--text-primary);
          transform: translateX(4px);
        }

        /* Editorial Articles */
        .privacy-articles-column {
          display: flex;
          flex-direction: column;
          gap: 2.75rem;
        }

        .editorial-lead-card {
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 1.85rem 2.2rem;
          box-shadow: 0 6px 24px rgba(17, 17, 20, 0.04);
        }

        .card-badge-header {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--accent-champagne);
          margin-bottom: 0.85rem;
        }

        .badge-ico {
          color: var(--accent-champagne);
        }

        .editorial-lead-card p {
          font-size: 1.02rem;
          line-height: 1.68;
          color: var(--text-primary);
        }

        .privacy-article-block {
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 2rem 2.25rem;
          box-shadow: 0 4px 20px rgba(17, 17, 20, 0.03);
        }

        .article-header {
          display: flex;
          align-items: baseline;
          gap: 0.85rem;
          margin-bottom: 1.15rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .section-num {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--accent-champagne);
          letter-spacing: 0.1em;
        }

        .article-heading {
          font-family: 'Cinzel', Georgia, serif;
          font-size: 1.55rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--text-primary);
          margin: 0;
          text-transform: uppercase;
        }

        .editorial-check-list {
          list-style: none;
          padding: 0;
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .editorial-check-list li {
          position: relative;
          padding-left: 1.5rem;
          font-size: 0.94rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .editorial-check-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          top: 0;
          color: var(--accent-champagne);
          font-size: 1.2rem;
          line-height: 1;
        }

        .usage-cards-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1.25rem;
        }

        @media (max-width: 640px) {
          .usage-cards-row {
            grid-template-columns: 1fr;
          }
        }

        .usage-mini-card {
          background: var(--bg-warm-ivory);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .card-icon {
          color: var(--accent-champagne);
        }

        .usage-mini-card strong {
          font-family: var(--font-display);
          font-size: 0.88rem;
          color: var(--text-primary);
        }

        .usage-mini-card p {
          font-size: 0.8rem;
          line-height: 1.45;
          margin: 0;
        }

        .security-feature-box {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.15rem;
          background: var(--bg-warm-ivory);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 1.25rem;
        }

        .security-point {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .sec-ico {
          color: var(--accent-champagne);
          margin-top: 3px;
          flex-shrink: 0;
        }

        .security-point strong {
          font-family: var(--font-display);
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .security-point p {
          font-size: 0.82rem;
          margin: 0.2rem 0 0 0;
        }

        .rights-list-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1.15rem;
        }

        @media (max-width: 640px) {
          .rights-list-grid {
            grid-template-columns: 1fr;
          }
        }

        .right-badge-item {
          background: var(--bg-warm-ivory);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 1rem;
        }

        .right-badge-item strong {
          font-family: var(--font-display);
          font-size: 0.88rem;
          color: var(--text-primary);
          display: block;
          margin-bottom: 0.35rem;
        }

        .right-badge-item p {
          font-size: 0.78rem;
          line-height: 1.45;
          margin: 0;
        }

        .governance-contact-card {
          margin-top: 1.25rem;
          background: var(--bg-warm-ivory);
          border: 1.5px solid var(--accent-champagne);
          border-radius: var(--radius-md);
          padding: 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .governance-contact-card strong {
          font-family: var(--font-display);
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .email-link {
          color: var(--text-primary);
          font-weight: 600;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
