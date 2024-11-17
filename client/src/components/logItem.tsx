// Example usage in a React component
import { useEffect } from 'react'
import { workoutLogService } from '../services/workoutLogService'
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

interface LogProps {
  userId: string
  logId: string
}

const LogItem = ({ userId, logId }: LogProps) => {
  const {
    data: log,
    loading,
    error,
    execute: fetchLog,
  } = useApi<WorkoutLog>(() => workoutLogService.getLogById(userId, logId))

  useEffect(() => {
    fetchLog()
  }, [userId, logId, fetchLog])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!log) return <p>No workout log found</p>

  const date = new Date(log.date)

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
                      {exercise.exerciseId}
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
  )
}

export default LogItem
