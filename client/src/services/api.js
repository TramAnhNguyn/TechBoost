import axiosInstance from './axios';

export const authAPI = {
  login: async (credentials) => {
    const response = await axiosInstance.post('/users/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await axiosInstance.post('/users/register', userData);
    return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post('/users/logout');
    return response.data;
  },
  getProfile: async () => {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  }
};

export const courseAPI = {
  getAllCourses: async () => {
    const response = await axiosInstance.get('/courses');
    return response.data;
  },
  getCourseById: async (id) => {
    const response = await axiosInstance.get(`/courses/${id}`);
    return response.data;
  },
  enrollCourse: async (courseId) => {
    const response = await axiosInstance.post(`/users/enroll/${courseId}`);
    return response.data;
  },
  getEnrolledCourses: async () => {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  }
};

export const userAPI = {
  updateProfile: async (profileData) => {
    const response = await axiosInstance.put('/users/me', profileData); // ✅ thêm /users
    return response.data;
  },
  changePassword: async (passwordData) => {
    const response = await axiosInstance.put('/users/change-password', passwordData); // nếu có route này
    return response.data;
  }
};
