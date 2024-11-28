const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Handle user creation webhook
router.post('/clerk/create', async (req, res) => {
  try {
    const { data } = req.body;
    const { email_addresses, first_name, last_name } = data;

    const existingUser = await User.findOne({
      email: email_addresses[0].email_address,
    });

    if (existingUser) {
      return res.status(200).send('User already exists');
    }

    const user = new User({
      email: email_addresses[0].email_address,
      name: `${first_name || ''} ${last_name || ''}`.trim(),
      password: 'clerk-auth',
      clerkId: data.id,
      gender: null,
      bodyType: null,
      fitnessGoals: null,
      age: null,
      weight: null,
      height: null,
    });

    await user.save();
    res.status(200).send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Server error');
  }
});

// Handle user deletion webhook
router.post('/clerk/delete', async (req, res) => {
  try {
    const { data } = req.body;
    const deletedUser = await User.findOneAndDelete({ clerkId: data.id });

    if (!deletedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Server error');
  }
});

// Webhook to handle successful payment
router.post(
  '/stripe',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const event = req.body;
    console.log('Received event:', event); // Log the entire event

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('Session data:', session); // Log session data

      // Update user in MongoDB
      const userId = session.metadata.userId;
      const planId = session.metadata.planId;

      try {
        const user = await User.findOne({ clerkId: userId });
        if (user) {
          user.purchasedWorkoutPlans.push(planId);
          user.paymentHistory.push({
            paymentId: session.id,
            amount: session.amount_total,
            date: new Date(),
            itemType: 'Workout Plan',
            itemId: planId,
          });
          await user.save();
          console.log('User updated successfully:', user); // Log success
        } else {
          console.error('User not found:', userId); // Log if user is not found
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }

    res.json({ received: true });
  }
);

module.exports = router;
