import { useState } from 'react';
import {
  ArrowRight,
  Zap,
  BrainCircuit,
  Target,
  ChevronRight
} from 'lucide-react';

import { TRANSLATIONS } from '../constants/translations';

export default function Home({ navigateToView, language = 'en' }) {
  // State for FAQ Accordion
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaqIndex(prev => (prev === index ? null : index));
  };

  const t = TRANSLATIONS[language];

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero-section">
        {/* Background Video */}
        <div className="hero-video-bg">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-video-overlay"></div>

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
    </>
  );
}
