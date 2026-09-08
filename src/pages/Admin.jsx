import { useEffect, useState } from 'react';
import { Users, BookOpen, CreditCard, Plus, Trash2, ShieldAlert } from 'lucide-react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { TRANSLATIONS } from '../constants/translations';

const TIERS = ['mindset', 'accelerator', 'inner-circle'];

function formatDate(value) {
  const date = value?.toDate?.();
  return date ? date.toLocaleDateString() : '';
}

export default function Admin({ navigateToView, language = 'en' }) {
  const t = TRANSLATIONS[language];
  const { isAdmin, loading } = useAuth();

  const [tab, setTab] = useState('students');
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [contentTier, setContentTier] = useState('mindset');
  const [modules, setModules] = useState([]);
  const [draft, setDraft] = useState({
    title_es: '',
    title_en: '',
    description_es: '',
    description_en: '',
    link: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    const unsubUsers = onSnapshot(collection(db, 'users'), (snap) =>
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubEnroll = onSnapshot(collection(db, 'enrollments'), (snap) =>
      setEnrollments(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubOrders = onSnapshot(
      query(collection(db, 'orders'), orderBy('createdAt', 'desc')),
      (snap) => setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      () => setOrders([])
    );
    return () => {
      unsubUsers();
      unsubEnroll();
      unsubOrders();
    };
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    return onSnapshot(doc(db, 'content', contentTier), (snap) =>
      setModules(snap.data()?.modules || [])
    );
  }, [isAdmin, contentTier]);

  const enrollmentFor = (email) =>
    enrollments.find((e) => e.id === (email || '').toLowerCase());

  const grantAccess = async (email, tier) => {
    const key = email.toLowerCase();
    if (!tier) {
      await deleteDoc(doc(db, 'enrollments', key));
      return;
    }
    await setDoc(
      doc(db, 'enrollments', key),
      {
        email: key,
        tier,
        status: 'active',
        source: 'admin',
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  const saveModules = async (next) => {
    setSaving(true);
    await setDoc(doc(db, 'content', contentTier), { modules: next }, { merge: true });
    setSaving(false);
  };

  const addModule = async (e) => {
    e.preventDefault();
    if (!draft.title_es.trim() && !draft.title_en.trim()) return;
    const next = [
      ...modules,
      {
        id: `m${Date.now()}`,
        title_es: draft.title_es.trim(),
        title_en: draft.title_en.trim(),
        description_es: draft.description_es.trim(),
        description_en: draft.description_en.trim(),
        link: draft.link.trim(),
      },
    ];
    await saveModules(next);
    setDraft({ title_es: '', title_en: '', description_es: '', description_en: '', link: '' });
  };

  // Modules may predate the bilingual fields, so fall back the same way the
  // student dashboard does.
  const moduleTitle = (module) => module.title_es || module.title_en || module.title || '';
  const moduleDesc = (module) =>
    module.description_es || module.description_en || module.description || '';

  const removeModule = (id) => saveModules(modules.filter((m) => m.id !== id));

  if (loading) return <section className="section"><p>{t.authWorking}</p></section>;

  if (!isAdmin) {
    return (
      <section className="section auth-section">
        <div className="auth-card glass-card">
          <ShieldAlert size={32} className="auth-warning-icon" />
          <h2>{t.adminDeniedTitle}</h2>
          <p>{t.adminDeniedDesc}</p>
          <button onClick={() => navigateToView('dashboard')} className="secondary-btn">
            {t.adminBackToDash}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section admin-section">
      <div className="section-header">
        <span className="section-subtitle">{t.adminSubtitle}</span>
        <h2 className="section-title">{t.adminTitle}</h2>
      </div>

      <div className="admin-tabs">
        <button className={tab === 'students' ? 'active' : ''} onClick={() => setTab('students')}>
          <Users size={15} /> {t.adminTabStudents} ({users.length})
        </button>
        <button className={tab === 'content' ? 'active' : ''} onClick={() => setTab('content')}>
          <BookOpen size={15} /> {t.adminTabContent}
        </button>
        <button className={tab === 'payments' ? 'active' : ''} onClick={() => setTab('payments')}>
          <CreditCard size={15} /> {t.adminTabPayments} ({orders.length})
        </button>
      </div>

      {tab === 'students' && (
        <div className="admin-panel glass-card">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t.adminColName}</th>
                  <th>{t.fieldEmail}</th>
                  <th>{t.adminColJoined}</th>
                  <th>{t.adminColAccess}</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr><td colSpan={4} className="admin-empty">{t.adminNoStudents}</td></tr>
                )}
                {users.map((student) => {
                  const current = enrollmentFor(student.email);
                  return (
                    <tr key={student.id}>
                      <td>
                        {student.name}
                        {student.role === 'admin' && <span className="admin-role-tag">ADMIN</span>}
                      </td>
                      <td>{student.email}</td>
                      <td>{formatDate(student.createdAt)}</td>
                      <td>
                        <select
                          value={current?.tier || ''}
                          onChange={(e) => grantAccess(student.email, e.target.value)}
                        >
                          <option value="">{t.adminNoAccess}</option>
                          {TIERS.map((tier) => (
                            <option key={tier} value={tier}>{tier}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'content' && (
        <div className="admin-panel glass-card">
          <div className="admin-tier-picker">
            {TIERS.map((tier) => (
              <button
                key={tier}
                className={contentTier === tier ? 'active' : ''}
                onClick={() => setContentTier(tier)}
              >
                {tier}
              </button>
            ))}
          </div>

          <ul className="admin-module-list">
            {modules.length === 0 && <li className="admin-empty">{t.adminNoModules}</li>}
            {modules.map((module) => (
              <li key={module.id}>
                <div>
                  <strong>{moduleTitle(module)}</strong>
                  {module.title_en && module.title_es && (
                    <p className="admin-module-alt">EN: {module.title_en}</p>
                  )}
                  {moduleDesc(module) && <p>{moduleDesc(module)}</p>}
                  {module.link && <a href={module.link} target="_blank" rel="noopener noreferrer">{module.link}</a>}
                </div>
                <button onClick={() => removeModule(module.id)} aria-label={t.adminRemove}>
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={addModule} className="admin-module-form">
            <input
              value={draft.title_es}
              onChange={(e) => setDraft({ ...draft, title_es: e.target.value })}
              placeholder={`${t.adminModuleTitle} (ES)`}
              required
            />
            <input
              value={draft.title_en}
              onChange={(e) => setDraft({ ...draft, title_en: e.target.value })}
              placeholder={`${t.adminModuleTitle} (EN)`}
            />
            <input
              value={draft.description_es}
              onChange={(e) => setDraft({ ...draft, description_es: e.target.value })}
              placeholder={`${t.adminModuleDesc} (ES)`}
            />
            <input
              value={draft.description_en}
              onChange={(e) => setDraft({ ...draft, description_en: e.target.value })}
              placeholder={`${t.adminModuleDesc} (EN)`}
            />
            <input
              value={draft.link}
              onChange={(e) => setDraft({ ...draft, link: e.target.value })}
              placeholder={t.adminModuleLink}
              type="url"
            />
            <button type="submit" className="primary-btn" disabled={saving}>
              <Plus size={15} /> {t.adminAddModule}
            </button>
          </form>
        </div>
      )}

      {tab === 'payments' && (
        <div className="admin-panel glass-card">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t.adminColDate}</th>
                  <th>{t.fieldEmail}</th>
                  <th>{t.adminColProgram}</th>
                  <th>{t.adminColAmount}</th>
                  <th>{t.adminColAccount}</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 && (
                  <tr><td colSpan={5} className="admin-empty">{t.adminNoOrders}</td></tr>
                )}
                {orders.map((order) => {
                  const hasAccount = users.some(
                    (u) => u.email === (order.email || '').toLowerCase()
                  );
                  return (
                    <tr key={order.id}>
                      <td>{formatDate(order.createdAt)}</td>
                      <td>{order.email}</td>
                      <td>{order.tier}</td>
                      <td>{order.amount ? `$${order.amount}` : ''}</td>
                      <td>
                        <span className={`order-account-tag ${hasAccount ? 'yes' : 'no'}`}>
                          {hasAccount ? t.adminAccountYes : t.adminAccountNo}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
