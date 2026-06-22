import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';

export default function Academy({ navigateToView, language = 'en' }) {
  const t = TRANSLATIONS[language];

  return (
    <div className="academy-page-wrapper">

      {/* Vertical Video Section — Top of page */}
      <section className="section academy-video-section">
        <div className="section-header">
          <span className="section-subtitle">{t.videoSectionSubtitle}</span>
          <h2 className="section-title">{t.videoSectionTitle}</h2>
          <p className="section-desc">
            {t.videoSectionDesc}
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

      <section id="academy" className="section academy-page-section">
        <div className="section-header">
          <span className="section-subtitle">{t.academySubtitle}</span>
          <h2 className="section-title">{t.academyTitle}</h2>
          <p className="section-desc">
            {t.academyDesc}
          </p>
        </div>

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
                  <span className="current-price">$99 <span className="currency">USD</span></span>
                  <span className="original-price">$1,000 USD</span>
                </div>
                <p className="pricing-guarantee">{t.pricingGuarantee}</p>
              </div>

              <button
                onClick={() => navigateToView('checkout')}
                className="primary-btn academy-cta-btn"
                id="academy-enroll-cta"
              >
                {language === 'es' ? 'Únete a la Academia' : 'Join the Academy'}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="page-back-nav flex-center" style={{ paddingBottom: '60px' }}>
        <button onClick={() => navigateToView('home')} className="secondary-btn go-back-home-btn">
          {t.backToHome}
        </button>
      </div>
    </div>
  );
}
