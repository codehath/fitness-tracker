## Collections

### **User**
- **Purpose**: Stores user profile and authentication details.
- **Fields**:
  - `email`: User's email (unique, required)
  - `password`: Hashed password (required)
  - `name`: User's name (required)
  - `age`: User's age (optional)
  - `weight`: User's weight (optional)
  - `height`: User's height (optional)
  - `fitnessGoals`: User's fitness goals (optional)
  - `createdAt`: Timestamp of account creation

---

### **Exercise**
- **Purpose**: Stores exercise information.
- **Fields**:
  - `name`: Name of the exercise (required)
  - `muscleGroup`: Targeted muscle group (required)
  - `equipment`: Equipment needed (optional)
  - `description`: Description of the exercise (optional)
  - `videoUrl`: Link to instructional video (optional)

---

### **Workout Plan**
- **Purpose**: Stores user-created workout plans.
- **Fields**:
  - `userId`: Reference to the user who created the plan (required)
  - `name`: Name of the workout plan (required)
  - `exercises`: List of exercises with:
    - `exerciseId`: Reference to an exercise (required)
    - `sets`: Number of sets (required)
    - `reps`: Number of reps (required)
    - `restTime`: Rest time between sets in seconds (optional)
  - `createdAt`: Timestamp of plan creation

---

### **Workout Log**
- **Purpose**: Logs completed workouts for progress tracking.
- **Fields**:
  - `userId`: Reference to the user who completed the workout (required)
  - `workoutPlanId`: Reference to the workout plan used (required)
  - `date`: Date of workout (default: current date)
  - `completedExercises`: List of completed exercises with:
    - `exerciseId`: Reference to the exercise (required)
    - `setsCompleted`: Number of sets completed (optional)
    - `repsCompleted`: Number of reps completed (optional)
    - `weightUsed`: Weight used in kg (optional)

---