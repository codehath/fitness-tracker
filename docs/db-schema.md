## Collections

### **User**
- **Purpose**: Stores user profile and authentication details.
- **Fields**:
  - `email`: (unique, required)
  - `password`: (required)
  - `name`: (required)
  - `age`: (optional)
  - `weight`: (optional)
  - `height`: (optional)
  - `gender`: User's gender (required)
  - `bodyType`: User's body type (required), with options based on gender:
    - **For Males**:
      - "Slim"
      - "Skinny Fat"
      - "Average"
      - "Athletic"
      - "Muscular"
      - "Overweight"
    - **For Females**:
      - "Slim"
      - "Average"
      - "Toned"
      - "Curvy"
      - "Overweight"
  - `fitnessGoals`: (optional)
  - `createdAt`: Timestamp of account creation

---

### **Workout Plan**
- **Purpose**: Stores user-created workout plans.
- **Fields**:
  - `userId`: Reference to the user who created the plan (required)
  - `name`: (required)
  - `days`: Array of days, each containing:
    - `dayName`: Name of the day ("Monday", "Tuesday") (required)
    - `exercises`: List of exercises with for that day:
        - `exerciseId`: Reference to an exercise (required)
        - `sets`: (required)
        - `reps`: (required)
        - `restTime`: Rest time between sets in seconds (optional)
  - `createdAt`: Timestamp of plan creation

---

### **Workout Log**
- **Purpose**: Logs completed workouts for progress tracking.
- **Fields**:
  - `userId`: Reference to the user who completed the workout (required)
  - `workout`: Reference to the workout plan used (required)
    - `workoutPlanId`: Reference to the workout plan used (required)
    - `day`: (required)
  - `date`: Date of workout (default: current date)
  - `completedExercises`: List of completed exercises with:
    - `exerciseId`: Reference to the exercise (required)
    - `setsCompleted`: (optional)
    - `repsCompleted`: (optional)
    - `weightUsed`: Weight used in kg (optional)

---