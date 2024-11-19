const express = require("express");
const router = express.Router();
const { User, WorkoutPlan, WorkoutLog } = require("../../models");
const mongoose = require('mongoose');

// Get all workout logs for a user
router.get("/logs/:userId", async (req, res) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.params.userId);
      const logs = await WorkoutLog.find({ userId });
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
});

// Get a single workout log by ID
router.get("/logs/:userId/:logId", async (req, res) => {
    try {
      const { userId, logId } = req.params;
      const log = await WorkoutLog.findOne({
        _id: new mongoose.Types.ObjectId(logId),
        userId: new mongoose.Types.ObjectId(userId)
      });
      
      if (!log) {
        return res.status(404).json({ message: 'Workout log not found' });
      }
      
      res.status(200).json(log);
    } catch (error) {
      console.error('Error in GET /logs/:userId/:logId:', error);
      res.status(500).json({ message: 'Server error' });
    }
});

// Create a new workout log
router.post("/logs", async (req, res) => {
    try {
      const { userId, workoutPlanId, day, date, exercises } = req.body;
      
      const newLog = new WorkoutLog({
        userId: new mongoose.Types.ObjectId(userId),
        workout: {
          workoutPlanId: workoutPlanId ? new mongoose.Types.ObjectId(workoutPlanId) : null,
          day: day
        },
        date,
        completedExercises: exercises.map(exercise => ({
          exerciseId: exercise.exerciseId,
          setsCompleted: exercise.setsCompleted,
          repsCompleted: exercise.repsCompleted,
          weightUsed: exercise.weightUsed
        }))
      });
      
      await newLog.save();
      res.status(201).json(newLog);
    } catch (error) {
      console.error('Error in POST /logs:', error);
      res.status(500).json({ message: 'Server error' });
    }
});

// Update a workout log
router.put("/logs/:userId/:logId", async (req, res) => {
    try {
      const { userId, logId } = req.params;
      const { date, exercises } = req.body;
      
      const updates = {
        date,
        exercises: exercises.map(exercise => ({
          name: exercise.name,
          sets: exercise.sets.map(set => ({
            weight: set.weight,
            reps: set.reps,
            completed: set.completed
          }))
        }))
      };
      
      const updatedLog = await WorkoutLog.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(logId),
          userId: new mongoose.Types.ObjectId(userId)
        },
        updates,
        { new: true }
      );
      
      if (!updatedLog) {
        return res.status(404).json({ message: 'Workout log not found' });
      }
      
      res.status(200).json(updatedLog);
    } catch (error) {
      console.error('Error in PUT /logs/:userId/:logId:', error);
      res.status(500).json({ message: 'Server error' });
    }
});

// Delete a workout log
router.delete("/logs/:userId/:logId", async (req, res) => {
    try {
      const { userId, logId } = req.params;
      
      const deletedLog = await WorkoutLog.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(logId),
        userId: new mongoose.Types.ObjectId(userId)
      });
      
      if (!deletedLog) {
        return res.status(404).json({ message: 'Workout log not found' });
      }
      
      res.status(200).json({ message: 'Workout log deleted successfully' });
    } catch (error) {
      console.error('Error in DELETE /logs/:userId/:logId:', error);
      res.status(500).json({ message: 'Server error' });
    }
});



// router.post("/search", async (req, res) => {
//     try {
//       const { search_term} = req.body;
//       WorkoutLog.find({
//         $or: [
//           { day: { $regex: search_term, $options: 'i' } },
//           { exercise: { $regex: search_term, $options: 'i' } }
//         ]
//       });
//       res.status(201).json({ message: '' });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });


module.exports = router;
