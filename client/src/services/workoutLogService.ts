import api from './axios.config';

export const workoutLogService = {
    getLogs: async (userId: string) => {
        try {
            const response = await api.get(`/logs/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching logs:', error);
            throw error;
        }
    },

    getLogById: async (userId: string, logId: string) => {
        const response = await api.get(`/logs/${userId}/${logId}`);
        return response.data;
    },

    createLog: async (userId: string, logData: any) => {
        const response = await api.post(`/logs/${userId}`, logData);
        return response.data;
    },

    updateLog: async (userId: string, id: string, logData: any) => {
        const response = await api.put(`/logs/${userId}/${id}`, logData);
        return response.data;
    },

    deleteLog: async (userId: string, id: string) => {
        const response = await api.delete(`/logs/${userId}/${id}`);
        return response.data;
    },

    searchLogs: async (query: string) => {
        const response = await api.get('/search', { params: { query } });
        return response.data;
    },
};