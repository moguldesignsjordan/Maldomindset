import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';

import { auth, db, isFirebaseConfigured } from '../lib/firebase';

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  // Track the signed-in user
  useEffect(() => {
    if (!isFirebaseConfigured) return;
    return onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        setProfile(null);
        setEnrollment(null);
      }
      setLoading(false);
    });
  }, []);

  // Mirror the user's profile document, which carries their role
  useEffect(() => {
    if (!isFirebaseConfigured || !user) return;
    return onSnapshot(doc(db, 'users', user.uid), (snap) => {
      setProfile(snap.exists() ? { id: snap.id, ...snap.data() } : null);
    });
  }, [user]);

  // Enrollment is keyed by email so a purchase made before signup still lands
  useEffect(() => {
    // Sign-out already clears this, so there is nothing to reset here
    if (!isFirebaseConfigured || !user?.email) return;
    const emailKey = user.email.toLowerCase();
    return onSnapshot(doc(db, 'enrollments', emailKey), (snap) => {
      setEnrollment(snap.exists() ? { id: snap.id, ...snap.data() } : null);
    });
  }, [user]);

  const signup = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });

    // Claim an admin seat only if this email is on the bootstrap allowlist and
    // no admin exists yet; everyone else is a student. Firestore rules enforce
    // that a user can never promote themselves afterwards.
    const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const role = adminEmails.includes(email.toLowerCase()) ? 'admin' : 'student';

    await setDoc(doc(db, 'users', cred.user.uid), {
      name,
      email: email.toLowerCase(),
      role,
      createdAt: serverTimestamp(),
    });
    return cred.user;
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // Used right after signup, before the profile snapshot has arrived
  const fetchProfileOnce = async (uid) => {
    const snap = await getDoc(doc(db, 'users', uid));
    return snap.exists() ? snap.data() : null;
  };

  const value = useMemo(
    () => ({
      user,
      profile,
      enrollment,
      loading,
      isAdmin: profile?.role === 'admin',
      isConfigured: isFirebaseConfigured,
      signup,
      login,
      logout,
      resetPassword,
      fetchProfileOnce,
    }),
    [user, profile, enrollment, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
