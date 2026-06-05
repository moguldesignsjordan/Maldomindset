import { useState } from 'react';
import { 
  BookOpen, 
  RefreshCw, 
  CheckCircle, 
  Copy 
} from 'lucide-react';

import { TRANSLATIONS, LOCALIZED_QUOTES } from '../constants/translations';

// Helper defined outside the component scope to avoid linter purity checks
const getRandomQuoteIndex = (quotesList) => {
  if (!quotesList || quotesList.length === 0) return 0;
  return Math.floor(Math.random() * quotesList.length);
};

export default function Boost({ navigateToView, language = 'en' }) {
  // State for Quote Generator
  const [activeCategory, setActiveCategory] = useState('discipline');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteAnim, setQuoteAnim] = useState(false);
  const [copied, setCopied] = useState(false);

  const categoryQuotes = LOCALIZED_QUOTES[language]?.[activeCategory] || LOCALIZED_QUOTES[language]?.discipline || [];
  const currentQuote = categoryQuotes[quoteIndex] || categoryQuotes[0] || { text: '', author: '' };

  const generateNewQuote = (category = activeCategory) => {
    setQuoteAnim(true);
    const targetQuotes = LOCALIZED_QUOTES[language]?.[category] || LOCALIZED_QUOTES[language]?.discipline || [];
    const randomIndex = getRandomQuoteIndex(targetQuotes);
    setTimeout(() => {
      setQuoteIndex(randomIndex);
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

  const t = TRANSLATIONS[language];

  return (
    <section className="section boost-page-section">
      <div className="section-header">
        <span className="section-subtitle">{t.boostSubtitle}</span>
        <h2 className="section-title">{t.boostTitle}</h2>
        <p className="section-desc">
          {t.boostDesc}
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
              {language === 'es'
                ? (cat === 'discipline' ? 'Disciplina' : cat === 'resilience' ? 'Resiliencia' : 'Visión')
                : (cat.charAt(0).toUpperCase() + cat.slice(1))}
            </button>
          ))}
        </div>

        <div className="quote-card-wrapper">
          <div className={`quote-card ${quoteAnim ? 'fade-out' : 'fade-in boost-quote-card-active'}`}>
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
              {t.boostBtnGenerate}
            </button>
            <button 
              onClick={copyToClipboard} 
              className="action-btn-secondary"
              id="btn-copy-boost"
            >
              {copied ? <CheckCircle size={16} className="success-color" /> : <Copy size={16} />}
              {copied ? t.boostBtnCopied : t.boostBtnCopy}
            </button>
          </div>
        </div>

        <button onClick={() => navigateToView('home')} className="secondary-btn go-back-home-btn">
          {t.backToHome}
        </button>
      </div>
    </section>
  );
}
