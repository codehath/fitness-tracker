import { useCallback } from 'react';
import { workoutPlanService } from '../services/workoutPlanService';
import { useApi } from '../hooks/useApi';
import Loading from './common/Loading';
import Error from './common/Error';
import { WorkoutPlan } from '../services/workoutPlanService';
import WorkoutItem from './workoutItem';

const WorkoutList = () => {
  const getPlans = useCallback(() => workoutPlanService.getPlans(), []);

  const { data: plans, loading, error } = useApi<WorkoutPlan[]>(getPlans);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!plans?.length) return <p>No workout plans found</p>;

  return (
    <div>
      <div className="workout-list">
        {plans.map((plan) => (
          <WorkoutItem key={plan._id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;
