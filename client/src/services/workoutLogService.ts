import api from './axios.config';
import { apiHandler } from './apiHandler';

export interface WorkoutLog {
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

export const workoutLogService = {
  getLogs: (userId: string) =>
    apiHandler(() => api.get(`/logs/${userId}`).then((res) => res.data)),

  getLogById: (userId: string, logId: string) =>
    apiHandler(() =>
      api.get(`/logs/${userId}/${logId}`).then((res) => res.data)
    ),

  createLog: (userId: string, logData: any) =>
    apiHandler(() =>
      api.post(`/logs/${userId}`, logData).then((res) => res.data)
    ),

  updateLog: (userId: string, id: string, logData: any) =>
    apiHandler(() =>
      api.put(`/logs/${userId}/${id}`, logData).then((res) => res.data)
    ),

  deleteLog: (userId: string, id: string) =>
    apiHandler(() =>
      api.delete(`/logs/${userId}/${id}`).then((res) => res.data)
    ),

  searchLogs: (query: string) =>
    apiHandler(() =>
      api.get('/search', { params: { query } }).then((res) => res.data)
    ),
};
