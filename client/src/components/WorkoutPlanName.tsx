import { useCallback } from 'react';
import { workoutPlanService } from '../services/workoutPlanService';
import { useApi } from '../hooks/useApi';
import Loading from './common/Loading';
import Error from './common/Error';

interface WorkoutPlanNameProps {
  planId: string;
}

const WorkoutPlanName = ({ planId }: WorkoutPlanNameProps) => {
  const getPlan = useCallback(
    () => workoutPlanService.getPlanById(planId),
    [planId]
  );

  const { data: plan, loading, error } = useApi(getPlan);

  if (loading) return <Loading />;
  if (!plan) return <Error message="Unnamed Workout" />;

  return <span>{plan.name}</span>;
};

export default WorkoutPlanName;
