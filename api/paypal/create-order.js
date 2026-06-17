import { getAccessToken, PAYPAL_API_BASE, TIER_PRICES, TIER_LABELS } from '../_paypal.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { tier } = req.body || {};
  const amount = TIER_PRICES[tier];

  if (!amount) {
    return res.status(400).json({ error: 'Invalid tier' });
  }

  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            description: TIER_LABELS[tier],
            amount: {
              currency_code: 'USD',
              value: amount,
            },
          },
        ],
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(order);
    }

    return res.status(200).json({ id: order.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
