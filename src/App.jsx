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

function App() {
  // View Routing State
  const [currentView, setCurrentView] = useState('home');

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

  return (
    <div className="app-container">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="nav-brand" onClick={() => navigateToView('home')}>
          <BrainCircuit className="nav-logo-icon" />
          <span>MaldoMindset</span>
        </div>
        <nav className="nav-links">
          <button onClick={() => navigateToView('story')} className={`nav-link-btn ${currentView === 'story' ? 'active' : ''}`}>Story</button>
          <button onClick={() => navigateToView('academy')} className={`nav-link-btn ${currentView === 'academy' ? 'active' : ''}`}>Academy</button>
          <button onClick={() => navigateToView('assessment')} className={`nav-link-btn ${currentView === 'assessment' ? 'active' : ''}`}>Assessment</button>
          <button onClick={() => navigateToView('boost')} className={`nav-link-btn ${currentView === 'boost' ? 'active' : ''}`}>Daily Boost</button>
          <button onClick={() => navigateToView('checkout')} className={`cta-nav-btn ${currentView === 'checkout' ? 'active' : ''}`}>Academy Checkout</button>
        </nav>
      </header>

      {/* Main Content Sections based on view */}
      {currentView === 'home' && <Home navigateToView={navigateToView} />}
      {currentView === 'story' && <Story navigateToView={navigateToView} />}
      {currentView === 'academy' && <Academy navigateToView={navigateToView} setCheckoutForm={setCheckoutForm} />}
      {currentView === 'assessment' && <Assessment navigateToView={navigateToView} />}
      {currentView === 'boost' && <Boost navigateToView={navigateToView} />}
      {currentView === 'checkout' && (
        <Checkout
          navigateToView={navigateToView}
          checkoutForm={checkoutForm}
          setCheckoutForm={setCheckoutForm}
        />
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand" onClick={() => navigateToView('home')}>
            <BrainCircuit className="footer-logo-icon" />
            <span>MaldoMindset</span>
          </div>
          <p className="footer-tagline">Forge Unbreakable Psychology. Architect Your Legacy.</p>
          <div className="footer-links">
            <button onClick={() => navigateToView('story')} className="footer-link-btn">Story</button>
            <button onClick={() => navigateToView('academy')} className="footer-link-btn">Academy</button>
            <button onClick={() => navigateToView('assessment')} className="footer-link-btn">Assessment</button>
            <button onClick={() => navigateToView('boost')} className="footer-link-btn">Daily Boost</button>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} MaldoMindset Academy. All rights reserved.</p>
            <div className="mogul-tag">
              <span>Created with <span className="heart">❤️</span> by</span>
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
