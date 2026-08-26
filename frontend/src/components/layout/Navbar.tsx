import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, Menu, X, UserCheck, Globe, Moon, Sun, Navigation } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onOpenStudentPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenStudentPortal }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLang, setActiveLang] = useState('EN');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsServicesOpen(false);
    setIsToolsOpen(false);
    setIsRewardsOpen(false);
    setIsLangOpen(false);
  }, [location.pathname]);

  const changeLanguage = (langCode: string, langLabel: string) => {
    setActiveLang(langLabel);
    setIsLangOpen(false);
    
    // Set cookie for Google Translate
    const googleLangMap: Record<string, string> = {
      'EN': '/en/en',
      'HI': '/en/hi',
      'PA': '/en/pa',
      'ES': '/en/es'
    };
    const langPath = googleLangMap[langLabel] || '/en/en';
    document.cookie = `googtrans=${langPath}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=${langPath}; path=/;`;
    
    // Trigger Google Translate Select Option
    const selectElem = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElem) {
      selectElem.value = langCode;
      selectElem.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <header className={`canguruber-exact-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container-wide">
          <nav className="header-nav-row">
            {/* Exact Brand Logo from Screenshot */}
            <Link to="/" className="brand-logo-exact">
              <div className="logo-text-wrap">
                <span className="logo-main">
                  CANGURU<span className="logo-highlight">BER</span>
                </span>
                <span className="logo-sub">DRIVING SCHOOL</span>
              </div>
            </Link>

            {/* Clean 4-Category Header Navigation Tabs */}
            <div className="center-nav-links hide-mobile">
              {/* TAB 1: SERVICES */}
              <div 
                className="nav-item-dropdown"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="nav-link-btn" onClick={() => setIsServicesOpen(!isServicesOpen)}>
                  <span>SERVICES</span>
                  <ChevronDown size={14} className={`dropdown-icon ${isServicesOpen ? 'rotate' : ''}`} />
                </button>

                {isServicesOpen && (
                  <div className="services-dropdown-menu">
                    <Link to="/driving-lessons" className="dropdown-link">
                      <strong>01. Driving Lessons</strong>
                      <span>Personalised 1-on-1 coaching</span>
                    </Link>
                    <Link to="/car-hire" className="dropdown-link">
                      <strong>02. Car Hire for Test</strong>
                      <span>Service NSW test-ready vehicle</span>
                    </Link>
                    <Link to="/lesson-and-car" className="dropdown-link">
                      <strong>03. Lesson + Car Combo</strong>
                      <span>Warm-up lesson + test car</span>
                    </Link>
                    <Link to="/services" className="dropdown-link view-all">
                      <span>View All Packages & Pricing →</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* TAB 2: STUDENT TOOLS */}
              <div 
                className="nav-item-dropdown"
                onMouseEnter={() => setIsToolsOpen(true)}
                onMouseLeave={() => setIsToolsOpen(false)}
              >
                <button className="nav-link-btn" onClick={() => setIsToolsOpen(!isToolsOpen)}>
                  <span>STUDENT TOOLS</span>
                  <ChevronDown size={14} className={`dropdown-icon ${isToolsOpen ? 'rotate' : ''}`} />
                </button>

                {isToolsOpen && (
                  <div className="services-dropdown-menu">
                    <Link to="/track" className="dropdown-link">
                      <strong>🚗 Live GPS Map Tracking</strong>
                      <span>Real-time lesson route & speed meter</span>
                    </Link>
                    <Link to="/cockpit" className="dropdown-link">
                      <strong>📹 360° Cockpit Simulator</strong>
                      <span>Explore dual-control Toyota Corolla interior</span>
                    </Link>
                    <Link to="/schedule" className="dropdown-link">
                      <strong>🗓️ Live Dispatch Schedule</strong>
                      <span>Pick instructor & open time slots</span>
                    </Link>
                    <Link to="/logbook" className="dropdown-link">
                      <strong>📊 120-Hr Logbook Calculator</strong>
                      <span>NSW 3-for-1 bonus hours calculator</span>
                    </Link>
                    <Link to="/quiz" className="dropdown-link">
                      <strong>📝 Service NSW DKT Practice Quiz</strong>
                      <span>Interactive driver knowledge test</span>
                    </Link>
                    <Link to="/badges" className="dropdown-link">
                      <strong>🏆 Milestone Badges</strong>
                      <span>Student driving progress achievements</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* TAB 3: SAVINGS & REWARDS */}
              <div 
                className="nav-item-dropdown"
                onMouseEnter={() => setIsRewardsOpen(true)}
                onMouseLeave={() => setIsRewardsOpen(false)}
              >
                <button className="nav-link-btn" onClick={() => setIsRewardsOpen(!isRewardsOpen)}>
                  <span>REWARDS & SAVINGS</span>
                  <ChevronDown size={14} className={`dropdown-icon ${isRewardsOpen ? 'rotate' : ''}`} />
                </button>

                {isRewardsOpen && (
                  <div className="services-dropdown-menu">
                    <Link to="/calculator" className="dropdown-link">
                      <strong>💰 Block Package Calculator</strong>
                      <span>Compare package savings up to $150</span>
                    </Link>
                    <Link to="/referral" className="dropdown-link">
                      <strong>🎁 Refer a Friend Program</strong>
                      <span>Give $20 OFF, Get $20 Cashback</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* TAB 4: ABOUT & INSTRUCTORS */}
              <Link to="/instructors" className={`header-link ${location.pathname === '/instructors' ? 'active' : ''}`}>
                INSTRUCTORS
              </Link>
              <Link to="/about" className={`header-link ${location.pathname === '/about' ? 'active' : ''}`}>
                ABOUT
              </Link>
            </div>

            {/* Right Action Controls */}
            <div className="header-right-actions">
              {/* Language Selector Dropdown */}
              <div className="lang-dropdown-wrap">
                <button className="lang-toggle-btn" onClick={() => setIsLangOpen(!isLangOpen)}>
                  <Globe size={15} />
                  <span>{activeLang}</span>
                </button>
                {isLangOpen && (
                  <div className="lang-menu">
                    <button onClick={() => changeLanguage('en', 'EN')}>🇬🇧 English (EN)</button>
                    <button onClick={() => changeLanguage('hi', 'HI')}>🇮🇳 Hindi (HI)</button>
                    <button onClick={() => changeLanguage('pa', 'PA')}>🇮🇳 Punjabi (PA)</button>
                    <button onClick={() => changeLanguage('es', 'ES')}>🇪🇸 Spanish (ES)</button>
                  </div>
                )}
              </div>

              <Button to="/book" variant="yellow" size="sm" icon={<ArrowRight size={14} />} className="header-book-btn">
                <span className="btn-text-full">BOOK A LESSON</span>
                <span className="btn-text-short">BOOK</span>
              </Button>

              {/* Dark Circular Menu Toggle */}
              <button 
                className="dark-circle-menu-btn" 
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle navigation menu"
              >
                {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Slide-out Menu Drawer */}
      {isMobileOpen && (
        <div className="header-drawer-overlay" onClick={() => setIsMobileOpen(false)}>
          <div className="header-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top">
              <Link to="/" className="brand-logo-exact" onClick={() => setIsMobileOpen(false)}>
                <div className="logo-text-wrap">
                  <span className="logo-main">
                    CANGURU<span className="logo-highlight">BER</span>
                  </span>
                  <span className="logo-sub">DRIVING SCHOOL</span>
                </div>
              </Link>
              <button className="close-btn" onClick={() => setIsMobileOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>

            <div className="drawer-links-list">
              <Link to="/services" className="drawer-nav-item" onClick={() => setIsMobileOpen(false)}>
                <span>SERVICES</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/driving-lessons" className="drawer-sub-item" onClick={() => setIsMobileOpen(false)}>
                — Driving Lessons
              </Link>
              <Link to="/car-hire" className="drawer-sub-item" onClick={() => setIsMobileOpen(false)}>
                — Car Hire for Test
              </Link>
              <Link to="/lesson-and-car" className="drawer-sub-item" onClick={() => setIsMobileOpen(false)}>
                — Lesson + Car Package
              </Link>
              <Link to="/test-preparation" className="drawer-sub-item" onClick={() => setIsMobileOpen(false)}>
                — Test Preparation
              </Link>
              <Link to="/about" className="drawer-nav-item" onClick={() => setIsMobileOpen(false)}>
                <span>ABOUT</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/faq" className="drawer-nav-item" onClick={() => setIsMobileOpen(false)}>
                <span>FAQ</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/blog" className="drawer-nav-item" onClick={() => setIsMobileOpen(false)}>
                <span>BLOG & ARTICLES</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="drawer-nav-item" onClick={() => setIsMobileOpen(false)}>
                <span>CONTACT</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="drawer-bottom-actions">
              <Button to="/book" variant="yellow" size="lg" className="w-full" onClick={() => setIsMobileOpen(false)}>
                BOOK A LESSON
              </Button>
              {onOpenStudentPortal && (
                <button 
                  onClick={() => { setIsMobileOpen(false); onOpenStudentPortal(); }}
                  className="drawer-portal-btn"
                >
                  <UserCheck size={16} />
                  <span>Student Portal Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .canguruber-exact-header {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          background: #FFFFFF;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }
        .canguruber-exact-header.is-scrolled {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        .header-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          gap: 1rem;
        }
        @media (max-width: 640px) {
          .header-nav-row {
            height: 58px;
          }
        }

        /* Exact Logo */
        .brand-logo-exact {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }
        .logo-text-wrap {
          display: flex;
          flex-direction: column;
        }
        .logo-main {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(1.15rem, 4vw, 1.35rem);
          letter-spacing: 0.02em;
          color: #07131D;
          line-height: 1;
        }
        .logo-highlight {
          color: var(--accent-gold);
        }
        .logo-sub {
          font-family: var(--font-display);
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #07131D;
          margin-top: 2px;
        }

        /* Center Nav Links */
        .center-nav-links {
          display: flex;
          align-items: center;
          gap: 2.25rem;
        }
        .header-link, .nav-link-btn {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.825rem;
          letter-spacing: 0.06em;
          color: #07131D;
          transition: color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.5rem 0;
          background: transparent;
        }
        .header-link:hover, .nav-link-btn:hover {
          color: var(--accent-gold);
        }
        .header-link.active {
          color: #000000;
          font-weight: 800;
        }
        .dropdown-icon {
          transition: transform 0.2s ease;
        }
        .dropdown-icon.rotate {
          transform: rotate(180deg);
        }

        /* Dropdown */
        .nav-item-dropdown {
          position: relative;
        }
        .services-dropdown-menu {
          position: absolute;
          top: 100%;
          left: -20px;
          width: 280px;
          background: #FFFFFF;
          border-radius: var(--radius-md);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
          border: 1px solid var(--border-light);
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          animation: dropFade 0.2s ease;
        }
        @keyframes dropFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dropdown-link {
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          transition: background 0.15s ease;
        }
        .dropdown-link:hover {
          background: var(--bg-subtle);
        }
        .dropdown-link strong {
          font-family: var(--font-display);
          font-size: 0.85rem;
          color: var(--canguruber-navy);
        }
        .dropdown-link span {
          font-size: 0.75rem;
          color: var(--text-body);
        }
        .dropdown-link.view-all {
          border-top: 1px solid var(--border-light);
          margin-top: 0.25rem;
          padding-top: 0.65rem;
        }
        .dropdown-link.view-all span {
          font-weight: 800;
          color: var(--canguruber-navy);
        }

        /* Language & Theme Controls */
        .lang-dropdown-wrap {
          position: relative;
        }
        .lang-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          background: #FAFAF8;
          font-size: 0.75rem;
          font-weight: 800;
          color: #07131D;
          cursor: pointer;
        }
        .lang-menu {
          position: absolute;
          top: 100%;
          right: 0;
          width: 140px;
          background: #FFFFFF;
          border-radius: var(--radius-md);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
          border: 1px solid var(--border-light);
          padding: 0.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          z-index: 100;
        }
        .lang-menu button {
          padding: 0.4rem 0.65rem;
          font-size: 0.775rem;
          font-weight: 700;
          color: #07131D;
          border: none;
          background: transparent;
          text-align: left;
          border-radius: 4px;
          cursor: pointer;
        }
        .lang-menu button:hover {
          background: #FAFAF8;
        }

        .theme-toggle-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--border-light);
          background: #FAFAF8;
          color: #07131D;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .theme-toggle-btn:hover {
          background: var(--accent-gold);
          border-color: var(--accent-gold);
        }

        /* Right Actions */
        .header-right-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }
        .btn-text-short {
          display: none;
        }
        @media (max-width: 640px) {
          .btn-text-full {
            display: none;
          }
          .btn-text-short {
            display: inline;
          }
          .header-book-btn {
            padding: 0.45rem 0.85rem !important;
            font-size: 0.75rem !important;
          }
        }
        .dark-circle-menu-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #07131D;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, transform 0.2s ease;
          flex-shrink: 0;
        }
        .dark-circle-menu-btn:hover {
          background: #1E2D3D;
          transform: scale(1.05);
        }
        @media (max-width: 640px) {
          .dark-circle-menu-btn {
            width: 36px;
            height: 36px;
          }
        }

        /* Mobile Drawer */
        .header-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 20, 32, 0.75);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          justify-content: flex-end;
          animation: drawerBackdrop 0.25s ease;
        }
        @keyframes drawerBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .header-drawer-panel {
          width: 85%;
          max-width: 380px;
          background: #FFFFFF;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1.25rem;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.3);
          overflow-y: auto;
          animation: slideDrawer 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideDrawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .drawer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-light);
        }
        .close-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--bg-warm-white);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #07131D;
          transition: background 0.2s;
        }
        .close-btn:hover {
          background: var(--border-light);
        }
        .drawer-links-list {
          display: flex;
          flex-direction: column;
          padding: 1.25rem 0;
          flex: 1;
          gap: 0.35rem;
        }
        .drawer-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0.5rem;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.05rem;
          color: #07131D;
          border-bottom: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
        }
        .drawer-nav-item:hover {
          background: var(--bg-warm-white);
        }
        .drawer-sub-item {
          padding: 0.4rem 0.5rem 0.4rem 1.25rem;
          font-size: 0.875rem;
          color: var(--text-muted-dark);
          font-weight: 600;
          transition: color 0.15s;
        }
        .drawer-sub-item:hover {
          color: #07131D;
        }
        .drawer-bottom-actions {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
          margin-top: auto;
        }
        .drawer-portal-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: var(--bg-warm-white);
          border-radius: var(--radius-full);
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.825rem;
          color: #07131D;
        }
        .w-full {
          width: 100%;
        }
      `}</style>
    </>
  );
};
