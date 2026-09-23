import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { ShieldAlert, CheckCircle2, Clock, Car, Award, AlertTriangle, Scale } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="terms-page-wrapper">
      <PageHeader
        tag="TERMS OF SERVICE & POLICIES"
        title="TERMS & CONDITIONS"
        subtitle="Rules, learner responsibilities, cancellation terms, Service NSW test vehicle policies, and operational agreements for Drivinity Driving Academy."
        breadcrumb="Terms & Conditions"
        badge="Effective Date: September 2026 // Transport for NSW Registered Standards"
      />

      <section className="terms-content-section section-padding">
        <div className="container">
          <div className="terms-grid">
            {/* Left Sidebar Index */}
            <aside className="terms-sidebar hide-mobile">
              <div className="sidebar-sticky-box">
                <span className="sidebar-tag">TERMS INDEX</span>
                <nav className="toc-nav">
                  <a href="#licence-req" className="toc-link">1. Licence Requirements</a>
                  <a href="#cancellation" className="toc-link">2. Cancellation Policy</a>
                  <a href="#test-hire" className="toc-link">3. Service NSW Test Hire</a>
                  <a href="#conduct" className="toc-link">4. Student Safety & Conduct</a>
                  <a href="#logbook" className="toc-link">5. 3-for-1 Bonus Logbook Hours</a>
                  <a href="#fleet" className="toc-link">6. Fleet & Insurance Coverage</a>
                  <a href="#disputes" className="toc-link">7. Liability & Governing Law</a>
                </nav>
              </div>
            </aside>

            {/* Main Editorial Terms Articles */}
            <div className="terms-articles-column">
              {/* Introduction Card */}
              <div className="editorial-lead-card">
                <div className="card-badge-header">
                  <Scale size={20} className="badge-ico" />
                  <span>STUDENT AGREEMENT & OPERATIONAL COMPLIANCE</span>
                </div>
                <p>
                  By registering an account, purchasing driving packages, or scheduling lessons with <strong>Drivinity Driving Academy</strong>, you agree to comply with the terms, conditions, and operational policies set forth below. These terms are established to ensure maximum safety, clear expectations, and full compliance with Transport for NSW road safety rules.
                </p>
              </div>

              {/* Section 1 */}
              <article id="licence-req" className="terms-article-block">
                <div className="article-header">
                  <span className="section-num font-mono">01</span>
                  <h2 className="article-heading">Licence Requirements & Eligibility</h2>
                </div>
                <p>
                  All students must satisfy mandatory licensing prerequisites prior to starting any in-car practical driving lesson:
                </p>
                <ul className="editorial-check-list">
                  <li><strong>Valid Licence Presentation:</strong> You must present a valid NSW Learner Licence, Provisional Licence, or official Overseas Driver Licence (with accredited NAATI translation) at the beginning of every lesson.</li>
                  <li><strong>Physical Possession:</strong> Digital licences on official NSW State apps or physical licence cards are accepted. If a student cannot produce a valid licence, the lesson cannot proceed under NSW law and full lesson fees apply.</li>
                  <li><strong>Logbook Availability:</strong> Learner drivers must have their digital Service NSW Logbook App or physical paper logbook ready for instructor entry.</li>
                </ul>
              </article>

              {/* Section 2 */}
              <article id="cancellation" className="terms-article-block">
                <div className="article-header">
                  <span className="section-num font-mono">02</span>
                  <h2 className="article-heading">Booking, Cancellation & Rescheduling Policy</h2>
                </div>
                <p>
                  To maintain fair scheduling for all students and compensate accredited instructors for reserved time, Drivinity enforces a clear 24-hour cancellation rule:
                </p>
                <div className="policy-timeline-box">
                  <div className="policy-tier">
                    <CheckCircle2 size={18} className="tier-ico green" />
                    <div>
                      <strong>Cancellation &gt; 24 Hours Prior:</strong>
                      <p>Full credit refund or free lesson rescheduling via student portal or hotline with zero penalty.</p>
                    </div>
                  </div>
                  <div className="policy-tier">
                    <Clock size={18} className="tier-ico amber" />
                    <div>
                      <strong>Cancellation Between 12 to 24 Hours:</strong>
                      <p>50% lesson fee applies to cover instructor schedule allocation.</p>
                    </div>
                  </div>
                  <div className="policy-tier">
                    <ShieldAlert size={18} className="tier-ico red" />
                    <div>
                      <strong>Late Cancellation (&lt; 12 Hours) or No-Show:</strong>
                      <p>100% lesson fee forfeited. Instructors wait 15 minutes at pickup location before marking a no-show.</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Section 3 */}
              <article id="test-hire" className="terms-article-block">
                <div className="article-header">
                  <span className="section-num font-mono">03</span>
                  <h2 className="article-heading">Service NSW Test Vehicle Hire Terms</h2>
                </div>
                <p>
                  Hiring a Drivinity dual-control vehicle for a Service NSW Practical Driving Test is subject to instructor readiness evaluation:
                </p>
                <div className="test-hire-rules">
                  <div className="rule-card">
                    <Car size={20} className="rule-ico" />
                    <strong>Instructor Approval Required</strong>
                    <p>To ensure road safety and protect testing vehicle integrity, your instructor must evaluate your driving skills as test-ready prior to confirming test vehicle hire.</p>
                  </div>
                  <div className="rule-card">
                    <Award size={20} className="rule-ico" />
                    <strong>Warm-Up Session Included</strong>
                    <p>Standard test hire packages include a 45-60 minute pre-test warm-up lesson immediately preceding your Service NSW test appointment.</p>
                  </div>
                </div>
              </article>

              {/* Section 4 */}
              <article id="conduct" className="terms-article-block">
                <div className="article-header">
                  <span className="section-num font-mono">04</span>
                  <h2 className="article-heading">Student Safety, Conduct & Zero-Tolerance Policy</h2>
                </div>
                <p>
                  Safety is our paramount priority. Drivinity maintains a strict zero-tolerance policy regarding conduct:
                </p>
                <ul className="editorial-check-list">
                  <li><strong>0.00% Blood Alcohol Concentration (BAC):</strong> NSW Learner drivers must have zero alcohol or illegal substances in their system. If an instructor suspects impairment, the lesson will be immediately terminated with full fee forfeiture.</li>
                  <li><strong>Enclosed Footwear:</strong> Suitable driving footwear (sneakers/flats) is mandatory. High heels, thongs/flip-flops, or bare feet are strictly prohibited during training.</li>
                  <li><strong>Respectful Interaction:</strong> Abuse, aggressive behavior, or refusal to comply with safety instructions will result in immediate lesson termination and permanent account suspension.</li>
                </ul>
              </article>

              {/* Section 5 */}
              <article id="logbook" className="terms-article-block">
                <div className="article-header">
                  <span className="section-num font-mono">05</span>
                  <h2 className="article-heading">3-for-1 Bonus Logbook Hours Compliance</h2>
                </div>
                <p>
                  Under Transport for NSW guidelines, structured 1-on-1 lessons with a licensed Drivinity instructor count as <strong>3 logbook hours for every 1 hour driven</strong>, up to a maximum of 10 structured driving lesson hours (30 logbook hours total). Bonus hours are recorded accurately in your official logbook upon completion of each lesson.
                </p>
              </article>

              {/* Section 6 */}
              <article id="fleet" className="terms-article-block">
                <div className="article-header">
                  <span className="section-num font-mono">06</span>
                  <h2 className="article-heading">Fleet Architecture & Commercial Insurance</h2>
                </div>
                <p>
                  All Drivinity training vehicles are modern 5-Star ANCAP rated automatic and manual cars fitted with dual-control hydraulic brake pedals and comprehensive commercial driving school insurance. In the event of an accident occurring while the student is obeying instructor directions, the insurance policy covers damages subject to policy conditions.
                </p>
              </article>

              {/* Section 7 */}
              <article id="disputes" className="terms-article-block contact-article">
                <div className="article-header">
                  <span className="section-num font-mono">07</span>
                  <h2 className="article-heading">Limitation of Liability & Governing Law</h2>
                </div>
                <p>
                  These Terms & Conditions are governed by the laws of New South Wales, Australia. For legal inquiries, refunds, or formal service reviews, please reach out to our administration team:
                </p>
                <div className="governance-contact-card">
                  <strong>Drivinity Administration & Legal Operations</strong>
                  <p>Email: <a href="mailto:legal@drivinity.com" className="email-link">legal@drivinity.com</a></p>
                  <p>Support Hotline: (02) 8000 0000</p>
                  <p>NSW Driving School Accreditation Reference: DRV-NSW-2026</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .terms-page-wrapper {
          background-color: var(--bg-warm-ivory);
          color: var(--text-primary);
        }

        .terms-grid {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 3.5rem;
          align-items: flex-start;
        }

        @media (max-width: 960px) {
          .terms-grid {
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
        .terms-articles-column {
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

        .terms-article-block {
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

        .policy-timeline-box {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.25rem;
        }

        .policy-tier {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          background: var(--bg-warm-ivory);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 1.15rem;
        }

        .tier-ico {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .tier-ico.green { color: #10B981; }
        .tier-ico.amber { color: #F59E0B; }
        .tier-ico.red { color: #EF4444; }

        .policy-tier strong {
          font-family: var(--font-display);
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .policy-tier p {
          font-size: 0.82rem;
          margin: 0.2rem 0 0 0;
        }

        .test-hire-rules {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1.25rem;
        }

        @media (max-width: 640px) {
          .test-hire-rules {
            grid-template-columns: 1fr;
          }
        }

        .rule-card {
          background: var(--bg-warm-ivory);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .rule-ico {
          color: var(--accent-champagne);
        }

        .rule-card strong {
          font-family: var(--font-display);
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .rule-card p {
          font-size: 0.8rem;
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
