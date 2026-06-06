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

        <div className="instagram-container animate-slide-up delay-1">
          {/* Left: Phone Mockup Container */}
          <div className="instagram-mockup-column">
            <div className="phone-mockup-wrapper">
              <div className="phone-mockup glass-card">
                <div className="phone-notch"></div>
                <div className="phone-status-bar">
                  <span className="phone-time">09:41</span>
                  <div className="phone-status-icons">
                    <span style={{ marginRight: '6px' }}>📶</span>
                    <span>🔋</span>
                  </div>
                </div>
                <div className="phone-screen">
                  <img 
                    src={igProfileImg} 
                    alt="Instagram Profile Screenshot" 
                    className="phone-screen-img"
                  />
                </div>
                <div className="phone-home-indicator"></div>
              </div>
            </div>
          </div>

          {/* Right: Embedded Video Columns */}
          <div className="instagram-videos-column">
            <div className="instagram-videos-grid">
              {t.igReelIds.map((reelId, index) => (
                <div key={index} className="instagram-video-card glass-card">
                  <div className="video-card-iframe-wrapper">
                    <iframe
                      src={`https://www.instagram.com/p/${reelId}/embed/captioned/?cr=1&v=12`}
                      title={`Baldo Mindset Instagram Post ${index + 1}`}
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency="true"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>

            <div className="instagram-actions">
              <a 
                href="https://www.instagram.com/baldomindset/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="primary-btn ig-follow-btn"
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
                  style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>{t.igFollowBtn}</span>
              </a>
            </div>
          </div>
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
