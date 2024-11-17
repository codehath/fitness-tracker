// Example usage in a React component
import { useEffect, useState } from 'react';
import { workoutLogService } from '../services/workoutLogService';

interface WorkoutLog {
  _id: string;
  userId: string;
  date: string;
  completedExercises: Array<{
    exerciseId: string;
    setsCompleted?: number;
    repsCompleted?: number;
    weightUsed?: number;
  }>;
}

interface LogProps {
  userId: string;
  logId: string;
}

const Log = ({ userId, logId }: LogProps) => {
  const [log, setLog] = useState<WorkoutLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const data = await workoutLogService.getLogById(userId, logId);
        setLog(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch log'));
        setLoading(false);
      }
    };

    fetchLog();
  }, [userId, logId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!log) return <p>No workout log found</p>;

  // Temporary
  const date = new Date(log.date);
  // {new Date(log.date).toLocaleDateString()} // Use this in html once switched to Workoutplan Service

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
      <h3>Workout_Name_Placeholder - {date.toLocaleDateString('en-US', { weekday: 'long' })} {date.toLocaleDateString()}</h3>
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
              <td style={{ textAlign: 'center' }}>{exercise.exerciseId}</td>
              <td style={{ textAlign: 'center' }}>{exercise.setsCompleted || '-'}</td>
              <td style={{ textAlign: 'center' }}>{exercise.weightUsed || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Log;
