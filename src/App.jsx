import { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import './App.css';
import mdaLogo from './assets/mdalogo.png';

// Import Page Components
import Home from './pages/Home';
import Story from './pages/Story';
import Academy from './pages/Academy';
import Challenge from './pages/Challenge';
import Assessment from './pages/Assessment';
import Boost from './pages/Boost';
import Checkout from './pages/Checkout';
import ChallengeCheckout from './pages/ChallengeCheckout';

// Import Translations
import { TRANSLATIONS } from './constants/translations';

function App() {
  // View Routing State
  const [currentView, setCurrentView] = useState('home');

  // Language State
  const [language, setLanguage] = useState('es');

  // Theme State
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Mobile Menu State
  const [menuOpen, setMenuOpen] = useState(false);

  // Desktop "Programs" dropdown
  const [programsOpen, setProgramsOpen] = useState(false);
  const programsRef = useRef(null);

  // Condensed navbar once the page is scrolled
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the dropdown on outside click, and any menu on Escape
  useEffect(() => {
    const onClickAway = (e) => {
      if (programsRef.current && !programsRef.current.contains(e.target)) setProgramsOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setProgramsOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickAway);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickAway);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Program tier selected from the Academy page, consumed by Checkout
  const [selectedTier, setSelectedTier] = useState('mindset');

  // Checkout Form shared state (pre-filled by Academy application form)
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    cardNum: '',
    cardExp: '',
    cardCvc: '',
    paymentMethod: 'card'
  });

  const navigateToView = (view) => {
    setCurrentView(view);
    setMenuOpen(false);
    setProgramsOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="app-container">
      {/* Header / Navbar */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <button className="nav-home-brand" onClick={() => navigateToView('home')}>
          <span className="brand-mark" aria-hidden="true">B</span>
          <span className="brand-word">{t.brand}</span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="nav-links-desktop" aria-label={t.navMenuLabel}>
          <button onClick={() => navigateToView('home')} className={`nav-link-btn ${currentView === 'home' ? 'active' : ''}`}>{language === 'es' ? 'Inicio' : 'Home'}</button>
          <button onClick={() => navigateToView('story')} className={`nav-link-btn ${currentView === 'story' ? 'active' : ''}`}>{t.storyTab}</button>

          {/* Programs dropdown groups the two program pages */}
          <div className="nav-dropdown" ref={programsRef}>
            <button
              className={`nav-link-btn nav-dropdown-trigger ${['challenge', 'academy'].includes(currentView) ? 'active' : ''}`}
              onClick={() => setProgramsOpen(!programsOpen)}
              aria-expanded={programsOpen}
              aria-haspopup="true"
            >
              {t.navProgramsMenu}
              <ChevronDown size={14} className={`nav-chevron ${programsOpen ? 'open' : ''}`} />
            </button>

            <div className={`nav-dropdown-menu ${programsOpen ? 'open' : ''}`}>
              <button
                onClick={() => navigateToView('challenge')}
                className={`nav-dropdown-item ${currentView === 'challenge' ? 'active' : ''}`}
              >
                <span className="nav-dropdown-item-title">{t.challengeTab}</span>
                <span className="nav-dropdown-item-desc">{t.navChallengeBlurb}</span>
              </button>
              <button
                onClick={() => navigateToView('academy')}
                className={`nav-dropdown-item ${currentView === 'academy' ? 'active' : ''}`}
              >
                <span className="nav-dropdown-item-title">{t.academyTab}</span>
                <span className="nav-dropdown-item-desc">{t.navAcademyBlurb}</span>
              </button>
            </div>
          </div>

          <button onClick={() => navigateToView('assessment')} className={`nav-link-btn ${currentView === 'assessment' ? 'active' : ''}`}>{t.assessmentTab}</button>
          <button onClick={() => navigateToView('boost')} className={`nav-link-btn ${currentView === 'boost' ? 'active' : ''}`}>{t.boostTab}</button>
        </nav>

        {/* Right side: CTA + theme + language + hamburger */}
        <div className="nav-right">
          <div className="lang-toggle desktop-only">
            <button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button
              className={`lang-btn ${language === 'es' ? 'active' : ''}`}
              onClick={() => setLanguage('es')}
            >
              ES
            </button>
          </div>

          <button
            className="theme-toggle-btn desktop-only"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => navigateToView('challenge')}
            className={`cta-nav-btn desktop-only ${currentView === 'challenge-checkout' ? 'active' : ''}`}
          >
            {language === 'es' ? 'Inscr\u00edbete' : 'Enroll Now'}
          </button>

          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t.navMenuLabel}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-menu-backdrop ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
        <nav className="mobile-menu-nav" aria-label={t.navMenuLabel}>
          <span className="mobile-nav-section">{t.navSectionExplore}</span>
          <button onClick={() => navigateToView('home')} className={`mobile-nav-link ${currentView === 'home' ? 'active' : ''}`}>{language === 'es' ? 'Inicio' : 'Home'}</button>
          <button onClick={() => navigateToView('story')} className={`mobile-nav-link ${currentView === 'story' ? 'active' : ''}`}>{t.storyTab}</button>
          <button onClick={() => navigateToView('assessment')} className={`mobile-nav-link ${currentView === 'assessment' ? 'active' : ''}`}>{t.assessmentTab}</button>
          <button onClick={() => navigateToView('boost')} className={`mobile-nav-link ${currentView === 'boost' ? 'active' : ''}`}>{t.boostTab}</button>

          <span className="mobile-nav-section">{t.navSectionPrograms}</span>
          <button onClick={() => navigateToView('challenge')} className={`mobile-nav-link ${currentView === 'challenge' ? 'active' : ''}`}>{t.challengeTab}</button>
          <button onClick={() => navigateToView('academy')} className={`mobile-nav-link ${currentView === 'academy' ? 'active' : ''}`}>{t.academyTab}</button>

          <button onClick={() => navigateToView('challenge')} className="mobile-nav-cta">
            {language === 'es' ? 'Inscr\u00edbete' : 'Enroll Now'}
          </button>

          <div className="mobile-nav-controls">
            <div className="lang-toggle">
              <button
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <button
                className={`lang-btn ${language === 'es' ? 'active' : ''}`}
                onClick={() => setLanguage('es')}
              >
                ES
              </button>
            </div>

            <button
              className="theme-toggle-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content Sections based on view */}
      <main className="page-transition" key={currentView}>
        {currentView === 'home' && <Home navigateToView={navigateToView} language={language} />}
        {currentView === 'story' && <Story navigateToView={navigateToView} language={language} />}
        {currentView === 'challenge' && <Challenge navigateToView={navigateToView} language={language} />}
        {currentView === 'challenge-checkout' && (
          <ChallengeCheckout
            navigateToView={navigateToView}
            checkoutForm={checkoutForm}
            setCheckoutForm={setCheckoutForm}
            language={language}
          />
        )}
        {currentView === 'academy' && (
          <Academy
            navigateToView={navigateToView}
            language={language}
            setSelectedTier={setSelectedTier}
          />
        )}
        {currentView === 'assessment' && <Assessment navigateToView={navigateToView} language={language} />}
        {currentView === 'boost' && <Boost navigateToView={navigateToView} language={language} />}
        {currentView === 'checkout' && (
          <Checkout
            navigateToView={navigateToView}
            checkoutForm={checkoutForm}
            setCheckoutForm={setCheckoutForm}
            language={language}
            selectedTier={selectedTier}
            setSelectedTier={setSelectedTier}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand" onClick={() => navigateToView('home')}>
            <span>{t.brand}</span>
          </div>
          <p className="footer-tagline">{t.footerTagline}</p>
          <div className="footer-links">
            <button onClick={() => navigateToView('story')} className="footer-link-btn">{t.storyTab}</button>
            <button onClick={() => navigateToView('challenge')} className="footer-link-btn">{t.challengeTab}</button>
            <button onClick={() => navigateToView('academy')} className="footer-link-btn">{t.academyTab}</button>
            <button onClick={() => navigateToView('assessment')} className="footer-link-btn">{t.assessmentTab}</button>
            <button onClick={() => navigateToView('boost')} className="footer-link-btn">{t.boostTab}</button>
          </div>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/baldomindset/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} {t.footerCopyright}</p>
            <div className="mogul-tag">
              <span>{t.createdWith} <span className="heart">❤️</span> {t.by}</span>
              <a href="https://moguldesignagency.com/" target="_blank" rel="noopener noreferrer" className="mogul-badge">
                <img src={mdaLogo} alt="Mogul Design Agency Logo" className="mogul-logo-img" />
                <span className="mogul-text">MOGUL DESIGN AGENCY</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
