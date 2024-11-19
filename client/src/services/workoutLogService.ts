import api from './axios.config';
import { apiHandler } from './apiHandler';

export interface WorkoutLog {
  _id: string;
  clerkUserId: string;
  workout: {
    workoutPlanId: string;
    day: string;
  };
  date: string;
  completedExercises: Array<{
    exerciseId: string;
    setsCompleted?: number;
    repsCompleted?: number;
    weightUsed?: number;
  }>;
  planId: string;
  dayIndex: number;
}

export const workoutLogService = {
  getLogs: (clerkId: string) =>
    apiHandler(() => api.get(`/logs/${clerkId}`).then((res) => res.data)),

  getLogById: (clerkId: string, logId: string) =>
    apiHandler(() =>
      api.get(`/logs/${clerkId}/${logId}`).then((res) => res.data)
    ),

  createLog: (clerkId: string, logData: any) =>
    apiHandler(() =>
      api
        .post(`/logs`, { ...logData, clerkUserId: clerkId })
        .then((res) => res.data)
    ),

  updateLog: (clerkId: string, id: string, logData: any) =>
    apiHandler(() =>
      api.put(`/logs/${clerkId}/${id}`, logData).then((res) => res.data)
    ),

  deleteLog: (clerkId: string, id: string) =>
    apiHandler(() =>
      api.delete(`/logs/${clerkId}/${id}`).then((res) => res.data)
    ),

  searchLogs: (query: string) =>
    apiHandler(() =>
      api.get('/search', { params: { query } }).then((res) => res.data)
    ),
};
