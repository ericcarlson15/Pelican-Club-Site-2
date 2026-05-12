import { Handler } from "@netlify/functions";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

// REPLACE THESE WITH YOUR ACTUAL STRIPE PRICE IDs FROM YOUR DASHBOARD
const PRICE_MAP: Record<string, string> = {
  tee: 'price_1TW63FLSPqUvmV0oKyrsGiPU',
  tote: 'price_1TW64xLSPqUvmV0oASdvtfyp',
  poster: 'price_1TW67PLSPqUvmV0orxvjiU6s',
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { itemId, size, quantity } = JSON.parse(event.body || "{}");

    const priceId = PRICE_MAP[itemId];
    if (!priceId) {
      return { statusCode: 400, body: JSON.stringify({ message: "Invalid Item ID" }) };
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
      return_url: `${event.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: session.client_secret }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};