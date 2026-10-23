import axios from 'axios';

// Base URL configured via environment variable with standard local development fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOKEN_KEY = 'scentora_token_v1';

export const tokenStorage = {
  get: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set: (token) => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      // Storage unavailable (private mode): the session lasts until reload
    }
  },
  clear: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // ignore
    }
  },
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

// Attach the signed-in user's token to every request
apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Human-readable message for a failed request.
 */
export const getErrorMessage = (error) =>
  error.response?.data?.message ||
  (error.code === 'ECONNABORTED' ? 'The server took too long to respond.' : null) ||
  (error.request && !error.response ? 'Cannot reach the Scentora server. Is the backend running?' : null) ||
  error.message ||
  'Something went wrong. Please try again.';

/**
 * Performs a request and returns the `data` field of the success envelope.
 * Throws an Error with a readable message on failure.
 */
export const request = async (method, url, body) => {
  try {
    const response = await apiClient.request({ method, url, data: body });
    return response.data.data;
  } catch (error) {
    const wrapped = new Error(getErrorMessage(error));
    wrapped.status = error.response?.status;
    throw wrapped;
  }
};

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
