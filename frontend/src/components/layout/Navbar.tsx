import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, X, Globe, UserCheck, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onOpenStudentPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenStudentPortal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'programs' | 'experience' | null>(null);
  const [activeLang, setActiveLang] = useState('EN');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
    setIsLangOpen(false);
  }, [location.pathname]);

  const changeLanguage = (langCode: string, langLabel: string) => {
    setActiveLang(langLabel);
    setIsLangOpen(false);

    const googleLangMap: Record<string, string> = {
      'EN': '/en/en',
      'HI': '/en/hi',
      'PA': '/en/pa',
      'ES': '/en/es'
    };
    const langPath = googleLangMap[langLabel] || '/en/en';
    document.cookie = `googtrans=${langPath}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=${langPath}; path=/;`;

    const selectElem = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElem) {
      selectElem.value = langCode;
      selectElem.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  const handleNavClick = (hashId?: string) => {
    if (hashId) {
      if (location.pathname !== '/') {
        navigate(`/#${hashId}`);
      } else {
        const el = document.getElementById(hashId);
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header className={`luxury-editorial-header ${isTransparent ? 'hero-transparent' : 'scrolled-glass'}`}>
        <div className="container-wide">
          <nav className="navbar-row">
            {/* LEFT: DRIVINITY Luxury Wordmark */}
            <Link to="/" className="brand-lockup" aria-label="Drivinity Driving Academy Home">
              <span className="brand-name">DRIVINITY</span>
              <span className="brand-subtitle">DRIVING ACADEMY</span>
            </Link>

            {/* CENTER: Editorial Nav Links matching Screenshot */}
            <div className="center-editorial-links hide-mobile">
              <Link 
                to="/" 
                className={`nav-editorial-link ${location.pathname === '/' ? 'active has-dot' : ''}`}
              >
                HOME
              </Link>

              {/* PROGRAMS Dropdown */}
              <div 
                className="nav-editorial-item"
                onMouseEnter={() => setActiveDropdown('programs')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to="/services" className={`nav-editorial-link ${location.pathname === '/services' ? 'active' : ''}`}>
                  PROGRAMS
                </Link>

                {activeDropdown === 'programs' && (
                  <div className="floating-editorial-menu">
                    <Link to="/driving-lessons" className="menu-entry">
                      <span className="entry-num">01</span>
                      <div className="entry-text">
                        <strong>DRIVING LESSONS</strong>
                        <span>Personalised 1-on-1 coaching & logbook hours</span>
                      </div>
                      <ArrowRight size={14} className="entry-arrow" />
                    </Link>
                    <Link to="/car-hire" className="menu-entry">
                      <span className="entry-num">02</span>
                      <div className="entry-text">
                        <strong>CAR HIRE FOR TEST</strong>
                        <span>Service NSW compliant dual-control vehicle</span>
                      </div>
                      <ArrowRight size={14} className="entry-arrow" />
                    </Link>
                    <Link to="/lesson-and-car" className="menu-entry">
                      <span className="entry-num">03</span>
                      <div className="entry-text">
                        <strong>LESSON + CAR COMBO</strong>
                        <span>Pre-test warm-up drive + test car hire</span>
                      </div>
                      <ArrowRight size={14} className="entry-arrow" />
                    </Link>
                    <div className="menu-footer-bar">
                      <Link to="/services" className="all-programs-link">
                        Compare All Packages & Pricing ($75 - $430) →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/instructors" className={`nav-editorial-link ${location.pathname === '/instructors' ? 'active' : ''}`}>
                INSTRUCTORS
              </Link>


              <button 
                className="nav-editorial-link btn-link" 
                onClick={() => handleNavClick('journal-section')}
              >
                JOURNAL
              </button>

              <Link to="/about" className={`nav-editorial-link ${location.pathname === '/about' ? 'active' : ''}`}>
                ABOUT
              </Link>

              <Link to="/contact" className={`nav-editorial-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                CONTACT
              </Link>
            </div>

            {/* RIGHT: Actions matching screenshot */}
            <div className="right-editorial-actions">
              {/* Primary Book Button: Pill with Arrow */}
              <Link to="/book" className="hero-nav-book-pill">
                <span>BOOK A LESSON</span>
                <ArrowRight size={14} />
              </Link>

              {/* Circular Hamburger Menu Trigger Button */}
              <button 
                className="hero-circle-menu-btn" 
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open Navigation Menu"
              >
                <div className="circle-menu-bars">
                  <span className="bar-line" />
                  <span className="bar-line" />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Cinematic Full-Screen Menu Experience */}
      {isMobileOpen && (
        <div className="cinematic-fullscreen-overlay">
          <div className="fullscreen-menu-container">
            {/* Top Control Bar */}
            <div className="menu-top-bar">
              <Link to="/" className="brand-lockup" onClick={() => setIsMobileOpen(false)}>
                <span className="brand-name">DRIVINITY</span>
                <span className="brand-subtitle">DRIVING ACADEMY // NSW</span>
              </Link>
              <button 
                className="menu-close-btn" 
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close menu"
              >
                <span className="close-text">CLOSE</span>
                <X size={20} />
              </button>
            </div>

            {/* Main Editorial Menu Columns */}
            <div className="menu-content-grid">
              {/* Primary Large Staggered Navigation */}
              <div className="primary-nav-column">
                <span className="col-caption">PRIMARY NAVIGATION</span>
                <nav className="staggered-links-list">
                  <Link to="/" className="large-menu-link" onClick={() => setIsMobileOpen(false)}>
                    <span className="link-idx">01</span>
                    <span className="link-title">OVERVIEW</span>
                  </Link>
                  <Link to="/services" className="large-menu-link" onClick={() => setIsMobileOpen(false)}>
                    <span className="link-idx">02</span>
                    <span className="link-title">PROGRAMS & PRICING</span>
                  </Link>
                  <Link to="/test-preparation" className="large-menu-link" onClick={() => setIsMobileOpen(false)}>
                    <span className="link-idx">03</span>
                    <span className="link-title">TEST PREPARATION</span>
                  </Link>
                  <Link to="/locations" className="large-menu-link" onClick={() => setIsMobileOpen(false)}>
                    <span className="link-idx">04</span>
                    <span className="link-title">TEST CENTRE HUBS</span>
                  </Link>
                  <Link to="/instructors" className="large-menu-link" onClick={() => setIsMobileOpen(false)}>
                    <span className="link-idx">05</span>
                    <span className="link-title">OUR INSTRUCTORS</span>
                  </Link>
                  <Link to="/about" className="large-menu-link" onClick={() => setIsMobileOpen(false)}>
                    <span className="link-idx">06</span>
                    <span className="link-title">ACADEMY PROFILE</span>
                  </Link>
                  <Link to="/blog" className="large-menu-link" onClick={() => setIsMobileOpen(false)}>
                    <span className="link-idx">07</span>
                    <span className="link-title">THE JOURNAL</span>
                  </Link>
                  <Link to="/contact" className="large-menu-link" onClick={() => setIsMobileOpen(false)}>
                    <span className="link-idx">08</span>
                    <span className="link-title">CONTACT & INQUIRIES</span>
                  </Link>
                </nav>
              </div>

              {/* Secondary Tools & Student Suite */}
              <div className="secondary-tools-column">
                <div className="tools-sub-block">
                  <span className="col-caption">STUDENT TOOLS & TELEMETRY</span>
                  <div className="sub-links-group">
                    <Link to="/track" className="sub-tool-link" onClick={() => setIsMobileOpen(false)}>
                      <span>Live GPS Route Tracking</span>
                      <ArrowRight size={13} />
                    </Link>
                    <Link to="/cockpit" className="sub-tool-link" onClick={() => setIsMobileOpen(false)}>
                      <span>360° Cockpit Simulator</span>
                      <ArrowRight size={13} />
                    </Link>
                    <Link to="/logbook" className="sub-tool-link" onClick={() => setIsMobileOpen(false)}>
                      <span>120-Hr Logbook Bonus Calculator</span>
                      <ArrowRight size={13} />
                    </Link>
                    <Link to="/quiz" className="sub-tool-link" onClick={() => setIsMobileOpen(false)}>
                      <span>Service NSW DKT Quiz</span>
                      <ArrowRight size={13} />
                    </Link>
                    <Link to="/calculator" className="sub-tool-link" onClick={() => setIsMobileOpen(false)}>
                      <span>Package Savings Calculator</span>
                      <ArrowRight size={13} />
                    </Link>
                    <Link to="/badges" className="sub-tool-link" onClick={() => setIsMobileOpen(false)}>
                      <span>Student Badges & Milestones</span>
                      <ArrowRight size={13} />
                    </Link>
                    <Link to="/referral" className="sub-tool-link" onClick={() => setIsMobileOpen(false)}>
                      <span>Referral & Rewards Program</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>

                <div className="menu-action-card">
                  <div className="action-card-header">
                    <ShieldCheck size={18} className="gold-icon" />
                    <strong>READY TO BEGIN?</strong>
                  </div>
                  <p>Book your personalized 1-on-1 driving session or dual-control test hire in Greater Sydney.</p>
                  <Button to="/book" variant="primary" size="sm" onClick={() => setIsMobileOpen(false)}>
                    SCHEDULE YOUR SESSION
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ============================================================
           LUXURY EDITORIAL HEADER STYLING
           ============================================================ */
        .luxury-editorial-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 900;
          transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      backdrop-filter 0.4s ease;
          padding: 1.35rem 0;
        }

        .luxury-editorial-header.hero-transparent {
          background-color: transparent;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .luxury-editorial-header.scrolled-glass {
          background-color: rgba(14, 14, 14, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.95rem 0;
        }

        .navbar-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        /* Brand Lockup */
        .brand-lockup {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: #FFFFFF;
        }
        .brand-name {
          font-family: 'Cinzel', 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: 0.28em;
          line-height: 1;
          color: #FFFFFF;
        }
        .brand-subtitle {
          font-family: 'Outfit', -apple-system, sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.26em;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 0.28rem;
        }

        /* Center Nav Links */
        .center-editorial-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-editorial-item {
          position: relative;
        }
        .nav-editorial-link {
          font-family: var(--font-display);
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.85);
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
          padding: 0.5rem 0;
          background: none;
          border: none;
          cursor: pointer;
        }
        .nav-editorial-link:hover {
          color: #FFFFFF;
        }
        .nav-editorial-link.active {
          color: #FFFFFF;
        }
        .nav-editorial-link.has-dot::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #FFFFFF;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
        }
        .btn-link {
          padding: 0;
          font-family: inherit;
        }

        /* Pill and Circle Action Buttons matching Screenshot */
        .hero-nav-book-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 1.65rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #FFFFFF;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-nav-book-pill:hover {
          background: #FFFFFF;
          color: #111111;
          border-color: #FFFFFF;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
        }

        .hero-circle-menu-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          padding: 0;
        }
        .hero-circle-menu-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: #FFFFFF;
          transform: scale(1.05);
        }
        .circle-menu-bars {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 14px;
        }
        .bar-line {
          display: block;
          width: 100%;
          height: 1.5px;
          background-color: #FFFFFF;
        }

        /* Floating Mega / Dropdown Menus */
        .floating-editorial-menu {
          position: absolute;
          top: calc(100% + 0.75rem);
          left: 50%;
          transform: translateX(-50%);
          width: 380px;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          box-shadow: 0 16px 40px rgba(17, 17, 17, 0.08);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          animation: menuFadeIn 0.25s var(--ease-cinematic) forwards;
          z-index: 100;
        }
        @keyframes menuFadeIn {
          from { opacity: 0; transform: translate(-50%, 8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        .menu-entry {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 0.85rem;
          border-radius: var(--radius-sm);
          text-decoration: none;
          color: var(--text-primary);
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .menu-entry:hover {
          background-color: var(--bg-warm-ivory);
          transform: translateX(4px);
        }
        .entry-num {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--accent-champagne);
          letter-spacing: 0.08em;
        }
        .entry-text {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .entry-text strong {
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-primary);
        }
        .entry-text span {
          font-size: 0.72rem;
          color: var(--text-secondary);
          margin-top: 0.15rem;
        }
        .entry-arrow {
          color: var(--accent-champagne);
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .menu-entry:hover .entry-arrow {
          opacity: 1;
          transform: translateX(2px);
        }
        .menu-footer-bar {
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.75rem;
          margin-top: 0.25rem;
          text-align: center;
        }
        .all-programs-link {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          text-decoration: underline;
        }
        .all-programs-link:hover {
          color: var(--accent-champagne);
        }

        /* Right Actions */
        .right-editorial-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .lang-selector-wrap {
          position: relative;
        }
        .lang-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          background: rgba(255, 255, 255, 0.6);
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          transition: all 0.2s ease;
        }
        .lang-pill-btn:hover {
          border-color: var(--text-primary);
          background: #FFFFFF;
        }
        .lang-popover {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          background: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 24px rgba(17, 17, 17, 0.08);
          z-index: 100;
          min-width: 140px;
        }
        .lang-popover button {
          text-align: left;
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
          color: var(--text-primary);
          border-radius: var(--radius-xs);
          transition: background 0.15s ease;
        }
        .lang-popover button:hover {
          background: var(--bg-warm-ivory);
          color: var(--accent-champagne);
        }

        .student-access-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }
        .student-access-btn:hover {
          color: var(--text-primary);
        }

        .nav-book-btn {
          font-size: 0.74rem;
          letter-spacing: 0.14em;
          padding: 0.65rem 1.45rem;
        }

        /* Minimal Menu Trigger Button */
        .minimal-menu-trigger {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.5rem 0.6rem;
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          transition: opacity 0.2s ease;
        }
        .minimal-menu-trigger:hover {
          opacity: 0.75;
        }
        .menu-lines-graphic {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 22px;
        }
        .menu-lines-graphic .line {
          display: block;
          height: 1.5px;
          background-color: var(--text-primary);
          transition: transform 0.2s ease;
        }
        .menu-lines-graphic .top-line {
          width: 22px;
        }
        .menu-lines-graphic .bottom-line {
          width: 15px;
          margin-left: auto;
        }
        .menu-label-text {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
        }

        /* ============================================================
           CINEMATIC FULL-SCREEN MENU OVERLAY (COMPACT LUXURY VIEWPORT)
           ============================================================ */
        .cinematic-fullscreen-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(8, 8, 8, 0.98);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 3rem 2rem 3rem;
          color: #FFFFFF;
          animation: fullScreenFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .cinematic-fullscreen-overlay::-webkit-scrollbar {
          display: none;
        }
        @keyframes fullScreenFadeIn {
          from { opacity: 0; transform: scale(0.99); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 768px) {
          .cinematic-fullscreen-overlay {
            padding: 1.25rem 1.25rem 2rem 1.25rem;
          }
        }

        .fullscreen-menu-container {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          min-height: 100%;
          justify-content: space-between;
        }

        .menu-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .menu-top-bar .brand-name {
          color: #FFFFFF;
        }
        .menu-close-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          color: #FFFFFF;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          transition: color 0.2s ease;
          background: none;
          border: none;
          cursor: pointer;
        }
        .menu-close-btn:hover {
          color: var(--accent-champagne);
        }

        .menu-content-grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 3.5rem;
          padding: 1.5rem 0 1rem 0;
          flex: 1;
          align-items: start;
        }
        @media (max-width: 900px) {
          .menu-content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 1.25rem 0;
          }
        }

        .col-caption {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: var(--accent-champagne);
          display: block;
          margin-bottom: 0.85rem;
          text-transform: uppercase;
        }

        .staggered-links-list {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .large-menu-link {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          text-decoration: none;
          color: #E2DFD8;
          transition: all 0.2s ease;
          padding: 0.22rem 0;
        }
        .large-menu-link:hover {
          color: #FFFFFF;
          transform: translateX(6px);
        }
        .large-menu-link .link-idx {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-champagne);
          letter-spacing: 0.1em;
          min-width: 22px;
        }
        .large-menu-link .link-title {
          font-family: 'Cinzel', 'Outfit', sans-serif;
          font-size: clamp(1.05rem, 1.75vw, 1.4rem);
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: color 0.2s ease;
        }
        .large-menu-link:hover .link-title {
          color: var(--accent-champagne);
        }

        .sub-links-group {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          margin-bottom: 1.25rem;
        }
        .sub-tool-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.38rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          color: #CBD5E1;
          font-size: 0.78rem;
          font-family: var(--font-display);
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .sub-tool-link:hover {
          color: #FFFFFF;
          padding-left: 6px;
        }
        .sub-tool-link:hover span {
          color: var(--accent-champagne);
        }

        .menu-action-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-md);
          padding: 1.15rem 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .action-card-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          color: #FFFFFF;
        }
        .gold-icon {
          color: var(--accent-champagne);
        }
        .menu-action-card p {
          font-size: 0.75rem;
          color: #94A3B8;
          line-height: 1.45;
          margin: 0;
        }
      `}</style>
    </>
  );
};
