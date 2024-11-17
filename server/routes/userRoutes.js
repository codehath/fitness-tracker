const express = require('express')
const router = express.Router()
const { User } = require('../../models')
const mongoose = require('mongoose')

// Get user
router.get('/user', async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.find({ _id: new mongoose.Types.ObjectId(userId) })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Create a new workout user
router.post('/user', async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      age,
      weight,
      height,
      gender,
      bodyType,
      fitnessGoals,
    } = req.body

    const newUser = new User({
      email,
      password,
      name,
      age,
      weight,
      height,
      gender,
      bodyType,
      fitnessGoals,
    })

    await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error in POST /user:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update a user
router.put('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const {
      email,
      password,
      name,
      age,
      weight,
      height,
      gender,
      bodyType,
      fitnessGoals,
    } = req.body

    const updates = {
      email,
      password,
      name,
      age,
      weight,
      height,
      gender,
      bodyType,
      fitnessGoals,
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(userId),
      },
      updates,
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Error in PUT /user/:userId:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete a user
router.delete('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const deletedUser = await User.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(userId),
    })

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /user/:userId:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
