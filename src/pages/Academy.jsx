import { useState } from 'react';
import {
  CheckCircle,
  Sparkles,
  ArrowRight,
  Send,
  RefreshCw
} from 'lucide-react';

import { TRANSLATIONS } from '../constants/translations';

export default function Academy({ navigateToView, setCheckoutForm, language = 'en' }) {
  // State for Contact / Application Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    focus: 'discipline',
    blocker: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.blocker) return;
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setCheckoutForm(prev => ({
        ...prev,
        name: formData.name,
        email: formData.email
      }));

      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: '',
          email: '',
          focus: 'discipline',
          blocker: ''
        });
        navigateToView('checkout');
      }, 1500);
    }, 1500);
  };

  // Helper to scroll to a specific ID on the active page
  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                onClick={() => scrollToId('apply')}
                className="primary-btn academy-cta-btn"
                id="academy-enroll-cta"
              >
                {t.applyCtaBtn}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Booking / Application Section */}
      <section id="apply" className="section contact-section">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="section-subtitle">{t.formSubtitle}</span>
            <h2 className="section-title">{t.formTitle}</h2>
            <p className="contact-desc">
              {t.formDesc}
            </p>
            <div className="features-list">
              <div className="feature-item">
                <CheckCircle size={18} className="feat-check" />
                <div>
                  <h6>{t.formFeat1Title}</h6>
                  <p>{t.formFeat1Desc}</p>
                </div>
              </div>
              <div className="feature-item">
                <CheckCircle size={18} className="feat-check" />
                <div>
                  <h6>{t.formFeat2Title}</h6>
                  <p>{t.formFeat2Desc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {submitSuccess ? (
              <div className="form-success-card" id="application-success">
                <CheckCircle size={48} className="success-icon" />
                <h3>{t.successFormTitle}</h3>
                <p>{t.successFormDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitForm} className="contact-form" id="consultation-form">
                <div className="input-group">
                  <label htmlFor="name-input">{t.fieldName}</label>
                  <input
                    type="text"
                    id="name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder={t.placeholderName}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email-input">{t.fieldEmail}</label>
                  <input
                    type="email"
                    id="email-input"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder={t.placeholderEmail}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="focus-input">{t.fieldFocus}</label>
                  <select
                    id="focus-input"
                    name="focus"
                    value={formData.focus}
                    onChange={handleFormChange}
                  >
                    {t.focusOpts.map((opt) => (
                      <option key={opt.val} value={opt.val}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="blocker-input">{t.fieldBlocker}</label>
                  <textarea
                    id="blocker-input"
                    name="blocker"
                    value={formData.blocker}
                    onChange={handleFormChange}
                    placeholder={t.placeholderBlocker}
                    rows={4}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                  id="btn-submit-application"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="spinner-icon" size={16} />
                      {t.btnSubmitting}
                    </>
                  ) : (
                    <>
                      {t.btnSubmit}
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
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
