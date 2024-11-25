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
  clerkUserId: string;
  name: string;
  days: WorkoutDay[];
  createdAt: string;
  price: number;
}

export const workoutPlanService = {
  getPlans: () => apiHandler(() => api.get(`/plans`).then((res) => res.data)),

  getUserPlans: (clerkId: string) =>
    apiHandler(() => api.get(`/plans/user/${clerkId}`).then((res) => res.data)),

  getPlanById: (planId: string) =>
    apiHandler(() => api.get(`/plans/${planId}`).then((res) => res.data)),

  createPlan: (
    clerkId: string,
    planData: Omit<WorkoutPlan, '_id' | 'clerkUserId' | 'createdAt'>
  ) =>
    apiHandler(() =>
      api
        .post(`/plans`, { ...planData, clerkUserId: clerkId })
        .then((res) => res.data)
    ),

  updatePlan: (planId: string, planData: Partial<WorkoutPlan>) =>
    apiHandler(() =>
      api.put(`/plans/${planId}`, planData).then((res) => res.data)
    ),

  deletePlan: (clerkId: string, planId: string) =>
    apiHandler(() =>
      api.delete(`/plans/${clerkId}/${planId}`).then((res) => res.data)
    ),
};
