import { useState } from 'react';
import { CheckCircle, RefreshCw, Shield } from 'lucide-react';

export default function Checkout({ navigateToView, checkoutForm, setCheckoutForm }) {
  const [selectedTier, setSelectedTier] = useState('mindset');
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleCheckoutChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePaySubmit = (e) => {
    e.preventDefault();
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const handleCloseSuccessModal = () => {
    setPaymentSuccess(false);
    setCheckoutForm({
      name: '',
      email: '',
      cardNum: '',
      cardExp: '',
      cardCvc: '',
      paymentMethod: 'card'
    });
    navigateToView('home');
  };

  return (
    <section className="section checkout-section">
      <div className="section-header">
        <span className="section-subtitle">Enrollment Portal</span>
        <h2 className="section-title">Complete Your Academy Registration</h2>
        <p className="section-desc">
          Select your performance tier and complete your billing setup to gain immediate access to Baldo Mindset's curriculum.
        </p>
      </div>

      <div className="checkout-grid">
        {/* Left Column: Tier Selection */}
        <div className="checkout-tiers-column">
          <h3>1. Select Your Program</h3>

          <div className="tiers-selection-list">
            {/* Tier 1 */}
            <div
              className={`checkout-tier-card glass-card ${selectedTier === 'mindset' ? 'selected' : ''}`}
              onClick={() => setSelectedTier('mindset')}
            >
              <div className="tier-card-header">
                <div className="tier-title-wrap">
                  <h4>90-Day Mindset & Habits Academy</h4>
                  <p>Reprogram habits and forge extreme self-discipline.</p>
                </div>
                <span className="tier-price">$250</span>
              </div>
              <ul className="tier-features">
                <li><CheckCircle size={14} className="feat-check" /> 90 Days of Structured Mindset Protocols</li>
                <li><CheckCircle size={14} className="feat-check" /> Weekly Live Mentorship with Baldo Mindset</li>
                <li><CheckCircle size={14} className="feat-check" /> Private Growth & Support Community Access</li>
              </ul>
            </div>

            {/* Tier 2 */}
            <div
              className={`checkout-tier-card glass-card ${selectedTier === 'accelerator' ? 'selected' : ''}`}
              onClick={() => setSelectedTier('accelerator')}
            >
              <div className="tier-card-header">
                <div className="tier-title-wrap">
                  <h4>Personal Brand & Business Accelerator</h4>
                  <p>Full 90-day mindset + passion business launch plan.</p>
                </div>
                <span className="tier-price">$450</span>
              </div>
              <ul className="tier-features">
                <li><CheckCircle size={14} className="feat-check" /> Complete 90-Day Mindset & Habits Academy</li>
                <li><CheckCircle size={14} className="feat-check" /> Personal Branding Blueprint & Scale Strategy</li>
                <li><CheckCircle size={14} className="feat-check" /> Passion-to-Income Monetization Step-by-Step</li>
              </ul>
            </div>

            {/* Tier 3 */}
            <div
              className={`checkout-tier-card glass-card ${selectedTier === 'inner-circle' ? 'selected' : ''}`}
              onClick={() => setSelectedTier('inner-circle')}
            >
              <div className="tier-card-header">
                <div className="tier-title-wrap">
                  <div className="inner-circle-badge-wrap">
                    <h4>Elite 1-on-1 Mentorship (Inner Circle)</h4>
                    <span className="popular-badge">ELITE</span>
                  </div>
                  <p>Maximum direct accountability and custom blueprints.</p>
                </div>
                <span className="tier-price">$950</span>
              </div>
              <ul className="tier-features">
                <li><CheckCircle size={14} className="feat-check" /> Complete Mindset + Business programs</li>
                <li><CheckCircle size={14} className="feat-check" /> Weekly 1-on-1 Private Mentorship Calls</li>
                <li><CheckCircle size={14} className="feat-check" /> Direct WhatsApp Access to Baldo Mindset</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Billing Setup */}
        <div className="checkout-billing-column">
          <form onSubmit={handlePaySubmit} className="checkout-billing-form glass-card">
            <h3>2. Payment Details</h3>

            <div className="payment-method-selector">
              <button
                type="button"
                className={`method-tab ${checkoutForm.paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setCheckoutForm(prev => ({ ...prev, paymentMethod: 'card' }))}
              >
                Credit Card
              </button>
              <button
                type="button"
                className={`method-tab ${checkoutForm.paymentMethod === 'paypal' ? 'active' : ''}`}
                onClick={() => setCheckoutForm(prev => ({ ...prev, paymentMethod: 'paypal' }))}
              >
                PayPal
              </button>
            </div>

            <div className="input-group">
              <label htmlFor="checkout-name">Cardholder Name</label>
              <input
                type="text"
                id="checkout-name"
                name="name"
                value={checkoutForm.name || ''}
                onChange={handleCheckoutChange}
                placeholder="Liss Almonte"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="checkout-email">Email Address</label>
              <input
                type="email"
                id="checkout-email"
                name="email"
                value={checkoutForm.email || ''}
                onChange={handleCheckoutChange}
                placeholder="name@email.com"
                required
              />
            </div>

            {checkoutForm.paymentMethod === 'card' ? (
              <>
                <div className="input-group">
                  <label htmlFor="checkout-cardNum">Card Number</label>
                  <input
                    type="text"
                    id="checkout-cardNum"
                    name="cardNum"
                    value={checkoutForm.cardNum || ''}
                    onChange={handleCheckoutChange}
                    placeholder="•••• •••• •••• ••••"
                    maxLength="19"
                    required
                  />
                </div>

                <div className="input-row-double">
                  <div className="input-group">
                    <label htmlFor="checkout-cardExp">Expiration Date</label>
                    <input
                      type="text"
                      id="checkout-cardExp"
                      name="cardExp"
                      value={checkoutForm.cardExp || ''}
                      onChange={handleCheckoutChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="checkout-cardCvc">CVC</label>
                    <input
                      type="text"
                      id="checkout-cardCvc"
                      name="cardCvc"
                      value={checkoutForm.cardCvc || ''}
                      onChange={handleCheckoutChange}
                      placeholder="123"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="paypal-instruction-box">
                <p>You will be redirected to PayPal to complete your payment securely. Click below to continue.</p>
              </div>
            )}

            <div className="order-summary-box">
              <h4>Order Summary</h4>
              <div className="summary-row">
                <span>Program:</span>
                <span>
                  {selectedTier === 'mindset' && '90-Day Mindset & Habits Academy'}
                  {selectedTier === 'accelerator' && 'Personal Brand & Business Accelerator'}
                  {selectedTier === 'inner-circle' && 'Elite 1-on-1 Mentorship (Inner Circle)'}
                </span>
              </div>
              <div className="summary-row total-row">
                <span>Total Due:</span>
                <span className="summary-total-price">
                  {selectedTier === 'mindset' && '$250 USD'}
                  {selectedTier === 'accelerator' && '$450 USD'}
                  {selectedTier === 'inner-circle' && '$950 USD'}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn checkout-pay-btn"
              disabled={isPaying}
              id="btn-pay-checkout"
            >
              {isPaying ? (
                <>
                  <RefreshCw className="spinner-icon" size={16} />
                  Processing Payment...
                </>
              ) : (
                <>
                  Pay & Enroll Now
                  <Shield size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal Overlay */}
      {paymentSuccess && (
        <div className="payment-success-overlay" id="checkout-success-modal">
          <div className="payment-success-card glass-card">
            <CheckCircle size={64} className="success-icon" />
            <h2>Registration Successful!</h2>
            <p className="success-message-lead">Welcome to the Academy, {checkoutForm.name || 'Champion'}.</p>
            <p>Your enrollment has been successfully processed for the <strong>
              {selectedTier === 'mindset' && '90-Day Mindset & Habits Academy'}
              {selectedTier === 'accelerator' && 'Personal Brand & Business Accelerator'}
              {selectedTier === 'inner-circle' && 'Elite 1-on-1 Mentorship (Inner Circle)'}
            </strong>.</p>
            <p className="success-instructions">We have sent a confirmation email with onboarding instructions and a link to join our private Discord community to <strong>{checkoutForm.email}</strong>.</p>
            <button onClick={handleCloseSuccessModal} className="primary-btn close-modal-btn">
              Go to Dashboard / Home
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
