import { CheckCircle, Sparkles, ArrowRight, Clock, Users } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';

// Long-form (16:9) Academy overview video. Swap the ID for the final cut.
const ACADEMY_VIDEO_ID = 'd_4lJk2UrQ4';

export default function Academy({ navigateToView, language = 'en', setSelectedTier }) {
  const t = TRANSLATIONS[language];

  // The 90-Day Challenge has its own dedicated page and single-product checkout;
  // every other program goes through the multi-tier Academy checkout.
  const goToCheckout = (tierId) => {
    if (tierId === 'mindset') {
      navigateToView('challenge-checkout');
      return;
    }
    if (setSelectedTier) setSelectedTier(tierId);
    navigateToView('checkout');
  };

  return (
    <div className="academy-page-wrapper">
      {/* Academy overview video */}
      <section className="section academy-video-section">
        <div className="section-header">
          <h2 className="section-title">{t.academyVideoTitle}</h2>
          <p className="section-desc">{t.academyVideoDesc}</p>
        </div>
        <div className="academy-video-wrapper">
          <div className="academy-video-card landscape">
            <div className="landscape-video-container">
              <iframe
                src={`https://www.youtube.com/embed/${ACADEMY_VIDEO_ID}`}
                title={t.academyVideoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="section academy-programs-section">
        <div className="section-header">
          <span className="section-subtitle">{t.programsSubtitle}</span>
          <h2 className="section-title">{t.programsTitle}</h2>
          <p className="section-desc">{t.programsDesc}</p>
        </div>

        <div className="programs-grid">
          {t.programs.map((program) => (
            <div
              key={program.id}
              className={`program-card glass-card ${program.popular ? 'featured' : ''}`}
            >
              {program.popular && (
                <span className="program-popular-badge">
                  <Sparkles size={12} /> {t.programsMostPopular}
                </span>
              )}

              <h3 className="program-name">{program.name}</h3>
              <p className="program-tagline">{program.tagline}</p>

              <div className="program-meta">
                {program.duration && <span><Clock size={14} /> {program.duration}</span>}
                <span><Users size={14} /> {program.format}</span>
              </div>

              <div className="program-price-block">
                <span className="program-price">{program.price}</span>
                <span className="program-price-note">{program.priceNote}</span>
              </div>

              <span className="program-includes-label">{t.programsIncludesLabel}</span>
              <ul className="program-features">
                {program.features.map((feature, i) => (
                  <li key={i}>
                    <CheckCircle size={16} className="benefit-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <p className="program-best-for">{program.bestFor}</p>

              {program.id === 'mindset' && (
                <button
                  onClick={() => navigateToView('challenge')}
                  className="program-details-link"
                >
                  {language === 'es' ? 'Ver detalles del Reto' : 'See Challenge details'}
                </button>
              )}

              <button
                onClick={() => goToCheckout(program.id)}
                className={program.popular ? 'primary-btn program-cta-btn' : 'secondary-btn program-cta-btn'}
              >
                {t.programsCta}
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <p className="programs-footnote">{t.programsFootnote}</p>
      </section>

      <div className="page-back-nav flex-center" style={{ paddingBottom: '60px' }}>
        <button onClick={() => navigateToView('home')} className="secondary-btn go-back-home-btn">
          {t.backToHome}
        </button>
      </div>
    </div>
  );
}
