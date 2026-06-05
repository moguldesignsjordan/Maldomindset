import { useState } from 'react';
import { BrainCircuit } from 'lucide-react';
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
  const [language, setLanguage] = useState('en');

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
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="app-container">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="nav-brand" onClick={() => navigateToView('home')}>
          <BrainCircuit className="nav-logo-icon" />
          <span>{t.brand}</span>
        </div>
        <nav className="nav-links">
          <button onClick={() => navigateToView('story')} className={`nav-link-btn ${currentView === 'story' ? 'active' : ''}`}>{t.storyTab}</button>
          <button onClick={() => navigateToView('academy')} className={`nav-link-btn ${currentView === 'academy' ? 'active' : ''}`}>{t.academyTab}</button>
          <button onClick={() => navigateToView('assessment')} className={`nav-link-btn ${currentView === 'assessment' ? 'active' : ''}`}>{t.assessmentTab}</button>
          <button onClick={() => navigateToView('boost')} className={`nav-link-btn ${currentView === 'boost' ? 'active' : ''}`}>{t.boostTab}</button>
          <button onClick={() => navigateToView('checkout')} className={`cta-nav-btn ${currentView === 'checkout' ? 'active' : ''}`}>{t.checkoutTab}</button>
          
          {/* Language Toggle */}
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
        </nav>
      </header>

      {/* Main Content Sections based on view */}
      <main className="page-transition" key={currentView}>
        {currentView === 'home' && <Home navigateToView={navigateToView} language={language} />}
        {currentView === 'story' && <Story navigateToView={navigateToView} language={language} />}
        {currentView === 'academy' && (
          <Academy 
            navigateToView={navigateToView} 
            setCheckoutForm={setCheckoutForm} 
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
            <BrainCircuit className="footer-logo-icon" />
            <span>{t.brand}</span>
          </div>
          <p className="footer-tagline">{t.footerTagline}</p>
          <div className="footer-links">
            <button onClick={() => navigateToView('story')} className="footer-link-btn">{t.storyTab}</button>
            <button onClick={() => navigateToView('academy')} className="footer-link-btn">{t.academyTab}</button>
            <button onClick={() => navigateToView('assessment')} className="footer-link-btn">{t.assessmentTab}</button>
            <button onClick={() => navigateToView('boost')} className="footer-link-btn">{t.boostTab}</button>
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
