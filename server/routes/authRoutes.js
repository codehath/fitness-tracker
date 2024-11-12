const express = require("express");
const router = express.Router();
const { User } = require("../../models");

// // Sample Implementation

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// Register route
router.post("/register", async (req, res) => {
  // try {
  //   const { email, password, name } = req.body;
  //   // Check if user already exists
  //   const existingUser = await User.findOne({ email });
  //   if (existingUser) {
  //     return res.status(400).json({ message: 'User already exists' });
  //   }
  //   // Hash the password
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   // Create new user
  //   const user = new User({ email, password: hashedPassword, name });
  //   await user.save();
  //   res.status(201).json({ message: 'User registered successfully' });
  // } catch (error) {
  //   res.status(500).json({ message: 'Server error' });
  // }
});

// Login route
router.post("/login", async (req, res) => {
  // try {
  //   const { email, password } = req.body;
  //   // Find user by email
  //   const user = await User.findOne({ email });
  //   if (!user) {
  //     return res.status(400).json({ message: 'Invalid email or password' });
  //   }
  //   // Check password
  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch) {
  //     return res.status(400).json({ message: 'Invalid email or password' });
  //   }
  //   // Generate JWT
  //   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  //   res.json({ token });
  // } catch (error) {
  //   res.status(500).json({ message: 'Server error' });
  // }
});

module.exports = router;
