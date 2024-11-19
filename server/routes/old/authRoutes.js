const express = require('express');
const router = express.Router();
const { User } = require('../../../models');

router.post('/', async (req, res) => {
  try {
    const { type, data } = req.body;

    switch (type) {
      case 'user.created':
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
        break;

      case 'user.deleted':
        const deletedUser = await User.findOneAndDelete({ clerkId: data.id });
        break;

      default:
        console.log('Unhandled webhook event type:', type);
    }

    res.status(200).send('Webhook processed');
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).send('Server error');
  }
});

// Add new route for updating user profile
router.put('/users/:clerkId', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const updateData = req.body;

    const user = await User.findOneAndUpdate(
      { clerkId },
      { ...updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
});

module.exports = router;
