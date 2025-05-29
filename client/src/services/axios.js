import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth');
    if (token) {
      const { token: authToken } = JSON.parse(token);
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 