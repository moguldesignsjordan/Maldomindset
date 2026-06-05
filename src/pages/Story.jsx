import founderImg from '../assets/founder.png';
import { TRANSLATIONS } from '../constants/translations';

export default function Story({ navigateToView, language = 'en' }) {
  const t = TRANSLATIONS[language];

  return (
    <section id="story" className="section founder-page-section">
      <div className="section-header">
        <span className="section-subtitle">{t.storySubtitle}</span>
        <h2 className="section-title">{t.storyTitle}</h2>
        <p className="section-desc">
          {t.storyDesc}
        </p>
      </div>

      <div className="founder-grid">
        {/* Left Side: Portrait Card */}
        <div className="founder-visual-card">
          <div className="founder-glow-backdrop"></div>
          <div className="founder-image-frame">
            <img src={founderImg} alt="Liss Almonte - Baldo Mindset" className="founder-portrait-img" />
          </div>
        </div>

        {/* Right Side: Story Card */}
        <div className="founder-story-card glass-card">
          <h3 className="founder-name">{t.founderName}</h3>
          <span className="founder-title">{t.founderTitle}</span>

          <p className="founder-narrative">
            {t.bioPart1}
          </p>

          <div className="founder-quote">
            <p>
              {t.bioQuote}
            </p>
          </div>

          <p className="founder-narrative">
            {t.bioPart2}
          </p>

          <div className="founder-mission-box">
            <h4>{t.missionHeader}</h4>
            <p>
              {t.missionText}
            </p>
          </div>
        </div>
      </div>

      <div className="page-back-nav flex-center">
        <button onClick={() => navigateToView('home')} className="secondary-btn go-back-home-btn">
          {t.backToHome}
        </button>
      </div>
    </section>
  );
}
