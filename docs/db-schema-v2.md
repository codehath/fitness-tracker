## Collections

### **User**

- **Purpose**: Stores user profile and authentication details.
- **Fields**:
  - `email`: (unique, required)
  - `name`: (required)
  - `clerkId`: (unique, required)
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
  - `onboardingComplete`: Boolean indicating if user completed onboarding (default: false)
  - `subscription`: Object containing subscription details:
    - `type`: Subscription plan type ("Basic" or "Premium", default: "Basic")
    - `schedule`: Subscription schedule ("Monthly" or "Yearly", default: "Monthly")
    - `startDate`: Date when subscription began (optional, default: null)
    - `endDate`: Date when subscription expires (optional, default: null)
    - `isActive`: Boolean indicating if subscription is active (default: true)
  - `purchasedWorkoutPlans`: Array of references to purchased workout plans
  - `paymentHistory`: Array of payment records:
    - `paymentId`: Unique payment identifier
    - `amount`: Amount paid
    - `date`: Timestamp of payment
    - `itemType`: Type of item purchased
    - `itemId`: Reference to the purchased item
  - `createdAt`: Timestamp of account creation

---

### **Workout Plan**

- **Purpose**: Stores user-created workout plans.
- **Fields**:
  - `clerkUserId`: Reference to the user who created the plan (required)
  - `name`: (required)
  - `days`: Array of days, each containing:
    - `dayName`: Name of the day ("Monday", "Tuesday") (required)
    - `exercises`: List of exercises with for that day:
      - `exerciseId`: Reference to an exercise (required)
      - `sets`: (required)
      - `reps`: (required)
      - `restTime`: Rest time between sets in seconds (optional)
  - `price`: Cost of the plan if not free (default: 0)
  - `createdAt`: Timestamp of plan creation

---

### **Workout Log**

- **Purpose**: Logs completed workouts for progress tracking.
- **Fields**:
  - `clerkUserId`: Reference to the user who completed the workout (required)
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
