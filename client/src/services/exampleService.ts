import api from 'axios.config';

export const userService = {
    getUsers: async (params) => {
        const response = await api.get('/users', { params });
        return response.data;
    },

    getUserById: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    searchUsers: async (query) => {
        const response = await api.get('/search', { params: { query } });
        return response.data;
    },

    createUser: async (userData) => {
        const response = await api.post('/users', userData);
        return response.data;
    }
}; 