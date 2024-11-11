const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, optional: true },
  weight: { type: Number, optional: true },
  height: { type: Number, optional: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  bodyType: {
    type: String,
    required: true,
    enum: {
      values: function () {
        if (this.gender === 'Male') {
          return ['Slim', 'Skinny Fat', 'Average', 'Athletic', 'Muscular', 'Overweight'];
        } else if (this.gender === 'Female') {
          return ['Slim', 'Average', 'Toned', 'Curvy', 'Overweight'];
        }
      },
      message: 'Invalid body type for the selected gender'
    }
  },
  fitnessGoals: { type: String, optional: true },
  createdAt: { type: Date, default: Date.now }
});

// Workout Plan Schema
const workoutPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  days: [
    {
      dayName: { type: String, required: true },
      exercises: [
        {
          exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
          sets: { type: Number, required: true },
          reps: { type: Number, required: true },
          restTime: { type: Number, optional: true }
        }
      ]
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

// Workout Log Schema
const workoutLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workout: {
    workoutPlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan', required: true },
    day: { type: String, required: true }
  },
  date: { type: Date, default: Date.now },
  completedExercises: [
    {
      exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
      setsCompleted: { type: Number, optional: true },
      repsCompleted: { type: Number, optional: true },
      weightUsed: { type: Number, optional: true }
    }
  ]
});

// Create Models
const User = mongoose.model('User', userSchema);
const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);
const WorkoutLog = mongoose.model('WorkoutLog', workoutLogSchema);

// Export Models
module.exports = {
  User,
  WorkoutPlan,
  WorkoutLog
};
