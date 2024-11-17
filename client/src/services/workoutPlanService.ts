import api from './axios.config';
import { apiHandler } from './apiHandler';

export interface Exercise {
  exerciseId: string;
  sets: number;
  reps: number;
  restTime?: number;
}

export interface WorkoutDay {
  dayName: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  _id: string;
  userId: string;
  name: string;
  days: WorkoutDay[];
  createdAt: string;
}

export const workoutPlanService = {
  getPlans: () => apiHandler(() => api.get(`/plans`).then((res) => res.data)),

  getUserPlans: (userId: string) =>
    apiHandler(() => api.get(`/plans/${userId}`).then((res) => res.data)),

  getPlanById: (planId: string) =>
    apiHandler(() => api.get(`/plans/${planId}`).then((res) => res.data)),

  createPlan: (
    userId: string,
    planData: Omit<WorkoutPlan, '_id' | 'userId' | 'createdAt'>
  ) =>
    apiHandler(() =>
      api.post(`/plans/${userId}`, planData).then((res) => res.data)
    ),

  updatePlan: (planId: string, planData: Partial<WorkoutPlan>) =>
    apiHandler(() =>
      api.put(`/plans/${planId}`, planData).then((res) => res.data)
    ),

  deletePlan: (userId: string, planId: string) =>
    apiHandler(() =>
      api.delete(`/plans/${userId}/${planId}`).then((res) => res.data)
    ),
};
