import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const PRICE_MAP: Record<string, string> = {
  tee: 'price_1TW63FLSPqUvmV0oKyrsGiPU',
  tote: 'price_1TW64xLSPqUvmV0oASdvtfyp',
  poster: 'price_1TW67PLSPqUvmV0orxvjiU6s',
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { itemId, size, quantity } = JSON.parse(event.body || '{}');

    const priceId = PRICE_MAP[itemId];

    if (!priceId) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Invalid Item ID or product not configured.' }) 
      };
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: priceId,
          quantity: quantity || 1,
        },
      ],
      mode: 'payment',
      metadata: {
        size: size || 'N/A',
        itemId: itemId
      },
      // Uses the current site URL for the return path
      return_url: `${event.headers.origin || process.env.URL || 'http://localhost:8888'}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: session.client_secret }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};