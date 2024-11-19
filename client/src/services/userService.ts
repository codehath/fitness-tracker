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
}

export const userService = {
  getUser: (userId: string) =>
    apiHandler(() => api.get(`/user/${userId}`).then((res) => res.data)),

  createUser: (userData: Omit<User, '_id'>) =>
    apiHandler(() => api.post('/user', userData).then((res) => res.data)),

  updateUser: (userId: string, userData: Partial<User>) =>
    apiHandler(() =>
      api.put(`/user/${userId}`, userData).then((res) => res.data)
    ),

  deleteUser: (userId: string) =>
    apiHandler(() => api.delete(`/user/${userId}`).then((res) => res.data)),
};
