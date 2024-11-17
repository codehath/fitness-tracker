// Example usage in a React component
import { useEffect } from 'react'
import { workoutLogService } from '../services/workoutLogService'
import LogItem from './logItem'
import { useApi } from '../hooks/useApi'

interface WorkoutLog {
  _id: string
  userId: string
  date: string
  completedExercises: Array<{
    exerciseId: string
    setsCompleted?: number
    repsCompleted?: number
    weightUsed?: number
  }>
}

interface UserProp {
  userId: string
}

const LogList = ({ userId }: UserProp) => {
  const {
    data: logs,
    loading,
    error,
    execute: fetchLogs,
  } = useApi<WorkoutLog[]>(() => workoutLogService.getLogs(userId))

  useEffect(() => {
    fetchLogs()
  }, [userId, fetchLogs])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!logs?.length) return <p>No workout logs found</p>

  return (
    <div>
      <h2>Your Workout History</h2>
      <div className="logs-list">
        {logs.map((log) => (
          <LogItem key={log._id} userId={userId} logId={log._id} />
        ))}
      </div>
    </div>
  )
}

export default LogList
