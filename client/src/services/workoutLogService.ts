import api from './axios.config';

// Helper function to handle API calls with error handling
const apiHandler = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

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
