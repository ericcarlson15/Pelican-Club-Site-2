const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405 };

  const { itemId } = JSON.parse(event.body);
  
  // Map your items to Stripe Price IDs here
  const priceMap = {
    'tee': 'price_YOUR_PRICE_ID_1',
    'hat': 'price_YOUR_PRICE_ID_2',
    'poster': 'price_YOUR_PRICE_ID_3',
  };

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [{ price: priceMap[itemId], quantity: 1 }],
      mode: 'payment',
      return_url: `${process.env.URL}/success`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: session.client_secret }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};