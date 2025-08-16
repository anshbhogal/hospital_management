import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh (simplified for now)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // In a real app, you'd use the refresh token to get a new access token
      // For now, we'll just log out for simplicity if 401 occurs
      // const { refresh } = useAuth(); // Cannot use hooks here
      // await refresh();
      console.error("Access token expired or invalid. Please log in again.");
      // Optionally, redirect to login page
      // window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default apiClient;
