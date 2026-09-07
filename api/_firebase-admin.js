import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Server-side Firestore access for the checkout functions. Credentials come from
// a service account; the private key is stored with literal \n sequences because
// environment variables cannot hold real newlines.
export function getAdminDb() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) return null;

  const app =
    getApps()[0] ??
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });

  return getFirestore(app);
}
