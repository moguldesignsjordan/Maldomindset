import founderImg from '../assets/founder.png';
import { TRANSLATIONS } from '../constants/translations';
import igProfileImg from '../assets/ig_profile.jpg';

export default function Story({ navigateToView, language = 'en' }) {
  const t = TRANSLATIONS[language];

  return (
    <>
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

      </section>

      {/* Instagram Showcase Section */}
      <section className="section instagram-section animate-slide-up">
        <div className="section-header">
          <span className="section-subtitle">{t.igSubtitle}</span>
          <h2 className="section-title">{t.igTitle}</h2>
          <p className="section-desc">
            {t.igDesc}
          </p>
        </div>

        <div className="ig-social-row animate-slide-up delay-1">
          <a href="https://www.instagram.com/baldomindset/" target="_blank" rel="noopener noreferrer" className="ig-social-icon-btn" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span>Instagram</span>
          </a>

          <a href="https://www.tiktok.com/@baldomindset" target="_blank" rel="noopener noreferrer" className="ig-social-icon-btn" aria-label="TikTok">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/>
            </svg>
            <span>TikTok</span>
          </a>

          <a href="https://www.youtube.com/@Baldomindset" target="_blank" rel="noopener noreferrer" className="ig-social-icon-btn" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>YouTube</span>
          </a>
        </div>
      </section>

      <div className="page-back-nav flex-center" style={{ marginTop: '20px', marginBottom: '40px' }}>
        <button onClick={() => navigateToView('home')} className="secondary-btn go-back-home-btn">
          {t.backToHome}
        </button>
      </div>
    </>
  );
}
