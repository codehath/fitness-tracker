import { WorkoutPlan } from '../services/workoutPlanService';
import ExerciseName from './exerciseName';
import PurchaseWorkoutPlan from './PurchaseWorkoutPlan';

interface WorkoutItemProps {
  plan: WorkoutPlan;
}

const WorkoutItem = ({ plan }: WorkoutItemProps) => {
  return (
    <div>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
          margin: '12px 0',
          cursor: 'pointer',
        }}
      >
        <h3>{plan.name}</h3>
        <p>{plan.days.length} days per week</p>

        {plan.days.map((day, dayIndex) => (
          <div key={dayIndex} style={{ marginBottom: '16px' }}>
            <h4>{day.dayName}</h4>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>Exercise</th>
                  <th style={{ textAlign: 'center' }}>Sets</th>
                  <th style={{ textAlign: 'center' }}>Reps</th>
                </tr>
              </thead>
              <tbody>
                {day.exercises.map((exercise, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: 'center' }}>
                      <ExerciseName exerciseId={exercise.exerciseId} />
                    </td>
                    <td style={{ textAlign: 'center' }}>{exercise.sets}</td>
                    <td style={{ textAlign: 'center' }}>{exercise.reps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        {plan.price > 0 && <PurchaseWorkoutPlan plan={plan} />}
      </div>
    </div>
  );
};

export default WorkoutItem;
