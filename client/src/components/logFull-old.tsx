import { useEffect, useCallback } from 'react';
import { workoutLogService } from '../services/workoutLogService';
import { useApi } from '../hooks/useApi';
import Loading from './common/Loading';
import Error from './common/Error';
import { WorkoutLog } from '../services/workoutLogService';
import WorkoutPlanName from './WorkoutPlanName';
import WorkoutDayName from './WorkoutDayName';

interface LogProps {
  userId: string;
  logId: string;
}

const LogFull = ({ userId, logId }: LogProps) => {
  const getLog = useCallback(
    () => workoutLogService.getLogById(userId, logId),
    [userId, logId]
  );

  const { data: log, loading, error } = useApi<WorkoutLog>(getLog);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!log) return <p>No workout log found</p>;

  const date = new Date(log.date);

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '12px 0',
      }}
      className="workout-log"
    >
      <h3>
        <WorkoutPlanName planId={log.planId} /> -{' '}
        {date.toLocaleDateString('en-US', { weekday: 'long' })}{' '}
        {date.toLocaleDateString()}
      </h3>
      <p>
        {/* <WorkoutDayName planId={log.planId} dayIndex={log.dayIndex} /> */}
        <p>{log.workout.day}</p>
      </p>

      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Exercise</th>
            <th style={{ textAlign: 'center' }}>Sets</th>
            <th style={{ textAlign: 'center' }}>Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          {log.completedExercises.map((exercise, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}>{exercise.exerciseId}</td>
              <td style={{ textAlign: 'center' }}>
                {exercise.setsCompleted || '-'}
              </td>
              <td style={{ textAlign: 'center' }}>
                {exercise.weightUsed || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogFull;
