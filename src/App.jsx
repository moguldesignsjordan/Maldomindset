import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import './App.css';
import mdaLogo from './assets/mdalogo.png';

// Import Page Components
import Home from './pages/Home';
import Story from './pages/Story';
import Academy from './pages/Academy';
import Assessment from './pages/Assessment';
import Boost from './pages/Boost';
import Checkout from './pages/Checkout';

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
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="app-container">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="nav-home-brand" onClick={() => navigateToView('home')}>
          {t.brand}
        </div>

        {/* Desktop Nav Links (centered) */}
        <nav className="nav-links-desktop">
          <button onClick={() => navigateToView('home')} className={`nav-link-btn ${currentView === 'home' ? 'active' : ''}`}>{language === 'es' ? 'Inicio' : 'Home'}</button>
          <button onClick={() => navigateToView('story')} className={`nav-link-btn ${currentView === 'story' ? 'active' : ''}`}>{t.storyTab}</button>
          <button onClick={() => navigateToView('academy')} className={`nav-link-btn ${currentView === 'academy' ? 'active' : ''}`}>{t.academyTab}</button>
          <button onClick={() => navigateToView('assessment')} className={`nav-link-btn ${currentView === 'assessment' ? 'active' : ''}`}>{t.assessmentTab}</button>
          <button onClick={() => navigateToView('boost')} className={`nav-link-btn ${currentView === 'boost' ? 'active' : ''}`}>{t.boostTab}</button>
        </nav>

        {/* Right side: CTA + Lang + Hamburger */}
        <div className="nav-right">
          <button onClick={() => navigateToView('checkout')} className={`cta-nav-btn desktop-only ${currentView === 'checkout' ? 'active' : ''}`}>{t.checkoutTab}</button>

          <button
            className="theme-toggle-btn desktop-only"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

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

          <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
        <nav className="mobile-menu-nav">
          <button onClick={() => navigateToView('home')} className={`mobile-nav-link ${currentView === 'home' ? 'active' : ''}`}>{language === 'es' ? 'Inicio' : 'Home'}</button>
          <button onClick={() => navigateToView('story')} className={`mobile-nav-link ${currentView === 'story' ? 'active' : ''}`}>{t.storyTab}</button>
          <button onClick={() => navigateToView('academy')} className={`mobile-nav-link ${currentView === 'academy' ? 'active' : ''}`}>{t.academyTab}</button>
          <button onClick={() => navigateToView('assessment')} className={`mobile-nav-link ${currentView === 'assessment' ? 'active' : ''}`}>{t.assessmentTab}</button>
          <button onClick={() => navigateToView('boost')} className={`mobile-nav-link ${currentView === 'boost' ? 'active' : ''}`}>{t.boostTab}</button>
          <button onClick={() => navigateToView('checkout')} className="mobile-nav-cta">{t.checkoutTab}</button>
          
          <button
            className="theme-toggle-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            style={{ marginTop: '8px' }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="mobile-lang-toggle">
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
        </nav>
      </div>

      {/* Main Content Sections based on view */}
      <main className="page-transition" key={currentView}>
        {currentView === 'home' && <Home navigateToView={navigateToView} language={language} />}
        {currentView === 'story' && <Story navigateToView={navigateToView} language={language} />}
        {currentView === 'academy' && (
          <Academy
            navigateToView={navigateToView}
            language={language}
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
