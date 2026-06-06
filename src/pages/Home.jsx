import { useState } from 'react';
import {
  ArrowRight,
  Zap,
  BrainCircuit,
  Target,
  ChevronRight
} from 'lucide-react';

import { TRANSLATIONS } from '../constants/translations';
import igProfileImg from '../assets/ig_profile.jpg';
import igReelImg from '../assets/ig_reel.jpg';

export default function Home({ navigateToView, language = 'en' }) {
  // State for FAQ Accordion
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // State for Instagram Phone Mockup Toggler
  const [phoneView, setPhoneView] = useState('profile');

  const toggleFaq = (index) => {
    setActiveFaqIndex(prev => (prev === index ? null : index));
  };

  const t = TRANSLATIONS[language];

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title animate-slide-up delay-1">
            {t.heroTitleFirst}<br />
            <span className="gradient-text">{t.heroTitleSecond}</span>
          </h1>
          <p className="hero-description animate-slide-up delay-2">
            {t.heroDesc}
          </p>
          <div className="hero-actions animate-slide-up delay-3">
            <button
              onClick={() => navigateToView('assessment')}
              className="primary-btn"
              id="hero-assessment-cta"
            >
              {t.heroCtaAssessment}
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigateToView('story')}
              className="secondary-btn"
              id="hero-story-cta"
            >
              {t.heroCtaStory}
            </button>
          </div>
        </div>
      </section>

      {/* Portal Navigation Dashboard */}
      <section className="section home-portal-section">
        <div className="section-header">
          <span className="section-subtitle">{t.commandCenterSubtitle}</span>
          <h2 className="section-title">{t.commandCenterTitle}</h2>
          <p className="section-desc">
            {t.commandCenterDesc}
          </p>
        </div>

        <div className="home-portal-grid">
          <div className="portal-card glass-card animate-slide-up delay-1" onClick={() => navigateToView('academy')}>
            <div className="portal-card-badge">{t.portalBadgeProgram}</div>
            <div className="portal-card-header">
              <Zap size={24} className="portal-card-icon academy-color" />
              <h3>{t.portalTitleProgram}</h3>
            </div>
            <p>{t.portalDescProgram}</p>
            <button className="portal-card-btn">
              {t.portalBtnProgram} <ChevronRight size={16} />
            </button>
          </div>

          <div className="portal-card glass-card animate-slide-up delay-2" onClick={() => navigateToView('assessment')}>
            <div className="portal-card-badge">{t.portalBadgeAudit}</div>
            <div className="portal-card-header">
              <BrainCircuit size={24} className="portal-card-icon assessment-color" />
              <h3>{t.portalTitleAudit}</h3>
            </div>
            <p>{t.portalDescAudit}</p>
            <button className="portal-card-btn">
              {t.portalBtnAudit} <ChevronRight size={16} />
            </button>
          </div>

          <div className="portal-card glass-card animate-slide-up delay-3" onClick={() => navigateToView('story')}>
            <div className="portal-card-badge">{t.portalBadgeBio}</div>
            <div className="portal-card-header">
              <Target size={24} className="portal-card-icon story-color" />
              <h3>{t.portalTitleBio}</h3>
            </div>
            <p>{t.portalDescBio}</p>
            <button className="portal-card-btn">
              {t.portalBtnBio} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <div className="video-container glass-card">
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube-nocookie.com/embed/KwdXk5LH6po"
              title={t.videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Academy CTA Section */}
      <section className="section academy-cta-section">
        <div className="cta-glass-box glass-card">
          <div className="cta-glow-overlay"></div>
          <div className="cta-content">
            <span className="cta-subtitle">{t.ctaSubtitle}</span>
            <h2 className="cta-title">{t.ctaTitle}</h2>
            <p className="cta-description">
              {t.ctaDesc}
            </p>
            <button
              onClick={() => navigateToView('academy')}
              className="primary-btn cta-btn-large"
              id="home-academy-cta-btn"
            >
              {t.ctaBtnLarge}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="section-header">
          <span className="section-subtitle">{t.faqSubtitle}</span>
          <h2 className="section-title">{t.faqTitle}</h2>
          <p className="section-desc">
            {t.faqDesc}
          </p>
        </div>

        <div className="faq-list">
          {t.faqs.map((faq, index) => {
            const isOpen = activeFaqIndex === index;
            return (
              <div
                key={index}
                className={`faq-item glass-card ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                  <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                </div>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
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
            <div className="mockup-toggle-tabs">
              <button 
                className={`mockup-tab-btn ${phoneView === 'profile' ? 'active' : ''}`}
                onClick={() => setPhoneView('profile')}
              >
                {t.igToggleProfile}
              </button>
              <button 
                className={`mockup-tab-btn ${phoneView === 'reel' ? 'active' : ''}`}
                onClick={() => setPhoneView('reel')}
              >
                {t.igToggleReel}
              </button>
            </div>

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
                    src={phoneView === 'profile' ? igProfileImg : igReelImg} 
                    alt="Instagram View" 
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
    </>
  );
}
