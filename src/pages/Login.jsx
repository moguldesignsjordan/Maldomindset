import { useState } from 'react';
import { Lock, Mail, User, AlertCircle, CheckCircle } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { TRANSLATIONS } from '../constants/translations';

// Firebase error codes mapped to copy a student can act on
const ERROR_KEYS = {
  'auth/invalid-credential': 'authErrInvalidCredential',
  'auth/invalid-email': 'authErrInvalidEmail',
  'auth/user-not-found': 'authErrInvalidCredential',
  'auth/wrong-password': 'authErrInvalidCredential',
  'auth/email-already-in-use': 'authErrEmailInUse',
  'auth/weak-password': 'authErrWeakPassword',
  'auth/too-many-requests': 'authErrTooMany',
};

export default function Login({ navigateToView, language = 'en' }) {
  const t = TRANSLATIONS[language];
  const { login, signup, resetPassword, isConfigured } = useAuth();

  // 'login' | 'signup' | 'reset'
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const switchMode = (next) => {
    setMode(next);
    setError(null);
    setNotice(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    try {
      if (mode === 'login') {
        await login(form.email.trim(), form.password);
        navigateToView('dashboard');
      } else if (mode === 'signup') {
        await signup(form.name.trim(), form.email.trim(), form.password);
        navigateToView('dashboard');
      } else {
        await resetPassword(form.email.trim());
        setNotice(t.authResetSent);
      }
    } catch (err) {
      setError(t[ERROR_KEYS[err.code]] || t.authErrGeneric);
    } finally {
      setBusy(false);
    }
  };

  if (!isConfigured) {
    return (
      <section className="section auth-section">
        <div className="auth-card glass-card">
          <AlertCircle size={32} className="auth-warning-icon" />
          <h2>{t.authNotConfiguredTitle}</h2>
          <p>{t.authNotConfiguredDesc}</p>
        </div>
      </section>
    );
  }

  const heading =
    mode === 'login' ? t.authLoginTitle : mode === 'signup' ? t.authSignupTitle : t.authResetTitle;
  const lead =
    mode === 'login' ? t.authLoginDesc : mode === 'signup' ? t.authSignupDesc : t.authResetDesc;

  return (
    <section className="section auth-section">
      <div className="auth-card glass-card">
        <div className="auth-header">
          <span className="section-subtitle">{t.authSubtitle}</span>
          <h2>{heading}</h2>
          <p>{lead}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="input-group">
              <label htmlFor="auth-name">{t.authNameLabel}</label>
              <div className="input-with-icon">
                <User size={16} />
                <input
                  id="auth-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Liss Almonte"
                  required
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label htmlFor="auth-email">{t.fieldEmail}</label>
            <div className="input-with-icon">
              <Mail size={16} />
              <input
                id="auth-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@email.com"
                required
              />
            </div>
          </div>

          {mode !== 'reset' && (
            <div className="input-group">
              <label htmlFor="auth-password">{t.authPasswordLabel}</label>
              <div className="input-with-icon">
                <Lock size={16} />
                <input
                  id="auth-password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>
            </div>
          )}

          {error && (
            <p className="auth-error">
              <AlertCircle size={15} /> {error}
            </p>
          )}
          {notice && (
            <p className="auth-notice">
              <CheckCircle size={15} /> {notice}
            </p>
          )}

          <button type="submit" className="primary-btn auth-submit-btn" disabled={busy}>
            {busy
              ? t.authWorking
              : mode === 'login'
                ? t.authLoginBtn
                : mode === 'signup'
                  ? t.authSignupBtn
                  : t.authResetBtn}
          </button>
        </form>

        <div className="auth-switch">
          {mode === 'login' && (
            <>
              <button type="button" onClick={() => switchMode('reset')}>{t.authForgot}</button>
              <span>
                {t.authNoAccount}{' '}
                <button type="button" onClick={() => switchMode('signup')}>{t.authSignupBtn}</button>
              </span>
            </>
          )}
          {mode === 'signup' && (
            <span>
              {t.authHaveAccount}{' '}
              <button type="button" onClick={() => switchMode('login')}>{t.authLoginBtn}</button>
            </span>
          )}
          {mode === 'reset' && (
            <button type="button" onClick={() => switchMode('login')}>{t.authBackToLogin}</button>
          )}
        </div>
      </div>
    </section>
  );
}
