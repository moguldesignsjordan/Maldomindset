import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import { TRANSLATIONS } from '../constants/translations';

// PayPal's "test" client ID renders the buttons without crashing when
// VITE_PAYPAL_CLIENT_ID hasn't been configured yet; real payments require the real client ID.
const PAYPAL_OPTIONS = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
  currency: 'USD',
  intent: 'capture',
};

// This checkout only ever sells the 90-Day Challenge.
const CHALLENGE_TIER = 'mindset';

export default function ChallengeCheckout({ navigateToView, checkoutForm, setCheckoutForm, language = 'en' }) {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paypalError, setPaypalError] = useState(null);

  const t = TRANSLATIONS[language];
  const challenge = t.programs.find((p) => p.id === CHALLENGE_TIER);

  const handleCheckoutChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCloseSuccessModal = () => {
    setPaymentSuccess(false);
    setCheckoutForm({ name: '', email: '' });
    navigateToView('home');
  };

  const paymentErrorMsg = language === 'es'
    ? 'Hubo un error al procesar el pago con PayPal. Por favor intenta de nuevo.'
    : 'There was an error processing your PayPal payment. Please try again.';

  return (
    <PayPalScriptProvider options={PAYPAL_OPTIONS}>
      <section className="section checkout-section challenge-checkout-section">
        <div className="section-header">
          <span className="section-subtitle">{t.challengeCheckoutSubtitle}</span>
          <h2 className="section-title">{t.challengeCheckoutTitle}</h2>
          <p className="section-desc">{t.challengeCheckoutDesc}</p>
        </div>

        <div className="challenge-checkout-grid">
          {/* Left: the single program being purchased */}
          <div className="challenge-checkout-summary glass-card">
            <h3 className="program-name">{challenge.name}</h3>
            <p className="program-tagline">{challenge.tagline}</p>

            <div className="program-price-block">
              <span className="program-price">{challenge.price}</span>
              <span className="program-price-note">{challenge.priceNote}</span>
            </div>

            <span className="program-includes-label">{t.programsIncludesLabel}</span>
            <ul className="program-features">
              {challenge.features.map((feature, i) => (
                <li key={i}>
                  <CheckCircle size={16} className="benefit-icon" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: details + payment */}
          <div className="checkout-billing-column">
            <div className="checkout-billing-form glass-card">
              <h3>{language === 'es' ? 'Tus Datos' : 'Your Details'}</h3>

              <div className="input-group">
                <label htmlFor="challenge-name">{language === 'es' ? 'Nombre Completo' : 'Full Name'}</label>
                <input
                  type="text"
                  id="challenge-name"
                  name="name"
                  value={checkoutForm.name || ''}
                  onChange={handleCheckoutChange}
                  placeholder="Liss Almonte"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="challenge-email">{t.fieldEmail}</label>
                <input
                  type="email"
                  id="challenge-email"
                  name="email"
                  value={checkoutForm.email || ''}
                  onChange={handleCheckoutChange}
                  placeholder="name@email.com"
                  required
                />
              </div>

              <div className="paypal-instruction-box">
                <p>
                  {language === 'es'
                    ? 'Paga de forma segura con tu cuenta de PayPal o con tarjeta de crédito/débito. Tú eliges en el siguiente paso.'
                    : 'Pay securely with your PayPal account or a credit/debit card. You choose in the next step.'}
                </p>
              </div>

              <div className="order-summary-box">
                <h4>{t.challengeOrderHeader}</h4>
                <div className="summary-row">
                  <span>{language === 'es' ? 'Programa:' : 'Program:'}</span>
                  <span>{challenge.name}</span>
                </div>
                <div className="summary-row total-row">
                  <span>{language === 'es' ? 'Total a Pagar:' : 'Total Due:'}</span>
                  <span className="summary-total-price">{challenge.price}</span>
                </div>
              </div>

              <div className="paypal-buttons-wrap">
                {paypalError && <p className="payment-error-msg">{paypalError}</p>}
                <PayPalButtons
                  style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' }}
                  disabled={!checkoutForm.name || !checkoutForm.email}
                  forceReRender={[checkoutForm.name, checkoutForm.email]}
                  createOrder={async () => {
                    setPaypalError(null);
                    const response = await fetch('/api/paypal/create-order', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ tier: CHALLENGE_TIER }),
                    });
                    const order = await response.json();
                    if (!response.ok) throw new Error(order.error || 'Failed to create order');
                    return order.id;
                  }}
                  onApprove={async (data) => {
                    try {
                      const response = await fetch('/api/paypal/capture-order', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ orderID: data.orderID }),
                      });
                      const capture = await response.json();
                      if (!response.ok) throw new Error(capture.error || 'Failed to capture payment');
                      setPaymentSuccess(true);
                    } catch {
                      setPaypalError(paymentErrorMsg);
                    }
                  }}
                  onError={() => setPaypalError(paymentErrorMsg)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="page-back-nav flex-center" style={{ paddingTop: '40px' }}>
          <button onClick={() => navigateToView('challenge')} className="secondary-btn">
            {t.challengeBackBtn}
          </button>
        </div>

        {/* Success Modal Overlay */}
        {paymentSuccess && (
          <div className="payment-success-overlay" id="challenge-checkout-success-modal">
            <div className="payment-success-card glass-card">
              <CheckCircle size={64} className="success-icon" />
              <h2>{t.successPayHeader}</h2>
              <p className="success-message-lead">
                {language === 'es'
                  ? `¡Bienvenido al Reto de 90 Días, ${checkoutForm.name || 'Campeón'}!`
                  : `Welcome to the 90-Day Challenge, ${checkoutForm.name || 'Champion'}.`}
              </p>
              <p>
                {language === 'es'
                  ? 'Tu inscripción ha sido procesada con éxito para '
                  : 'Your enrollment has been successfully processed for '}
                <strong>{challenge.name}</strong>.
              </p>
              <p className="success-instructions">
                {language === 'es'
                  ? 'Hemos enviado un correo de confirmación con instrucciones de incorporación y un enlace para unirte a nuestra comunidad privada a '
                  : 'We have sent a confirmation email with onboarding instructions and a link to join our private community to '}
                <strong>{checkoutForm.email}</strong>.
              </p>
              <button onClick={handleCloseSuccessModal} className="primary-btn close-modal-btn">
                {language === 'es' ? 'Ir al Inicio' : 'Go to Dashboard / Home'}
              </button>
            </div>
          </div>
        )}
      </section>
    </PayPalScriptProvider>
  );
}
