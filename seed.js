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

const testUser = new User({});

// Seed Data
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await WorkoutPlan.deleteMany({});
    await WorkoutLog.deleteMany({});

    // Create Users
    const user1 = new User({
      name: 'John Doe',
      email: 'test-fitness-tracker@yopmail.com',
      clerkId: 'user_2p5Bxpwm8zlcwplCf3tnqr6smka',
      age: 28,
      weight: 80,
      height: 170,
      gender: 'Male',
      bodyType: 'Athletic',
      fitnessGoals: 'Build muscle',
      onboardingComplete: true,
      subscriptions: [
        {
          type: 'Premium',
          schedule: 'Monthly',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2025-01-01'),
          isActive: true,
        },
      ],
    });

    const user2 = new User({
      name: 'Jane Smith',
      email: 'test-fitness-tracker-2@yopmail.com',
      clerkId: 'user_2p5CqZR1lzYLP3OruPhTytjXDga',
      age: 25,
      weight: 65,
      height: 165,
      gender: 'Female',
      bodyType: 'Toned',
      fitnessGoals: 'Lose weight',
      onboardingComplete: true,
      subscriptions: [
        {
          type: 'Basic',
          schedule: 'Monthly',
          startDate: null,
          endDate: null,
          isActive: false,
        },
      ],
    });

    const user3 = new User({
      name: 'Roddy Rich',
      email: 'test-fitness-tracker-3@yopmail.com',
      clerkId: 'user_2p5HzIulxvDeenef826hNJZYdjY',
      age: 0.75,
      weight: 85,
      height: 180,
      gender: 'Male',
      bodyType: 'Muscular',
      fitnessGoals: 'Maintain muscle mass',
      onboardingComplete: true,
      subscriptions: [
        {
          type: 'Premium',
          schedule: 'Monthly',
          startDate: new Date('2024-01-15'),
          endDate: new Date('2025-01-15'),
          isActive: true,
        },
      ],
    });

    await Promise.all([user1.save(), user2.save(), user3.save()]);
    console.log('Users created...');

    // Create Workout Plans
    const workoutPlan1 = new WorkoutPlan({
      clerkUserId: user1.clerkId,
      name: 'Push Pull Legs',
      days: [
        {
          dayName: 'Push Day',
          exercises: [
            { exerciseId: '0123', sets: 4, reps: 12, restTime: 90 }, // Bench Press
            { exerciseId: '0124', sets: 3, reps: 12, restTime: 60 }, // Shoulder Press
            { exerciseId: '0125', sets: 3, reps: 15, restTime: 60 }, // Tricep Extensions
            { exerciseId: '0126', sets: 3, reps: 12, restTime: 60 }, // Lateral Raises
          ],
        },
        {
          dayName: 'Pull Day',
          exercises: [
            { exerciseId: '0127', sets: 4, reps: 10, restTime: 90 }, // Barbell Rows
            { exerciseId: '0128', sets: 3, reps: 12, restTime: 60 }, // Lat Pulldowns
            { exerciseId: '0129', sets: 3, reps: 15, restTime: 60 }, // Bicep Curls
            { exerciseId: '0130', sets: 3, reps: 12, restTime: 60 }, // Face Pulls
          ],
        },
        {
          dayName: 'Leg Day',
          exercises: [
            { exerciseId: '3214', sets: 4, reps: 8, restTime: 120 }, // Arms apart circular toe touch
            { exerciseId: '1709', sets: 3, reps: 12, restTime: 90 }, // Assisted lying glutes stretch
            { exerciseId: '0016', sets: 3, reps: 15, restTime: 60 }, // Assisted prone hamstring
            { exerciseId: '1713', sets: 3, reps: 15, restTime: 60 }, // Assisted prone lying quads stretch
          ],
        },
      ],
      price: 29.99,
    });

    const workoutPlan2 = new WorkoutPlan({
      clerkUserId: user2.clerkId,
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

    const workoutPlan3 = new WorkoutPlan({
      clerkUserId: user3.clerkId,
      name: 'Full Body Split',
      days: [
        {
          dayName: 'Day A',
          exercises: [
            { exerciseId: '0873', sets: 4, reps: 8, restTime: 120 }, // Deadlifts
            { exerciseId: '0456', sets: 4, reps: 10, restTime: 90 }, // Incline Bench
            { exerciseId: '0245', sets: 3, reps: 12, restTime: 60 }, // Pull-ups
            { exerciseId: '0016', sets: 3, reps: 15, restTime: 45 }, // Leg Press
          ],
        },
        {
          dayName: 'Day B',
          exercises: [
            { exerciseId: '0345', sets: 4, reps: 8, restTime: 120 }, // Front Squats
            { exerciseId: '1289', sets: 4, reps: 10, restTime: 90 }, // OHP
            { exerciseId: '1713', sets: 3, reps: 12, restTime: 60 }, // Barbell Rows
            { exerciseId: '0391', sets: 3, reps: 15, restTime: 45 }, // Lunges
          ],
        },
      ],
      price: 19.99,
    });

    await Promise.all([
      workoutPlan1.save(),
      workoutPlan2.save(),
      workoutPlan3.save(),
    ]);
    console.log('Workout plans created...');

    // Create Workout Logs
    const workoutLog1 = new WorkoutLog({
      clerkUserId: user1.clerkId,
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
      clerkUserId: user2.clerkId,
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
      clerkUserId: user1.clerkId,
      workout: {
        workoutPlanId: workoutPlan1._id,
        day: 'Lower Day',
      },
      date: new Date('2024-01-17'),
      completedExercises: [
        {
          exerciseId: '0666',
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
      clerkUserId: user2.clerkId,
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
      clerkUserId: user1.clerkId,
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

    const workoutLog6 = new WorkoutLog({
      clerkUserId: user3.clerkId,
      workout: {
        workoutPlanId: workoutPlan3._id,
        day: 'Day A',
      },
      date: new Date('2024-01-20'),
      completedExercises: [
        {
          exerciseId: '0873',
          setsCompleted: 4,
          repsCompleted: 8,
          weightUsed: 140,
        },
        {
          exerciseId: '0456',
          setsCompleted: 4,
          repsCompleted: 10,
          weightUsed: 85,
        },
        {
          exerciseId: '0245',
          setsCompleted: 3,
          repsCompleted: 12,
          weightUsed: 0,
        },
        {
          exerciseId: '0016',
          setsCompleted: 3,
          repsCompleted: 15,
          weightUsed: 200,
        },
      ],
    });

    const workoutLog7 = new WorkoutLog({
      clerkUserId: user3.clerkId,
      workout: {
        workoutPlanId: workoutPlan3._id,
        day: 'Day B',
      },
      date: new Date('2024-01-22'),
      completedExercises: [
        {
          exerciseId: '0345',
          setsCompleted: 4,
          repsCompleted: 8,
          weightUsed: 100,
        },
        {
          exerciseId: '1289',
          setsCompleted: 4,
          repsCompleted: 10,
          weightUsed: 60,
        },
        {
          exerciseId: '1713',
          setsCompleted: 3,
          repsCompleted: 12,
          weightUsed: 80,
        },
        {
          exerciseId: '0391',
          setsCompleted: 3,
          repsCompleted: 15,
          weightUsed: 40,
        },
      ],
    });

    // Save all workout logs
    await Promise.all([
      workoutLog1.save(),
      workoutLog2.save(),
      workoutLog3.save(),
      workoutLog4.save(),
      workoutLog5.save(),
      workoutLog6.save(),
      workoutLog7.save(),
    ]);
    console.log('Workout logs created...');

    // Close MongoDB connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

// Call the seed function
seedData();
