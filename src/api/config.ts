export const API_BASE_URL = 'http://0.0.0.0';

export const getAuthHeaders = () => {
    const authToken = window.sessionStorage.getItem('authToken');
    if (!authToken) {
        throw new Error('No auth token');
    }
    return {
        'Authorization': `Bearer ${authToken}`
    };
};