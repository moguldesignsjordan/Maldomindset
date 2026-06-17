import { getAccessToken, PAYPAL_API_BASE } from '../_paypal.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderID } = req.body || {};

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

    return res.status(200).json(capture);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
