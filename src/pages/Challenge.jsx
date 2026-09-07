import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';

export default function Challenge({ navigateToView, language = 'en' }) {
  const t = TRANSLATIONS[language];

  return (
    <div className="academy-page-wrapper">

      {/* Vertical Video Section: top of page */}
      <section className="section academy-video-section">
        <div className="section-header">
          <h2 className="section-title">{t.academyTitle}</h2>
          <p className="section-desc">
            {t.academyDesc}
          </p>
        </div>
        <div className="academy-video-wrapper">
          <div className="academy-video-card glass-card">
            <div className="vertical-video-container">
              <iframe
                src="https://www.youtube.com/embed/d_4lJk2UrQ4"
                title="Bow-Do Mindset Academy - Real Talk Real Results"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section id="challenge" className="section academy-page-section">
        <div className="academy-grid">
          {/* Left Panel - What you will learn */}
          <div className="academy-learn-card glass-card">
            <h3>{t.learnHeader}</h3>
            <p className="academy-lead-text">
              {t.learnLead}
            </p>
            <ul className="academy-benefits-list">
              {t.benefits.map((benefit, index) => (
                <li key={index}>
                  <CheckCircle size={18} className="benefit-icon" />
                  <span><strong>{benefit.bold}</strong> {benefit.normal}</span>
                </li>
              ))}
            </ul>
            <p className="academy-closing-line">{t.learnClosing}</p>
          </div>

          {/* Right Panel - Investment & Inclusions */}
          <div className="academy-pricing-wrap">
            <div className="limited-spots-badge">
              <Sparkles size={14} className="badge-sparkle" />
              <span>⚠️ {t.spotsBadge}</span>
            </div>

            <div className="academy-pricing-card glass-card">
              <div className="academy-includes">
                <h4>{t.pricingHeader}</h4>
                <ul className="includes-list">
                  {t.pricingIncludes.map((inc, index) => (
                    <li key={index}>{inc}</li>
                  ))}
                </ul>
              </div>

              <div className="pricing-divider"></div>

              <div className="pricing-container">
                <span className="pricing-label">{t.investmentLabel}</span>
                <div className="pricing-digits">
                  <span className="current-price">{t.priceCurrent} <span className="currency">{t.priceCurrency}</span></span>
                  <span className="original-price">{t.priceOriginal}</span>
                </div>
                <p className="pricing-guarantee">{t.pricingGuarantee}</p>
              </div>

              <button
                onClick={() => navigateToView('challenge-checkout')}
                className="primary-btn academy-cta-btn"
                id="challenge-enroll-cta"
              >
                {language === 'es' ? 'Únete al Reto' : 'Join The Challenge'}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="page-back-nav flex-center" style={{ paddingBottom: '60px', gap: '16px', flexWrap: 'wrap' }}>
        <button onClick={() => navigateToView('academy')} className="secondary-btn">
          {t.challengeSeeAllPrograms}
        </button>
        <button onClick={() => navigateToView('home')} className="secondary-btn go-back-home-btn">
          {t.backToHome}
        </button>
      </div>
    </div>
  );
}
