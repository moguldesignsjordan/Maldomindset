export const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || 'https://api-m.sandbox.paypal.com';

// Server-side source of truth for tier pricing — never trust an amount sent from the client.
export const TIER_PRICES = {
  mindset: '99.00',
  accelerator: '450.00',
  'inner-circle': '950.00',
};

export const TIER_LABELS = {
  mindset: 'BaldoMindset Academy - Mindset Mastery',
  accelerator: 'BaldoMindset Academy - Personal Brand & Business Accelerator',
  'inner-circle': 'BaldoMindset Academy - Elite 1-on-1 Mentorship (Inner Circle)',
};

export async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Failed to authenticate with PayPal');
  }

  const data = await response.json();
  return data.access_token;
}
