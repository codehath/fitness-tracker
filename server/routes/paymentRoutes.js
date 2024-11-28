const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const webhookRoutes = require('./webhookRoutes');

router.use('/webhook', webhookRoutes);

router.post('/create-checkout-session', async (req, res) => {
  const { amount, planId, userId } = req.body;

  const successUrl = `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `http://localhost:5173/cancel`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `Workout Plan: ${planId}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        planId,
      },
    });

    // Return sessionId
    res.send({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send({ error: 'Failed to create checkout session' });
  }
});

// Endpoint to retrieve the checkout session details
router.get('/checkout-session/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.status(200).json(session);
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    res.status(500).json({ error: 'Failed to retrieve checkout session' });
  }
});

module.exports = router;
