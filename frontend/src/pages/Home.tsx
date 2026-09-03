import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Car, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Star 
} from 'lucide-react';
import { 
  SERVICES, 
  AUDIENCE_TYPES, 
  TEST_LOCATIONS, 
  FAQS, 
  BLOG_ARTICLES, 
  BRAND_INFO, 
  WHY_CHOOSE_US 
} from '../data/content';
import { Button } from '../components/ui/Button';
import { BlogCard } from '../components/ui/BlogCard';
import { BlogArticle } from '../types';

// Cinematic & Showcase Components
import { MovingCarHero } from '../components/cinematic/MovingCarHero';
import { ScrollingCarJourney } from '../components/cinematic/ScrollingCarJourney';
import { EditorialTestimonials } from '../components/cinematic/EditorialTestimonials';
import { AbstractMapLocations } from '../components/cinematic/AbstractMapLocations';
import { CinematicFinalCTA } from '../components/cinematic/CinematicFinalCTA';
import { RunningCarVisual } from '../components/cinematic/RunningCarVisual';

interface HomeProps {
  onSelectArticle?: (article: BlogArticle) => void;
  onHeroReady?: () => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectArticle, onHeroReady }) => {
  const exactServicesList = [
    {
      id: 'driving-lessons',
      num: '01',
      title: 'DRIVING LESSONS',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
      link: '/driving-lessons',
      tag: 'Personalised 1-on-1'
    },
    {
      id: 'car-hire',
      num: '02',
      title: 'CAR HIRE',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      link: '/car-hire',
      tag: 'Test-Ready Dual-Control'
    },
    {
      id: 'lesson-and-car',
      num: '03',
      title: 'LESSON + CAR',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
      link: '/lesson-and-car',
      tag: 'Warm-up + Test Package'
    }
  ];

  return (
    <div className="drivinity-exact-homepage">
      {/* ============================================================
          1. EXACT HERO SECTION FROM SCREENSHOT
          ============================================================ */}
      <MovingCarHero onHeroReady={onHeroReady} />

      {/* ============================================================
          2. EXACT "OUR SERVICES — EVERYTHING YOU NEED TO GET ON THE ROAD"
          ============================================================ */}
      <section id="services-section" className="exact-services-section section-padding">
        <div className="container-wide">
          <div className="services-exact-header-row">
            <div className="header-text-block">
              <div className="yellow-eyebrow-line">
                <span className="eyebrow-text">OUR SERVICES</span>
                <span className="eyebrow-dash">—</span>
              </div>
              <h2 className="services-exact-headline">
                EVERYTHING YOU NEED <br className="hide-mobile" />
                TO GET ON THE ROAD
              </h2>
            </div>
          </div>

          {/* Exact 3 Large Rounded Image Cards */}
          <div className="exact-services-cards-grid">
            {exactServicesList.map((srv) => (
              <Link key={srv.id} to={srv.link} className="exact-service-card-item">
                <div className="card-image-box">
                  <img src={srv.image} alt={srv.title} className="card-photo" loading="lazy" />
                  <div className="card-dark-gradient-overlay" />
                  
                  {/* Exact Top Number Badge (01, 02, 03) */}
                  <div className="top-num-badge">
                    <span>{srv.num}</span>
                  </div>

                  {/* Bottom Text Title */}
                  <div className="bottom-card-info">
                    <h3 className="card-bold-title">{srv.title}</h3>
                    <div className="card-hover-arrow">
                      <span>Explore</span>
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="services-all-cta-bar">
            <Link to="/services" className="compare-packages-link">
              <span>View All Package Inclusions & Pricing Breakdown ($XX)</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. SCROLLING ROADWAY MILESTONES (LEARN ➔ PASS)
          ============================================================ */}
      <ScrollingCarJourney />

      {/* ============================================================
          4. EDITORIAL TEST PREPARATION & MOCK AUDIT
          ============================================================ */}
      <section className="editorial-testprep-section section-padding">
        <div className="container">
          <div className="testprep-editorial-grid aura-card">
            <div className="testprep-text-side">
              <div className="yellow-eyebrow-line">
                <span className="eyebrow-text">SERVICE NSW AUDIT</span>
                <span className="eyebrow-dash">—</span>
              </div>
              <h2 className="editorial-title">
                TEST DAY <br />
                SHOULDN’T FEEL <br />
                LIKE A TEST.
              </h2>
              <p className="editorial-desc">
                We conduct mock tests on authentic Service NSW practical test routes with immediate feedback on the scoring criteria examiners evaluate.
              </p>

              <div className="testprep-check-chips">
                <div className="chip-item"><CheckCircle2 size={16} className="chk-gold" /> Reverse Parallel Parking</div>
                <div className="chip-item"><CheckCircle2 size={16} className="chk-gold" /> Mirror & Blind Spot Head Checks</div>
                <div className="chip-item"><CheckCircle2 size={16} className="chk-gold" /> Multi-lane Roundabouts</div>
                <div className="chip-item"><CheckCircle2 size={16} className="chk-gold" /> Complex Right-turn Intersections</div>
                <div className="chip-item"><CheckCircle2 size={16} className="chk-gold" /> Safe Road Positioning & Buffers</div>
                <div className="chip-item"><CheckCircle2 size={16} className="chk-gold" /> Active 40 km/h School Zone Speed</div>
              </div>

              <Button to="/test-preparation" variant="dark" size="lg" icon={<ArrowRight size={18} />}>
                VIEW TEST PREPARATION DETAILS
              </Button>
            </div>

            <div className="testprep-visual-side">
              <RunningCarVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. WHY DRIVINITY (LARGE NUMBERS 01 - 04)
          ============================================================ */}
      <section className="why-drivinity-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <div className="yellow-eyebrow-line center-eyebrow">
              <span className="eyebrow-text">WHY CHOOSE US</span>
              <span className="eyebrow-dash">—</span>
            </div>
            <h2 className="section-title">CONFIDENCE FIRST ON NSW ROADS.</h2>
            <p className="section-subtitle">
              Structured instruction designed to build calm instincts, eliminate test anxiety, and ensure you are genuinely ready for Australian traffic.
            </p>
          </div>

          <div className="grid-4 why-pillars-grid">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} className="why-pillar-card aura-card">
                <span className="pillar-large-num">0{idx + 1}</span>
                <h3 className="pillar-title">{item.title}</h3>
                <p className="pillar-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          6. REVIEWS ("DRIVEN BY OUR STUDENTS.")
          ============================================================ */}
      <EditorialTestimonials />

      {/* ============================================================
          7. LOCATIONS (ABSTRACT SCHEMATIC MAP)
          ============================================================ */}
      <AbstractMapLocations />

      {/* ============================================================
          8. BLOG & ARTICLES ("ON THE ROAD.")
          ============================================================ */}
      <section className="drivinity-blog-section section-padding">
        <div className="container">
          <div className="services-exact-header-row">
            <div>
              <div className="yellow-eyebrow-line">
                <span className="eyebrow-text">EDITORIAL MAGAZINE</span>
                <span className="eyebrow-dash">—</span>
              </div>
              <h2 className="services-exact-headline">ON THE ROAD</h2>
            </div>
            <Button to="/blog" variant="outline" className="hide-mobile">
              VIEW ALL ARTICLES
            </Button>
          </div>

          <div className="grid-3">
            {BLOG_ARTICLES.slice(0, 3).map((article) => (
              <BlogCard key={article.id} article={article} onSelect={onSelectArticle} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          9. FINAL HORIZON CTA
          ============================================================ */}
      <CinematicFinalCTA />

      <style>{`
        .drivinity-exact-homepage {
          background-color: var(--bg-warm-white);
          overflow-x: hidden;
        }

        /* ============================================================
           EXACT SERVICES SECTION STYLING
           ============================================================ */
        .exact-services-section {
          background-color: #FFFFFF;
          border-bottom: 1px solid var(--border-light);
        }
        @media (max-width: 768px) {
          .exact-services-section {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
        }
        .services-exact-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .services-exact-header-row {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 1.75rem;
          }
        }
        .yellow-eyebrow-line {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .center-eyebrow {
          justify-content: center;
        }
        .eyebrow-text {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(0.725rem, 2.5vw, 0.85rem);
          letter-spacing: 0.16em;
          color: var(--accent-gold);
        }
        .eyebrow-dash {
          color: var(--accent-gold);
          font-weight: 900;
        }
        .services-exact-headline {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 4.8vw, 2.5rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: #07131D;
        }

        /* Carousel Controls */
        .carousel-chevrons-wrap {
          display: flex;
          gap: 0.5rem;
        }
        .chevron-circle-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #07131D;
          transition: all 0.2s ease;
        }
        .chevron-circle-btn:hover {
          background: var(--accent-gold);
          border-color: var(--accent-gold);
          color: #07131D;
          transform: translateY(-2px);
        }

        /* Exact 3 Cards Grid */
        .exact-services-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 960px) {
          .exact-services-cards-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }
        .exact-service-card-item {
          display: block;
          text-decoration: none;
        }
        .card-image-box {
          position: relative;
          width: 100%;
          height: 300px;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(10, 20, 32, 0.08);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }
        @media (max-width: 640px) {
          .card-image-box {
            height: 240px;
          }
        }
        .exact-service-card-item:hover .card-image-box {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(10, 20, 32, 0.16);
        }
        .card-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .exact-service-card-item:hover .card-photo {
          transform: scale(1.06);
        }
        .card-dark-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.25) 40%, rgba(10, 20, 32, 0.92) 100%);
        }

        /* Top 01 Number Badge */
        .top-num-badge {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          z-index: 5;
        }
        .top-num-badge span {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 0.05em;
        }

        /* Bottom Info */
        .bottom-card-info {
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
          right: 1.25rem;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .card-bold-title {
          font-family: var(--font-display);
          font-size: clamp(1.15rem, 3.5vw, 1.35rem);
          font-weight: 900;
          letter-spacing: 0.04em;
          color: #FFFFFF;
          line-height: 1.1;
        }
        .card-hover-arrow {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-gold);
          opacity: 0.9;
          transition: transform 0.2s ease;
        }
        .exact-service-card-item:hover .card-hover-arrow {
          transform: translateX(4px);
          opacity: 1;
        }

        .services-all-cta-bar {
          margin-top: 2.5rem;
          display: flex;
          justify-content: center;
          text-align: center;
        }
        .compare-packages-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.925rem;
          color: var(--drivinity-navy);
          text-decoration: underline;
          transition: color 0.2s;
        }
        .compare-packages-link:hover {
          color: #B28F00;
        }

        /* Editorial Test Prep */
        .editorial-testprep-section {
          background-color: var(--bg-warm-white);
        }
        @media (max-width: 768px) {
          .editorial-testprep-section {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
        }
        .testprep-editorial-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          padding: 0;
          overflow: hidden;
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          align-items: center;
        }
        @media (max-width: 960px) {
          .testprep-editorial-grid {
            grid-template-columns: 1fr;
            border-radius: var(--radius-lg);
          }
        }
        .testprep-text-side {
          padding: 4rem 3.5rem;
        }
        @media (max-width: 768px) {
          .testprep-text-side {
            padding: 2.25rem 1.25rem;
          }
        }
        .editorial-title {
          font-size: clamp(1.85rem, 5.5vw, 3.4rem);
          font-weight: 900;
          letter-spacing: -0.035em;
          color: var(--drivinity-navy);
          margin-bottom: 1.15rem;
          line-height: 1.05;
        }
        .editorial-desc {
          font-size: 0.975rem;
          color: var(--text-body);
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }
        .testprep-check-chips {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 600px) {
          .testprep-check-chips {
            grid-template-columns: 1fr;
            gap: 0.55rem;
          }
        }
        .chip-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.825rem;
          font-weight: 700;
          color: var(--drivinity-navy);
          background: var(--bg-warm-white);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-md);
        }
        .chk-gold {
          color: #D4A700;
          flex-shrink: 0;
        }
        .testprep-visual-side {
          height: 100%;
          min-height: 440px;
          background: #EAE8DE;
        }
        @media (max-width: 960px) {
          .testprep-visual-side {
            min-height: 280px;
          }
        }
        @media (max-width: 640px) {
          .testprep-text-side .btn {
            width: 100%;
            justify-content: center;
          }
        }

        /* Why Pillars */
        .why-drivinity-section {
          background-color: #FFFFFF;
          border-top: 1px solid var(--border-light);
        }
        @media (max-width: 768px) {
          .why-drivinity-section {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
        }
        .section-title {
          font-size: clamp(1.85rem, 5vw, 3rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: var(--drivinity-navy);
          line-height: 1.05;
          margin-bottom: 0.75rem;
        }
        .section-subtitle {
          font-size: clamp(0.925rem, 2.5vw, 1.05rem);
          color: var(--text-body);
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.55;
        }
        .why-pillars-grid {
          margin-top: 2.5rem;
        }
        .why-pillar-card {
          background: var(--bg-warm-white);
          border-radius: var(--radius-lg);
          padding: 2.25rem 1.75rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.3s ease;
        }
        @media (max-width: 640px) {
          .why-pillar-card {
            padding: 1.75rem 1.25rem;
          }
        }
        .why-pillar-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-gold);
        }
        .pillar-large-num {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 2.2rem;
          color: var(--accent-gold);
          line-height: 1;
          margin-bottom: 1rem;
        }
        .pillar-title {
          font-size: 1.1rem;
          font-weight: 900;
          letter-spacing: -0.01em;
          margin-bottom: 0.5rem;
          color: var(--drivinity-navy);
        }
        .pillar-desc {
          font-size: 0.885rem;
          color: var(--text-body);
          line-height: 1.55;
        }

        .drivinity-blog-section {
          background-color: #FFFFFF;
          border-top: 1px solid var(--border-light);
        }
        @media (max-width: 768px) {
          .drivinity-blog-section {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
        }
      `}</style>
    </div>
  );
};
