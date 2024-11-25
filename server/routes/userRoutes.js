const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const webhookRoutes = require('./webhookRoutes');

router.use('/webhook', webhookRoutes);

// Get user
router.get('/user/:clerkId', async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in GET /user/:clerkId:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a user
router.put('/user/:clerkId', async (req, res) => {
  try {
    const { clerkId } = req.params;
    const updates = req.body;

    const user = await User.findOneAndUpdate(
      { clerkId },
      { ...updates },
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
