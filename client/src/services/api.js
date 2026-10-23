import axios from 'axios';

// Base URL configured via environment variable with standard local development fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

/**
 * Health check service to test backend connectivity
 */
export const checkApiHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Cannot reach server',
      status: error.response?.status,
    };
  }
};

export default apiClient;
