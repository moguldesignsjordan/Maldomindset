import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

import { TRANSLATIONS } from '../constants/translations';
import founderImg from '../assets/founder.png';

export default function Home({ navigateToView, language = 'en' }) {
  // State for FAQ Accordion
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaqIndex(prev => (prev === index ? null : index));
  };

  const t = TRANSLATIONS[language];

  // Scroll-reveal observer for fluid entrance animations
  const pageRef = useRef(null);
  useEffect(() => {
    const els = pageRef.current?.querySelectorAll('.reveal');
    if (!els) return;
    
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { 
        if (e.isIntersecting) { 
          e.target.classList.add('visible'); 
        } 
      }),
      { threshold: 0.12 }
    );
    
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [language]);

  return (
    <div ref={pageRef} className="home-wrapper">
      {/* 1. Brutalist Hero Section */}
      <section id="home" className="hero-section">
        {/* Military/Tech Grid & Crosshairs */}
        <div className="hero-grid-bg"></div>
        <div className="hero-crosshair top-left"></div>
        <div className="hero-crosshair bottom-right"></div>

        <div className="hero-layout">
          {/* Left Column: Aggressive Copy */}
          <div className="hero-content">
            <h1 className="hero-title animate-slide-up delay-2">
              {t.heroTitleFirst}<br />
              <span className="text-highlight">{t.heroTitleSecond}</span>
            </h1>
            
            <p className="hero-description animate-slide-up delay-3">
              {t.heroDesc}
            </p>
            
            <div className="hero-actions animate-slide-up delay-4">
              <button
                onClick={() => navigateToView('academy')}
                className="primary-btn square-btn"
                id="hero-assessment-cta"
              >
                {t.heroCtaAssessment}
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigateToView('story')}
                className="secondary-btn ghost-btn"
                id="hero-story-cta"
              >
                [ {t.heroCtaStory} ]
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Visual */}
          <div className="hero-visual animate-slide-up delay-2">
            <div className="visual-backdrop-text">LEGACY</div>
            <div className="visual-shape-accent"></div>
            <img src={founderImg} alt="Liss Almonte" className="founder-cutout" />
          </div>
        </div>
      </section>

      {/* 2. Portal Navigation Dashboard (Asymmetric Bento Grid) */}
      <section className="section home-portal-section">
        <div className="section-header reveal">
          <span className="section-subtitle">{t.commandCenterSubtitle}</span>
          <h2 className="section-title">{t.commandCenterTitle}</h2>
          <p className="section-desc">
            {t.commandCenterDesc}
          </p>
        </div>

        <div className="home-portal-grid">
          <div className="portal-card glass-card animate-slide-up delay-1 reveal" onClick={() => navigateToView('academy')}>
            <div className="portal-card-badge">{t.portalBadgeProgram}</div>
            <div className="portal-card-header">
              <h3>{t.portalTitleProgram}</h3>
            </div>
            <p>{t.portalDescProgram}</p>
            <button className="portal-card-btn">
              {t.portalBtnProgram} <ChevronRight size={16} />
            </button>
          </div>

          <div className="portal-card glass-card animate-slide-up delay-2 reveal" onClick={() => navigateToView('assessment')}>
            <div className="portal-card-badge">{t.portalBadgeAudit}</div>
            <div className="portal-card-header">
              <h3>{t.portalTitleAudit}</h3>
            </div>
            <p>{t.portalDescAudit}</p>
            <button className="portal-card-btn">
              {t.portalBtnAudit} <ChevronRight size={16} />
            </button>
          </div>

          <div className="portal-card glass-card animate-slide-up delay-3 reveal" onClick={() => navigateToView('story')}>
            <div className="portal-card-badge">{t.portalBadgeBio}</div>
            <div className="portal-card-header">
              <h3>{t.portalTitleBio}</h3>
            </div>
            <p>{t.portalDescBio}</p>
            <button className="portal-card-btn">
              {t.portalBtnBio} <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Video Section */}
      <section className="video-section">
        <div className="video-container glass-card reveal">
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

      {/* 4. Academy CTA Section */}
      <section className="section academy-cta-section">
        <div className="cta-glass-box glass-card reveal">
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

      {/* 5. FAQ Section */}
      <section className="section faq-section">
        <div className="section-header reveal">
          <span className="section-subtitle">{t.faqSubtitle}</span>
          <h2 className="section-title">{t.faqTitle}</h2>
          <p className="section-desc">
            {t.faqDesc}
          </p>
        </div>

        <div className="faq-list reveal">
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
    </div>
  );
}