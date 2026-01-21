import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const apiClient: AxiosInstance = axios.create({
  baseURL: `${backendUrl}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;

      switch (status) {
        case 401:
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
          }
          break;
        case 403:
          break;
        case 404:
          break;
        case 500:
          break;
        default:
          break;
      }

      return Promise.reject({
        message: data?.message || error.message || 'An error occurred',
        status,
        data: data,
      });
    } else if (error.request) {
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0,
      });
    } else {
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        status: 0,
      });
    }
  }
);

export default apiClient;

