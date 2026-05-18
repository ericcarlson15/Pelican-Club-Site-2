import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const PRICE_MAP: Record<string, string> = {
  tee: 'price_1TYVh0LSPqUvmV0oZmCvsxRU',    // Pelican Club Tee
  tote: 'price_1TYVhkLSPqUvmV0oa185Br1S',   // Pelican Club Tote
  poster: 'price_1TYViULSPqUvmV0omJdPKlyz', // Pelican Club Poster
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { itemId, size, quantity } = JSON.parse(event.body || '{}');

    console.log(`Creating session for item: ${itemId}, size: ${size}, qty: ${quantity}`);

    const priceId = PRICE_MAP[itemId as keyof typeof PRICE_MAP];

    // Sanity check to ensure we aren't sending empty or placeholder IDs to Stripe
    if (!priceId || priceId.includes('YOUR_PRICE_ID')) {
      console.error(`Invalid Price ID for item: ${itemId}`);
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: `Configuration Error: Price ID for '${itemId}' is missing or invalid.` }) 
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
      payment_method_types: ['card'],
      mode: 'payment',
      metadata: {
        size: size || 'N/A',
        itemId: itemId,
        quantity: (quantity || 1).toString()
      },
      // Uses the current site URL for the return path
      return_url: `${event.headers.origin || process.env.URL || 'http://localhost:8888'}/?session_id={CHECKOUT_SESSION_ID}`
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