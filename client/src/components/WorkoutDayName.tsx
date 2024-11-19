import { useCallback } from 'react';
import { workoutPlanService } from '../services/workoutPlanService';
import { useApi } from '../hooks/useApi';
import Loading from './common/Loading';
import Error from './common/Error';

interface WorkoutDayNameProps {
  planId: string;
  dayIndex: number;
}

const WorkoutDayName = ({ planId, dayIndex }: WorkoutDayNameProps) => {
  const getPlan = useCallback(
    () => workoutPlanService.getPlanById(planId),
    [planId]
  );

  const { data: plan, loading } = useApi(getPlan);

  if (loading) return <Loading />;
  if (!plan || !plan.days[dayIndex]) return <span>Rest Day</span>;

  return <span>{plan.days[dayIndex].dayName}</span>;
};

export default WorkoutDayName;
