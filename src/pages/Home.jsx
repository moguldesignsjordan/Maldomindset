import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Zap,
  BrainCircuit,
  Target,
  ChevronRight
} from 'lucide-react';

import { TRANSLATIONS } from '../constants/translations';
import slide1 from '../assets/img1.png';
import slide2 from '../assets/img2.png';
import slide3 from '../assets/img3.jpeg';
import slide4 from '../assets/img4.png';

const SLIDES = [
  { src: slide1, pos: 'center 35%' }, // podcast seated
  { src: slide2, pos: 'center 20%' }, // full body suit
  { src: slide3, pos: 'center 20%' }, // full body suit
  { src: slide4, pos: 'center 35%' }, // podcast seated
];

export default function Home({ navigateToView, language = 'en' }) {
  // State for FAQ Accordion
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  // Slideshow state
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaqIndex(prev => (prev === index ? null : index));
  };

  const t = TRANSLATIONS[language];

  // Scroll-reveal observer
  const pageRef = useRef(null);
  useEffect(() => {
    const els = pageRef.current?.querySelectorAll('.reveal');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [language]);

  return (
    <div ref={pageRef}>
      {/* Hero Section */}
      <section id="home" className="hero-section">
        {/* Background Slideshow */}
        <div className="hero-image-bg">
          {SLIDES.map((slide, i) => (
            <img
              key={i}
              src={slide.src}
              alt=""
              aria-hidden="true"
              className={`hero-slide ${i === activeSlide ? 'active' : ''}`}
              style={{ objectPosition: slide.pos }}
            />
          ))}
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
              <Zap size={24} className="portal-card-icon academy-color" />
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
              <BrainCircuit size={24} className="portal-card-icon assessment-color" />
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
        <div className="cta-glass-box glass-card reveal">
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
        <div className="section-header reveal">
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
    </div>
  );
}
