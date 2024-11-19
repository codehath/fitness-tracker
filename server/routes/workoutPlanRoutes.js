const express = require('express');
const router = express.Router();
const { WorkoutPlan } = require('../../models');
const mongoose = require('mongoose');

// Get all workout plans
router.get('/plans', async (req, res) => {
  try {
    const plans = await WorkoutPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    console.error('Error in GET /plans', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get workout plans created by user
router.get('/plans/user/:userId', async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const plans = await WorkoutPlan.find({ userId });
    res.status(200).json(plans);
  } catch (error) {
    console.error('Error in GET /plans/user/:userId:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single workout plan by ID
router.get('/plans/:planId', async (req, res) => {
  try {
    const { planId } = req.params;
    const plan = await WorkoutPlan.findOne({
      _id: new mongoose.Types.ObjectId(planId),
    });

    if (!plan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    res.status(200).json(plan);
  } catch (error) {
    console.error('Error in GET /plans/:planId:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new workout plan
router.post('/plans', async (req, res) => {
  try {
    const { name, days } = req.body;

    const newPlan = new WorkoutPlan({
      name,
      days: days.map((day) => ({
        dayName: day.dayName,
        exercises: day.exercises.map((exercise) => ({
          exerciseId: exercise.exerciseId,
          sets: exercise.sets,
          reps: exercise.reps,
          restTime: exercise.restTime,
        })),
      })),
    });

    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    console.error('Error in POST /plans:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a workout plan
router.put('/plans/:planId', async (req, res) => {
  try {
    const { planId } = req.params;
    const { name, days } = req.body;

    const updates = {
      name,
      days: days.map((day) => ({
        dayName: day.dayName,
        exercises: day.exercises.map((exercise) => ({
          exerciseId: exercise.exerciseId,
          sets: exercise.sets,
          reps: exercise.reps,
          restTime: exercise.restTime,
        })),
      })),
    };

    const updatedPlan = await WorkoutPlan.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(planId),
        userId: new mongoose.Types.ObjectId(userId),
      },
      updates,
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    res.status(200).json(updatedPlan);
  } catch (error) {
    console.error('Error in PUT /plans/:planId:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a workout plan
router.delete('/plans/:userId/:planId', async (req, res) => {
  try {
    const { userId, planId } = req.params;

    const deletedPlan = await WorkoutPlan.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(planId),
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!deletedPlan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    res.status(200).json({ message: 'Workout plan deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /plans/:userId/:planId:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
