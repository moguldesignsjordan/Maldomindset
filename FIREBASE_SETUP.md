# Academy Backend Setup (Firebase)

The Academy accounts, dashboards and auto-enrollment run on Firebase Auth +
Firestore. The public site works without any of this configured; only the
account area needs it, and it says so plainly if the keys are missing.

## 1. Create the Firebase project

1. Go to <https://console.firebase.google.com> and create a project.
2. **Build > Authentication > Get started**, enable the **Email/Password** provider.
3. **Build > Firestore Database > Create database**, start in **production mode**.

## 2. Client keys (browser)

**Project settings > General > Your apps > Web app**. Copy the config values into
your `.env` (and into Vercel's environment variables):

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

These are public by design. Firestore security rules, not secrecy, are what
protect the data.

## 3. Admin accounts

```
VITE_ADMIN_EMAILS=you@example.com,partner@example.com
```

Anyone signing up with an email on this list gets `role: "admin"` on their
profile and sees the Admin link in the header. Everyone else is a student. The
security rules block a user from changing their own role afterwards, so the list
only matters at signup time.

## 4. Service account (serverless functions)

**Project settings > Service accounts > Generate new private key**. From the
downloaded JSON:

```
FIREBASE_PROJECT_ID=<project_id>
FIREBASE_CLIENT_EMAIL=<client_email>
FIREBASE_PRIVATE_KEY="<private_key, keeping the \n sequences escaped>"
```

Keep the whole private key in quotes on one line. This is a secret: never expose
it to the browser, and never commit it.

## 5. Deploy the security rules

`firestore.rules` in the repo root is the source of truth. Either paste it into
**Firestore > Rules** in the console, or with the Firebase CLI:

```bash
firebase deploy --only firestore:rules
```

Without these rules Firestore's default deny-all blocks the dashboards, and a
permissive rule set would expose every student's data.

## Data model

| Collection | Doc ID | Written by | Holds |
|---|---|---|---|
| `users` | auth uid | the user at signup | name, email, `role` |
| `enrollments` | lowercased email | checkout function, or an admin | `tier`, status, source, order id |
| `content` | tier id | admin | `modules[]` shown in student dashboards |
| `progress` | auth uid | the student | completed modules, daily check-ins |
| `orders` | PayPal order id | checkout function only | payment record for the admin view |

Enrollments are keyed by **email**, not uid, so someone who pays before creating
an account still finds their program waiting when they sign up with the same
address.

## Local development note

`npm run dev` serves the frontend only; the `/api/*` functions do not run, the
same as the existing PayPal routes. Auth and both dashboards work fine locally
against the real Firebase project. To exercise auto-enrollment end to end, use
`vercel dev` or a preview deployment.
