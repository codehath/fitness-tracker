// Example usage in a React component
import { useEffect, useCallback } from 'react';
import { workoutLogService } from '../services/workoutLogService';
import LogItem from './logItem';
import { useApi } from '../hooks/useApi';
import Loading from './common/Loading';
import Error from './common/Error';
import { WorkoutLog } from '../services/workoutLogService';

interface UserProp {
  userId: string;
}

const LogList = ({ userId }: UserProp) => {
  const getLogs = useCallback(
    () => workoutLogService.getLogs(userId),
    [userId]
  );

  const {
    data: logs,
    loading,
    error,
    execute: fetchLogs,
  } = useApi<WorkoutLog[]>(getLogs);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!logs?.length) return <p>No workout logs found</p>;

  return (
    <div>
      <h2>Your Workout History</h2>
      <div className="logs-list">
        {logs.map((log) => (
          <LogItem key={log._id} userId={userId} logId={log._id} />
        ))}
      </div>
    </div>
  );
};

export default LogList;
