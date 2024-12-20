import api from './axios.config';
import { apiHandler } from './apiHandler';

export interface User {
  _id: string;
  clerkId: string;
  email: string;
  name: string;
  age?: number;
  weight?: number;
  height?: number;
  gender: 'Male' | 'Female';
  bodyType: string;
  fitnessGoals?: string;
  createdAt: Date;
  onboardingComplete: boolean;
  subscriptions: [
    {
      type: 'Basic' | 'Premium';
      schedule: 'Monthly' | 'Yearly';
      startDate: Date | null;
      endDate: Date | null;
      isActive: boolean;
    },
  ];
  purchasedWorkoutPlans?: string[];
  paymentHistory?: {
    paymentId: string;
    amount: number;
    date: Date;
    itemType: string;
    itemId: string;
  }[];
}

export const userService = {
  getUser: (clerkId: string) =>
    apiHandler(() => api.get(`/user/${clerkId}`).then((res) => res.data)),

  createUser: (userData: Omit<User, '_id'>) =>
    apiHandler(() => api.post('/user', userData).then((res) => res.data)),

  updateUser: (clerkId: string, userData: Partial<User>) =>
    apiHandler(() =>
      api.put(`/user/${clerkId}`, userData).then((res) => res.data)
    ),

  deleteUser: (clerkId: string) =>
    apiHandler(() => api.delete(`/user/${clerkId}`).then((res) => res.data)),
};
