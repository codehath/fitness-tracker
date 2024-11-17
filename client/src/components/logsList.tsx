// Example usage in a React component
import { useEffect, useState } from 'react';
import { workoutLogService } from '../services/workoutLogService';
import SingleLog from './singleLog'

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

interface UserProp {
  userId: string;
}

const LogsList = ({ userId }: UserProp) => {
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await workoutLogService.getLogs(userId);
        setLogs(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch logs'));
        setLoading(false);
      }
    };

    fetchLogs();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!logs.length) return <p>No workout logs found</p>;

  return (
    <div>
      <h2>Your Workout History</h2>
      <div className="logs-list">
        {logs.map((log) => {
          return (
            <SingleLog userId={userId} logId={log._id}/>
          );
        })}
      </div>
    </div>
  );
};

export default LogsList;
