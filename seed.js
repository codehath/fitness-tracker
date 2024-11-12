const mongoose = require('mongoose');
const { User, WorkoutPlan, WorkoutLog } = require('./models');
require('dotenv').config();

// Connect to MongoDB (adjust the URI if needed)
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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
          dayName: 'Monday',
          exercises: [
            { exerciseId: 'exercise_id_1', sets: 3, reps: 10, restTime: 90 },
            { exerciseId: 'exercise_id_2', sets: 4, reps: 8, restTime: 90 },
          ],
        },
        {
          dayName: 'Wednesday',
          exercises: [
            { exerciseId: 'exercise_id_3', sets: 3, reps: 10, restTime: 90 },
            { exerciseId: 'exercise_id_4', sets: 4, reps: 8, restTime: 90 },
          ],
        },
      ],
    });

    const workoutPlan2 = new WorkoutPlan({
      userId: user2._id,
      name: 'Cardio Plan',
      days: [
        {
          dayName: 'Tuesday',
          exercises: [
            { exerciseId: 'exercise_id_5', sets: 3, reps: 15, restTime: 60 },
            { exerciseId: 'exercise_id_6', sets: 4, reps: 12, restTime: 60 },
          ],
        },
        {
          dayName: 'Thursday',
          exercises: [
            { exerciseId: 'exercise_id_7', sets: 3, reps: 15, restTime: 60 },
            { exerciseId: 'exercise_id_8', sets: 4, reps: 12, restTime: 60 },
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
        day: 'Monday',
      },
      completedExercises: [
        { exerciseId: 'exercise_id_1', setsCompleted: 3, repsCompleted: 10, weightUsed: 50 },
        { exerciseId: 'exercise_id_2', setsCompleted: 4, repsCompleted: 8, weightUsed: 60 },
      ],
    });

    const workoutLog2 = new WorkoutLog({
      userId: user2._id,
      workout: {
        workoutPlanId: workoutPlan2._id,
        day: 'Tuesday',
      },
      completedExercises: [
        { exerciseId: 'exercise_id_5', setsCompleted: 3, repsCompleted: 15, weightUsed: 30 },
        { exerciseId: 'exercise_id_6', setsCompleted: 4, repsCompleted: 12, weightUsed: 40 },
      ],
    });

    await workoutLog1.save();
    await workoutLog2.save();
    console.log('Workout logs created...');

    // Close MongoDB connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

// Call the seed function
seedData();
