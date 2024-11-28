import { loadStripe } from '@stripe/stripe-js';
import api from './axios.config';

export const paymentService = {
  purchaseWorkoutPlan: async (
    planId: string,
    amount: number,
    userId: string
  ) => {
    // Create a checkout session on the server
    const {
      data: { sessionId },
    } = await api.post('/create-checkout-session', {
      planId,
      amount,
      userId,
    });

    // Redirect to Stripe Checkout
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!
    );
    const { error } = await stripe!.redirectToCheckout({ sessionId });

    if (error) {
      throw new Error(error.message);
    }
  },
};
