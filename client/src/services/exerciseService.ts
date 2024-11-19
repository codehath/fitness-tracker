import api from './axios.config';
import { apiHandler } from './apiHandler';

export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

export const exerciseService = {
  getExercise: (exerciseId: string) =>
    apiHandler(() =>
      api.get(`/exercise/${exerciseId}`).then((res) => res.data)
    ),

  getExercises: () =>
    apiHandler(() => api.get('/exercises').then((res) => res.data)),

  getBodyPartList: () =>
    apiHandler(() =>
      api.get('/exercises/bodyPartList').then((res) => res.data)
    ),

  getEquipmentList: () =>
    apiHandler(() =>
      api.get('/exercises/equipmentList').then((res) => res.data)
    ),

  getExercisesByBodyPart: (bodyPart: string) =>
    apiHandler(() =>
      api.get(`/exercises/bodyPart/${bodyPart}`).then((res) => res.data)
    ),

  getExercisesByEquipment: (equipment: string) =>
    apiHandler(() =>
      api.get(`/exercises/equipment/${equipment}`).then((res) => res.data)
    ),

  getExercisesByName: (name: string) =>
    apiHandler(() =>
      api.get(`/exercises/name/${name}`).then((res) => res.data)
    ),

  getExercisesByMuscle: (muscle: string) =>
    apiHandler(() =>
      api.get(`/exercises/muscle/${muscle}`).then((res) => res.data)
    ),
};
