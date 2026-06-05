import { useState } from 'react';
import { 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  Send, 
  RefreshCw 
} from 'lucide-react';

export default function Academy({ navigateToView, setCheckoutForm }) {
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

  return (
    <div className="academy-page-wrapper">
      <section id="academy" className="section academy-page-section">
        <div className="section-header">
          <span className="section-subtitle">The Academy</span>
          <h2 className="section-title">90-Day Challenge</h2>
          <p className="section-desc">
            An elite, structured accelerator designed to help you break plateaus, reprogram your psychology, and build physical and financial leverage.
          </p>
        </div>

        <div className="academy-grid">
          {/* Left Panel - What you will learn */}
          <div className="academy-learn-card glass-card">
            <h3>Create The Life You Desire</h3>
            <p className="academy-lead-text">
              Are you tired of feeling like you have potential but aren't making the progress you want? Over these 90 days, you will learn to:
            </p>
            <ul className="academy-benefits-list">
              <li>
                <CheckCircle size={18} className="benefit-icon" />
                <span><strong>Eliminate vices & habits:</strong> Clear the distractions and bad habits that hold back your growth.</span>
              </li>
              <li>
                <CheckCircle size={18} className="benefit-icon" />
                <span><strong>Develop real discipline:</strong> Replace temporary motivation with consistent execution structures.</span>
              </li>
              <li>
                <CheckCircle size={18} className="benefit-icon" />
                <span><strong>Reprogram mindset:</strong> Replace self-doubt with psychological conditioning for success.</span>
              </li>
              <li>
                <CheckCircle size={18} className="benefit-icon" />
                <span><strong>Strengthen multi-dimensionally:</strong> Excel physically, mentally, and spiritually.</span>
              </li>
              <li>
                <CheckCircle size={18} className="benefit-icon" />
                <span><strong>Scale online business:</strong> Turn passiveness into passion and monetize assets online.</span>
              </li>
              <li>
                <CheckCircle size={18} className="benefit-icon" />
                <span><strong>Authentic personal branding:</strong> Build a profitable brand and become the person you admire.</span>
              </li>
            </ul>
          </div>

          {/* Right Panel - Investment & Inclusions */}
          <div className="academy-pricing-card glass-card">
            <div className="limited-spots-badge">
              <Sparkles size={14} className="badge-sparkle" />
              <span>⚠️ Spots are limited</span>
            </div>
            
            <div className="academy-includes">
              <h4>What will you get?</h4>
              <ul className="includes-list">
                <li><span>🔥</span> Weekly LIVE MENTORSHIP with Baldo Mindset</li>
                <li><span>🔥</span> Access to a private growth & support community</li>
                <li><span>🔥</span> Exclusive step-by-step masterclasses</li>
                <li><span>🔥</span> My complete blueprint to accelerate your results</li>
              </ul>
            </div>

            <div className="pricing-divider"></div>

            <div className="pricing-container">
              <span className="pricing-label">INVESTMENT</span>
              <div className="pricing-digits">
                <span className="current-price">$250 <span className="currency">USD</span></span>
                <span className="original-price">$1,000 USD</span>
              </div>
              <p className="pricing-guarantee">Today you can get full access to the 90-day program. Limited spots.</p>
            </div>

            <button 
              onClick={() => scrollToId('apply')} 
              className="primary-btn academy-cta-btn"
              id="academy-enroll-cta"
            >
              Apply For The Challenge
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Booking / Application Section */}
      <section id="apply" className="section contact-section">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="section-subtitle">Direct Access</span>
            <h2 className="section-title">Apply For A Free Mindset Strategy Session</h2>
            <p className="contact-desc">
              We work selectively with driven individuals looking to build systems, streamline execution, and optimize performance.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <CheckCircle size={18} className="feat-check" />
                <div>
                  <h6>1-on-1 Bottleneck Identification</h6>
                  <p>Uncover the subconscious patterns slowing you down.</p>
                </div>
              </div>
              <div className="feature-item">
                <CheckCircle size={18} className="feat-check" />
                <div>
                  <h6>Tailored Action Blueprints</h6>
                  <p>Get a custom roadmap matching your scores and goals.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {submitSuccess ? (
              <div className="form-success-card" id="application-success">
                <CheckCircle size={48} className="success-icon" />
                <h3>Application Submitted</h3>
                <p>Redirecting you to checkout to finalize your academy enrollment details...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitForm} className="contact-form" id="consultation-form">
                <div className="input-group">
                  <label htmlFor="name-input">Full Name</label>
                  <input
                    type="text"
                    id="name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email-input">Email Address</label>
                  <input
                    type="email"
                    id="email-input"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="focus-input">Primary Focus Area</label>
                  <select
                    id="focus-input"
                    name="focus"
                    value={formData.focus}
                    onChange={handleFormChange}
                  >
                    <option value="discipline">Habit Optimization & Discipline</option>
                    <option value="resilience">Mental Fortitude & Stress</option>
                    <option value="focus">Strategic Vision & Execution</option>
                    <option value="mastery">Emotional Self-Mastery</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="blocker-input">What is your current #1 mindset or growth bottleneck?</label>
                  <textarea
                    id="blocker-input"
                    name="blocker"
                    value={formData.blocker}
                    onChange={handleFormChange}
                    placeholder="e.g. Consistency in stress, lack of clear goals, procrastination..."
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
                      Processing Application...
                    </>
                  ) : (
                    <>
                      Submit Application
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
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
