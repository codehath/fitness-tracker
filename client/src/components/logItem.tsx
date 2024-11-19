// Example usage in a React component
import { useEffect, useCallback } from 'react';
import { workoutLogService } from '../services/workoutLogService';
import { useApi } from '../hooks/useApi';
import Loading from './common/Loading';
import Error from './common/Error';
import { WorkoutLog } from '../services/workoutLogService';
import ExerciseName from './exerciseName';

interface LogProps {
  userId: string;
  logId: string;
}

const LogItem = ({ userId, logId }: LogProps) => {
  const getLog = useCallback(
    () => workoutLogService.getLogById(userId, logId),
    [userId, logId]
  );

  const {
    data: log,
    loading,
    error,
    execute: fetchLog,
  } = useApi<WorkoutLog>(getLog);

  useEffect(() => {
    fetchLog();
  }, [fetchLog]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!log) return <p>No workout log found</p>;

  const date = new Date(log.date);

  return (
    <div>
      <div className="single-log">
        <a
          href={`/logs/${userId}/${logId}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              margin: '12px 0',
              cursor: 'pointer',
            }}
          >
            <h3>
              Workout_Name_Placeholder -{' '}
              {date.toLocaleDateString('en-US', { weekday: 'long' })}{' '}
              {date.toLocaleDateString()}
            </h3>
            <p>Day_Name_Placeholder</p>

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
                    <td style={{ textAlign: 'center' }}>
                      <ExerciseName exerciseId={exercise.exerciseId} />
                    </td>
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
        </a>
      </div>
    </div>
  );
};

export default LogItem;
