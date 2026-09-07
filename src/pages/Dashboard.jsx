import { useEffect, useState } from 'react';
import { CheckCircle, Circle, Flame, Lock, LogOut, Calendar } from 'lucide-react';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { TRANSLATIONS } from '../constants/translations';

const CHALLENGE_DAYS = 90;

// Local YYYY-MM-DD, so a check-in belongs to the student's own day
function dayKey(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

// Consecutive days ending today (or yesterday, so an unchecked today doesn't
// wipe a streak the student can still save)
function currentStreak(checkins) {
  let streak = 0;
  const cursor = new Date();
  if (!checkins[dayKey(cursor)]) cursor.setDate(cursor.getDate() - 1);
  while (checkins[dayKey(cursor)]) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export default function Dashboard({ navigateToView, language = 'en' }) {
  const t = TRANSLATIONS[language];
  const { user, profile, enrollment, logout } = useAuth();

  const [content, setContent] = useState(null);
  const [progress, setProgress] = useState({ modules: {}, checkins: {} });
  const tier = enrollment?.tier;

  // Modules for the enrolled program, authored by the admin
  useEffect(() => {
    if (!tier) return;
    return onSnapshot(doc(db, 'content', tier), (snap) => {
      setContent(snap.exists() ? snap.data() : { modules: [] });
    });
  }, [tier]);

  // This student's completion + check-in state
  useEffect(() => {
    if (!user) return;
    return onSnapshot(doc(db, 'progress', user.uid), (snap) => {
      const data = snap.data() || {};
      setProgress({ modules: data.modules || {}, checkins: data.checkins || {} });
    });
  }, [user]);

  const saveProgress = async (patch) => {
    const ref = doc(db, 'progress', user.uid);
    try {
      await updateDoc(ref, patch);
    } catch {
      // First write for this student: the document does not exist yet
      await setDoc(ref, { modules: {}, checkins: {}, ...patch }, { merge: true });
    }
  };

  const toggleModule = (moduleId) =>
    saveProgress({ [`modules.${moduleId}`]: !progress.modules[moduleId] });

  const toggleDay = (key) => saveProgress({ [`checkins.${key}`]: !progress.checkins[key] });

  const handleLogout = async () => {
    await logout();
    navigateToView('home');
  };

  const modules = content?.modules || [];
  const doneCount = modules.filter((m) => progress.modules[m.id]).length;
  const percent = modules.length ? Math.round((doneCount / modules.length) * 100) : 0;
  const streak = currentStreak(progress.checkins);
  const checkedTotal = Object.values(progress.checkins).filter(Boolean).length;
  const today = dayKey();

  // A fixed 90-day board anchored to the enrollment date
  const startDate = enrollment?.startedAt?.toDate?.() || enrollment?.createdAt?.toDate?.() || new Date();
  const days = Array.from({ length: CHALLENGE_DAYS }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return { index: i + 1, key: dayKey(d), future: d > new Date() };
  });

  return (
    <section className="section dashboard-section">
      <div className="dashboard-topbar">
        <div>
          <span className="section-subtitle">{t.dashSubtitle}</span>
          <h2 className="dashboard-greeting">
            {t.dashGreeting}, {profile?.name || user?.displayName || ''}
          </h2>
        </div>
        <button onClick={handleLogout} className="secondary-btn dashboard-logout">
          <LogOut size={15} /> {t.dashLogout}
        </button>
      </div>

      {!enrollment ? (
        <div className="dashboard-locked glass-card">
          <Lock size={34} className="auth-warning-icon" />
          <h3>{t.dashNoEnrollTitle}</h3>
          <p>{t.dashNoEnrollDesc}</p>
          <button onClick={() => navigateToView('academy')} className="primary-btn">
            {t.dashSeePrograms}
          </button>
        </div>
      ) : (
        <>
          <div className="dashboard-stats">
            <div className="dash-stat glass-card">
              <span className="dash-stat-label">{t.dashProgram}</span>
              <span className="dash-stat-value">{enrollment.programName || tier}</span>
            </div>
            <div className="dash-stat glass-card">
              <span className="dash-stat-label">{t.dashProgress}</span>
              <span className="dash-stat-value">{percent}%</span>
              <div className="dash-progress-track">
                <div className="dash-progress-fill" style={{ width: `${percent}%` }} />
              </div>
            </div>
            <div className="dash-stat glass-card">
              <span className="dash-stat-label">{t.dashStreak}</span>
              <span className="dash-stat-value">
                <Flame size={20} className="streak-icon" /> {streak}
              </span>
            </div>
            <div className="dash-stat glass-card">
              <span className="dash-stat-label">{t.dashDaysLogged}</span>
              <span className="dash-stat-value">{checkedTotal} / {CHALLENGE_DAYS}</span>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Modules */}
            <div className="dashboard-panel glass-card">
              <h3>{t.dashModulesHeader}</h3>
              {modules.length === 0 ? (
                <p className="dashboard-empty">{t.dashModulesEmpty}</p>
              ) : (
                <ul className="module-list">
                  {modules.map((module) => {
                    const done = Boolean(progress.modules[module.id]);
                    return (
                      <li key={module.id}>
                        <button
                          className={`module-item ${done ? 'done' : ''}`}
                          onClick={() => toggleModule(module.id)}
                        >
                          {done ? <CheckCircle size={18} /> : <Circle size={18} />}
                          <span className="module-text">
                            <span className="module-title">{module.title}</span>
                            {module.description && (
                              <span className="module-desc">{module.description}</span>
                            )}
                          </span>
                        </button>
                        {module.link && (
                          <a
                            href={module.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="module-link"
                          >
                            {t.dashOpenLesson}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* 90-day tracker */}
            <div className="dashboard-panel glass-card">
              <h3><Calendar size={18} /> {t.dashTrackerHeader}</h3>
              <p className="dashboard-panel-desc">{t.dashTrackerDesc}</p>
              <div className="tracker-grid">
                {days.map((day) => {
                  const checked = Boolean(progress.checkins[day.key]);
                  return (
                    <button
                      key={day.key}
                      title={day.key}
                      disabled={day.future}
                      onClick={() => toggleDay(day.key)}
                      className={`tracker-day ${checked ? 'checked' : ''} ${day.key === today ? 'today' : ''}`}
                    >
                      {day.index}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
