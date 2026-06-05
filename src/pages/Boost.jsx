import { useState } from 'react';
import { 
  BookOpen, 
  RefreshCw, 
  CheckCircle, 
  Copy 
} from 'lucide-react';
import { getRandomQuote } from '../constants/data';

export default function Boost({ navigateToView }) {
  // State for Quote Generator
  const [activeCategory, setActiveCategory] = useState('discipline');
  const [currentQuote, setCurrentQuote] = useState(() => getRandomQuote('discipline'));
  const [quoteAnim, setQuoteAnim] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateNewQuote = (category = activeCategory) => {
    setQuoteAnim(true);
    const quote = getRandomQuote(category);
    setTimeout(() => {
      setCurrentQuote(quote);
      setQuoteAnim(false);
      setCopied(false);
    }, 250);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    generateNewQuote(category);
  };

  const copyToClipboard = () => {
    const textToCopy = `"${currentQuote.text}" — ${currentQuote.author}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section boost-page-section">
      <div className="section-header">
        <span className="section-subtitle">Cognitive Fuel</span>
        <h2 className="section-title">Daily Mindset Boost</h2>
        <p className="section-desc">
          Nourish your focus. Filter quotes by key development areas and generate instant mental alignment.
        </p>
      </div>

      <div className="quote-container boost-page-container">
        <div className="quote-filters">
          {['discipline', 'resilience', 'vision'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              id={`filter-${cat}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="quote-card-wrapper">
          <div className={`quote-card ${quoteAnim ? 'fade-out' : 'fade-in'}`}>
            <BookOpen size={36} className="quote-icon" />
            <p className="quote-text">"{currentQuote.text}"</p>
            <span className="quote-author">— {currentQuote.author}</span>
          </div>

          <div className="quote-actions">
            <button 
              onClick={() => generateNewQuote()} 
              className="action-btn-primary"
              id="btn-new-boost"
            >
              <RefreshCw size={16} />
              Generate Boost
            </button>
            <button 
              onClick={copyToClipboard} 
              className="action-btn-secondary"
              id="btn-copy-boost"
            >
              {copied ? <CheckCircle size={16} className="success-color" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Boost'}
            </button>
          </div>
        </div>

        <button onClick={() => navigateToView('home')} className="secondary-btn go-back-home-btn">
          ← Back to Home
        </button>
      </div>
    </section>
  );
}
