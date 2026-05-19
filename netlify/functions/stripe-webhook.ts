import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const formatAddress = (address?: Stripe.Address | null) => {
  if (!address) return 'No shipping address collected.';

  return [
    address.line1,
    address.line2,
    [address.city, address.state, address.postal_code].filter(Boolean).join(', '),
    address.country,
  ].filter(Boolean).join('\n');
};

const sendOrderEmail = async (session: Stripe.Checkout.Session) => {
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ORDER_NOTIFICATION_EMAIL;
  const fromEmail = process.env.ORDER_NOTIFICATION_FROM_EMAIL || 'Pelican Club <onboarding@resend.dev>';

  const shipping = session.shipping_details;
  const customerEmail = session.customer_details?.email || session.customer_email || 'Not provided';
  const customerPhone = session.customer_details?.phone || shipping?.phone || 'Not provided';
  const itemName = session.metadata?.itemName || session.metadata?.itemId || 'Pelican Club merch';
  const quantity = session.metadata?.quantity || '1';
  const size = session.metadata?.size || 'N/A';
  const amount = typeof session.amount_total === 'number'
    ? `$${(session.amount_total / 100).toFixed(2)} ${session.currency?.toUpperCase() || ''}`.trim()
    : 'Not provided';

  const text = [
    'New Pelican Club merch order',
    '',
    `Stripe session: ${session.id}`,
    `Payment status: ${session.payment_status}`,
    `Item: ${itemName}`,
    `Size: ${size}`,
    `Quantity: ${quantity}`,
    `Total: ${amount}`,
    '',
    'Customer',
    `Name: ${shipping?.name || session.customer_details?.name || 'Not provided'}`,
    `Email: ${customerEmail}`,
    `Phone: ${customerPhone}`,
    '',
    'Shipping address',
    formatAddress(shipping?.address),
  ].join('\n');

  if (!resendApiKey || !toEmail) {
    console.warn('Order email not sent. Set RESEND_API_KEY and ORDER_NOTIFICATION_EMAIL in Netlify.');
    console.log(text);
    return;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `New Pelican Club order: ${itemName}`,
      text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend email failed: ${response.status} ${errorText}`);
  }
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = event.headers['stripe-signature'];

  if (!webhookSecret) {
    return { statusCode: 500, body: 'Missing STRIPE_WEBHOOK_SECRET' };
  }

  if (!signature || !event.body) {
    return { statusCode: 400, body: 'Missing Stripe signature or body' };
  }

  try {
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64')
      : event.body;
    const stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      await sendOrderEmail(session);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error: any) {
    console.error('Stripe webhook error:', error);

    return {
      statusCode: 400,
      body: `Webhook Error: ${error.message}`,
    };
  }
};
