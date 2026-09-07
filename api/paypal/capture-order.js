import { getAccessToken, PAYPAL_API_BASE, TIER_LABELS } from '../_paypal.js';
import { getAdminDb } from '../_firebase-admin.js';
import { FieldValue } from 'firebase-admin/firestore';

// Records the payment and grants program access. Keyed by email so a student who
// pays before creating an account still finds the program waiting once they do.
async function recordEnrollment({ orderID, capture, tier, email, amount }) {
  const db = getAdminDb();
  if (!db || !email) return;

  const key = email.toLowerCase();
  const now = FieldValue.serverTimestamp();

  await db.collection('orders').doc(orderID).set({
    orderID,
    email: key,
    tier: tier || null,
    amount: amount || null,
    status: capture.status || 'COMPLETED',
    createdAt: now,
  });

  await db.collection('enrollments').doc(key).set(
    {
      email: key,
      tier,
      programName: TIER_LABELS[tier] || tier,
      status: 'active',
      source: 'paypal',
      orderID,
      createdAt: now,
      startedAt: now,
    },
    { merge: true }
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderID, tier, email } = req.body || {};

  if (!orderID) {
    return res.status(400).json({ error: 'Missing orderID' });
  }

  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const capture = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(capture);
    }

    // The purchase itself has already succeeded at this point, so a Firestore
    // failure must not surface to the buyer as a failed payment.
    try {
      const unit = capture.purchase_units?.[0];
      const payment = unit?.payments?.captures?.[0];
      await recordEnrollment({
        orderID,
        capture,
        tier,
        email: email || capture.payer?.email_address,
        amount: payment?.amount?.value,
      });
    } catch (enrollError) {
      console.error('Enrollment write failed for order', orderID, enrollError);
    }

    return res.status(200).json(capture);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
