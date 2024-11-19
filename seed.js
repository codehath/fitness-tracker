const mongoose = require('mongoose');
const { User, WorkoutPlan, WorkoutLog } = require('./models');
require('dotenv').config();

const MONGODB_URL =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/fitness-app';

// Connect to MongoDB (adjust the URI if needed)
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Seed Data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await WorkoutPlan.deleteMany({});
    await WorkoutLog.deleteMany({});

    // Create Users
    const user1 = new User({
      email: 'john@example.com',
      password: 'hashed_password', // You should hash the password in real-world use
      name: 'John Doe',
      gender: 'Male',
      bodyType: 'Athletic',
      fitnessGoals: 'Build muscle',
    });

    const user2 = new User({
      email: 'jane@example.com',
      password: 'hashed_password',
      name: 'Jane Smith',
      gender: 'Female',
      bodyType: 'Toned',
      fitnessGoals: 'Lose weight',
    });

    await user1.save();
    await user2.save();
    console.log('Users created...');

    // Create Workout Plans
    const workoutPlan1 = new WorkoutPlan({
      userId: user1._id,
      name: 'Strength Training Plan',
      days: [
        {
          dayName: 'Upper Day',
          exercises: [
            { exerciseId: '0123', sets: 3, reps: 10, restTime: 90 },
            { exerciseId: '0456', sets: 4, reps: 8, restTime: 90 },
          ],
        },
        {
          dayName: 'Lower Day',
          exercises: [
            { exerciseId: '0789', sets: 3, reps: 10, restTime: 90 },
            { exerciseId: '0234', sets: 4, reps: 8, restTime: 90 },
          ],
        },
      ],
    });

    const workoutPlan2 = new WorkoutPlan({
      userId: user2._id,
      name: 'Cardio Plan',
      days: [
        {
          dayName: 'Day 1',
          exercises: [
            { exerciseId: '0025', sets: 3, reps: 15, restTime: 60 },
            { exerciseId: '0030', sets: 4, reps: 12, restTime: 60 },
          ],
        },
        {
          dayName: 'Day 2',
          exercises: [
            { exerciseId: '0100', sets: 3, reps: 15, restTime: 60 },
            { exerciseId: '0200', sets: 4, reps: 12, restTime: 60 },
          ],
        },
      ],
    });

    await workoutPlan1.save();
    await workoutPlan2.save();
    console.log('Workout plans created...');

    // Create Workout Logs
    const workoutLog1 = new WorkoutLog({
      userId: user1._id,
      workout: {
        workoutPlanId: workoutPlan1._id,
        day: 'Upper Day',
      },
      date: new Date('2024-01-15'),
      completedExercises: [
        {
          exerciseId: '0123',
          setsCompleted: 3,
          repsCompleted: 10,
          weightUsed: 50,
        },
        {
          exerciseId: '0456',
          setsCompleted: 4,
          repsCompleted: 8,
          weightUsed: 60,
        },
      ],
    });

    const workoutLog2 = new WorkoutLog({
      userId: user2._id,
      workout: {
        workoutPlanId: workoutPlan2._id,
        day: 'Day 1',
      },
      date: new Date('2024-01-16'),
      completedExercises: [
        {
          exerciseId: '0025',
          setsCompleted: 3,
          repsCompleted: 15,
          weightUsed: 30,
        },
        {
          exerciseId: '0030',
          setsCompleted: 4,
          repsCompleted: 12,
          weightUsed: 40,
        },
      ],
    });

    const workoutLog3 = new WorkoutLog({
      userId: user1._id,
      workout: {
        workoutPlanId: workoutPlan1._id,
        day: 'Lower Day',
      },
      date: new Date('2024-01-17'),
      completedExercises: [
        {
          exerciseId: '0789',
          setsCompleted: 3,
          repsCompleted: 10,
          weightUsed: 45,
        },
        {
          exerciseId: '0234',
          setsCompleted: 4,
          repsCompleted: 8,
          weightUsed: 55,
        },
      ],
    });

    const workoutLog4 = new WorkoutLog({
      userId: user2._id,
      workout: {
        workoutPlanId: workoutPlan2._id,
        day: 'Day 2',
      },
      date: new Date('2024-01-18'),
      completedExercises: [
        {
          exerciseId: '0100',
          setsCompleted: 3,
          repsCompleted: 15,
          weightUsed: 35,
        },
        {
          exerciseId: '0200',
          setsCompleted: 4,
          repsCompleted: 12,
          weightUsed: 45,
        },
      ],
    });

    const workoutLog5 = new WorkoutLog({
      userId: user1._id,
      workout: {
        workoutPlanId: workoutPlan1._id,
        day: 'Upper Day',
      },
      date: new Date('2024-01-22'),
      completedExercises: [
        {
          exerciseId: '0123',
          setsCompleted: 3,
          repsCompleted: 10,
          weightUsed: 52.5,
        },
        {
          exerciseId: '0456',
          setsCompleted: 4,
          repsCompleted: 8,
          weightUsed: 62.5,
        },
      ],
    });

    await workoutLog1.save();
    await workoutLog2.save();
    await workoutLog3.save();
    await workoutLog4.save();
    await workoutLog5.save();
    console.log('Workout logs created...');

    // Close MongoDB connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

// Call the seed function
seedData();
