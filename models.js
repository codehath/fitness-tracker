const mongoose = require('mongoose');

// Body types based on gender
const bodyTypeEnumMale = [
  'Slim',
  'Skinny Fat',
  'Average',
  'Athletic',
  'Muscular',
  'Overweight',
];
const bodyTypeEnumFemale = ['Slim', 'Average', 'Toned', 'Curvy', 'Overweight'];

// User Schema
const subscriptionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Basic', 'Premium'],
    required: true,
    default: 'Basic',
  },
  schedule: {
    type: String,
    enum: ['Monthly', 'Yearly'],
    required: true,
    default: 'Monthly',
  },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  isActive: { type: Boolean, default: true },
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String },
  clerkId: { type: String, unique: true },
  age: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  gender: { type: String, enum: ['Male', 'Female'] },
  bodyType: { type: String },
  fitnessGoals: { type: String },
  createdAt: { type: Date, default: Date.now },
  onboardingComplete: { type: Boolean, default: false },
  subscription: {
    type: subscriptionSchema,
    default: {
      type: 'Basic',
      schedule: 'Monthly',
      startDate: null,
      endDate: null,
      isActive: false,
    },
  },
  purchasedWorkoutPlans: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' },
  ],
  paymentHistory: [
    {
      paymentId: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
      itemType: { type: String, required: true },
      itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
  ],
});

// Pre-save hook to validate bodyType based on gender
userSchema.pre('save', function (next) {
  // Check if gender is male or female and validate bodyType accordingly
  if (this.gender === 'Male' && !bodyTypeEnumMale.includes(this.bodyType)) {
    return next(
      new Error(`${this.bodyType} is not a valid body type for Male`)
    );
  }
  if (this.gender === 'Female' && !bodyTypeEnumFemale.includes(this.bodyType)) {
    return next(
      new Error(`${this.bodyType} is not a valid body type for Female`)
    );
  }
  // If validation passes, proceed with saving
  next();
});

// Workout Plan Schema
const workoutPlanSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true },
  name: { type: String, required: true },
  days: [
    {
      dayName: { type: String, required: true },
      exercises: [
        {
          exerciseId: { type: String, required: true },
          sets: { type: Number, required: true },
          reps: { type: Number, required: true },
          restTime: { type: Number, optional: true },
        },
      ],
    },
  ],
  createdAt: { type: Date, default: Date.now },
  price: { type: Number, default: 0 },
});

// Workout Log Schema
const workoutLogSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true },
  workout: {
    workoutPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkoutPlan',
      required: true,
    },
    day: { type: String, required: true },
  },
  date: { type: Date, default: Date.now },
  completedExercises: [
    {
      exerciseId: { type: String, required: true },
      setsCompleted: { type: Number, optional: true },
      repsCompleted: { type: Number, optional: true },
      weightUsed: { type: Number, optional: true },
    },
  ],
});

// Create Models
const User = mongoose.model('User', userSchema);
const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);
const WorkoutLog = mongoose.model('WorkoutLog', workoutLogSchema);

// Export Models
module.exports = {
  User,
  WorkoutPlan,
  WorkoutLog,
};
