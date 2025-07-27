import axios from 'axios';
import { GenerateInterviewRequest, GenerateInterviewResponse, Role } from '@intervu/shared';

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout for AI generation
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const interviewAPI = {
  generateInterview: async (data: GenerateInterviewRequest): Promise<GenerateInterviewResponse> => {
    try {
      const response = await api.post('/interview/generate', data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to generate interview'
      };
    }
  },

  getInterview: async (id: string) => {
    try {
      const response = await api.get(`/interview/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch interview'
      };
    }
  }
};

export const roleAPI = {
  getDefaultRoles: async (): Promise<{ success: boolean; roles?: Role[]; error?: string }> => {
    try {
      const response = await api.get('/roles/defaults');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch roles'
      };
    }
  },

  getAllRoles: async (): Promise<{ success: boolean; roles?: Role[]; error?: string }> => {
    try {
      const response = await api.get('/roles');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch roles'
      };
    }
  }
};

export default api; 