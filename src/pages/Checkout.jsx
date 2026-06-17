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

export default function Checkout({ navigateToView, checkoutForm, setCheckoutForm, language = 'en' }) {
  const [selectedTier, setSelectedTier] = useState('mindset');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paypalError, setPaypalError] = useState(null);

  const handleCheckoutChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCloseSuccessModal = () => {
    setPaymentSuccess(false);
    setCheckoutForm({ name: '', email: '' });
    navigateToView('home');
  };

  const t = TRANSLATIONS[language];

  return (
    <PayPalScriptProvider options={PAYPAL_OPTIONS}>
    <section className="section checkout-section">
      <div className="section-header">
        <span className="section-subtitle">{t.checkoutSubtitle}</span>
        <h2 className="section-title">{t.checkoutTitle}</h2>
        <p className="section-desc">
          {t.checkoutDesc}
        </p>
      </div>

      <div className="checkout-grid">
        {/* Left Column: Tier Selection */}
        <div className="checkout-tiers-column">
          <h3>{language === 'es' ? '1. Selecciona tu Programa' : '1. Select Your Program'}</h3>

          <div className="tiers-selection-list">
            {/* Tier 1 */}
            <div
              className={`checkout-tier-card glass-card ${selectedTier === 'mindset' ? 'selected' : ''}`}
              onClick={() => setSelectedTier('mindset')}
            >
              <div className="tier-card-header">
                <div className="tier-title-wrap">
                  <h4>{t.billingTier1}</h4>
                  <p>{t.billingTier1Detail}</p>
                </div>
                <span className="tier-price">{t.billingTier1Price}</span>
              </div>
              <ul className="tier-features">
                {language === 'es' ? (
                  <>
                    <li><CheckCircle size={14} className="feat-check" /> 90 Días de protocolos mentales estructurados</li>
                    <li><CheckCircle size={14} className="feat-check" /> Mentoría semanal en vivo con Baldo Mindset</li>
                    <li><CheckCircle size={14} className="feat-check" /> Acceso a comunidad privada de crecimiento</li>
                  </>
                ) : (
                  <>
                    <li><CheckCircle size={14} className="feat-check" /> 90 Days of Structured Mindset Protocols</li>
                    <li><CheckCircle size={14} className="feat-check" /> Weekly Live Mentorship with Baldo Mindset</li>
                    <li><CheckCircle size={14} className="feat-check" /> Private Growth & Support Community Access</li>
                  </>
                )}
              </ul>
            </div>

            {/* Tier 2 */}
            <div
              className={`checkout-tier-card glass-card ${selectedTier === 'accelerator' ? 'selected' : ''}`}
              onClick={() => setSelectedTier('accelerator')}
            >
              <div className="tier-card-header">
                <div className="tier-title-wrap">
                  <h4>{language === 'es' ? 'Acelerador de Marca Personal y Negocios' : 'Personal Brand & Business Accelerator'}</h4>
                  <p>{language === 'es' ? 'Plan de mentalidad de 90 días + lanzamiento de negocio pasional.' : 'Full 90-day mindset + passion business launch plan.'}</p>
                </div>
                <span className="tier-price">$450</span>
              </div>
              <ul className="tier-features">
                {language === 'es' ? (
                  <>
                    <li><CheckCircle size={14} className="feat-check" /> Incluye Academia de Mentalidad y Hábitos de 90 días</li>
                    <li><CheckCircle size={14} className="feat-check" /> Guía completa de marca personal y estrategia de escala</li>
                    <li><CheckCircle size={14} className="feat-check" /> Monetización paso a paso para pasar de la pasión al ingreso</li>
                  </>
                ) : (
                  <>
                    <li><CheckCircle size={14} className="feat-check" /> Complete 90-Day Mindset & Habits Academy</li>
                    <li><CheckCircle size={14} className="feat-check" /> Personal Branding Blueprint & Scale Strategy</li>
                    <li><CheckCircle size={14} className="feat-check" /> Passion-to-Income Monetization Step-by-Step</li>
                  </>
                )}
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
                    <h4>{language === 'es' ? 'Mentoría Élite 1-a-1 (Inner Circle)' : 'Elite 1-on-1 Mentorship (Inner Circle)'}</h4>
                    <span className="popular-badge">ELITE</span>
                  </div>
                  <p>{language === 'es' ? 'Máxima rendición de cuentas directa y planes personalizados.' : 'Maximum direct accountability and custom blueprints.'}</p>
                </div>
                <span className="tier-price">$950</span>
              </div>
              <ul className="tier-features">
                {language === 'es' ? (
                  <>
                    <li><CheckCircle size={14} className="feat-check" /> Acceso completo a programas de Mentalidad + Negocio</li>
                    <li><CheckCircle size={14} className="feat-check" /> Llamadas semanales privadas 1-a-1 de mentoría</li>
                    <li><CheckCircle size={14} className="feat-check" /> Acceso directo por WhatsApp con Baldo Mindset</li>
                  </>
                ) : (
                  <>
                    <li><CheckCircle size={14} className="feat-check" /> Complete Mindset + Business programs</li>
                    <li><CheckCircle size={14} className="feat-check" /> Weekly 1-on-1 Private Mentorship Calls</li>
                    <li><CheckCircle size={14} className="feat-check" /> Direct WhatsApp Access to Baldo Mindset</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Billing Setup */}
        <div className="checkout-billing-column">
          <div className="checkout-billing-form glass-card">
            <h3>{language === 'es' ? '2. Tus Datos' : '2. Your Details'}</h3>

            <div className="input-group">
              <label htmlFor="checkout-name">{language === 'es' ? 'Nombre Completo' : 'Full Name'}</label>
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
              <label htmlFor="checkout-email">{t.fieldEmail}</label>
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

            <div className="paypal-instruction-box">
              <p>
                {language === 'es'
                  ? 'Paga de forma segura con tu cuenta de PayPal o con tarjeta de crédito/débito — tú eliges en el siguiente paso.'
                  : 'Pay securely with your PayPal account or a credit/debit card — you choose in the next step.'}
              </p>
            </div>

            <div className="order-summary-box">
              <h4>{t.summaryHeader}</h4>
              <div className="summary-row">
                <span>{language === 'es' ? 'Programa:' : 'Program:'}</span>
                <span>
                  {selectedTier === 'mindset' && t.billingTier1}
                  {selectedTier === 'accelerator' && (language === 'es' ? 'Acelerador de Marca y Negocios' : 'Personal Brand & Business Accelerator')}
                  {selectedTier === 'inner-circle' && (language === 'es' ? 'Mentoría Élite 1-a-1 (Inner Circle)' : 'Elite 1-on-1 Mentorship (Inner Circle)')}
                </span>
              </div>
              <div className="summary-row total-row">
                <span>{language === 'es' ? 'Total a Pagar:' : 'Total Due:'}</span>
                <span className="summary-total-price">
                  {selectedTier === 'mindset' && '$250 USD'}
                  {selectedTier === 'accelerator' && '$450 USD'}
                  {selectedTier === 'inner-circle' && '$950 USD'}
                </span>
              </div>
            </div>

            <div className="paypal-buttons-wrap">
              {paypalError && <p className="payment-error-msg">{paypalError}</p>}
              <PayPalButtons
                  style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' }}
                  disabled={!checkoutForm.name || !checkoutForm.email}
                  forceReRender={[selectedTier, checkoutForm.name, checkoutForm.email]}
                  createOrder={async () => {
                    setPaypalError(null);
                    const response = await fetch('/api/paypal/create-order', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ tier: selectedTier }),
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
                      setPaypalError(
                        language === 'es'
                          ? 'Hubo un error al procesar el pago con PayPal. Por favor intenta de nuevo.'
                          : 'There was an error processing your PayPal payment. Please try again.'
                      );
                    }
                  }}
                  onError={() => {
                    setPaypalError(
                      language === 'es'
                        ? 'Hubo un error al procesar el pago con PayPal. Por favor intenta de nuevo.'
                        : 'There was an error processing your PayPal payment. Please try again.'
                    );
                  }}
                />
              </div>
          </div>
        </div>
      </div>

      {/* Success Modal Overlay */}
      {paymentSuccess && (
        <div className="payment-success-overlay" id="checkout-success-modal">
          <div className="payment-success-card glass-card">
            <CheckCircle size={64} className="success-icon" />
            <h2>{t.successPayHeader}</h2>
            <p className="success-message-lead">
              {language === 'es' ? `¡Bienvenido a la Academia, ${checkoutForm.name || 'Campeón'}!` : `Welcome to the Academy, ${checkoutForm.name || 'Champion'}.`}
            </p>
            <p>
              {language === 'es' ? 'Tu inscripción ha sido procesada con éxito para ' : 'Your enrollment has been successfully processed for '}
              <strong>
                {selectedTier === 'mindset' && t.billingTier1}
                {selectedTier === 'accelerator' && (language === 'es' ? 'Acelerador de Marca Personal y Negocios' : 'Personal Brand & Business Accelerator')}
                {selectedTier === 'inner-circle' && (language === 'es' ? 'Mentoría Élite 1-a-1 (Inner Circle)' : 'Elite 1-on-1 Mentorship (Inner Circle)')}
              </strong>.
            </p>
            <p className="success-instructions">
              {language === 'es'
                ? `Hemos enviado un correo de confirmación con instrucciones de incorporación y un enlace para unirte a nuestra comunidad privada a `
                : `We have sent a confirmation email with onboarding instructions and a link to join our private community to `}
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
