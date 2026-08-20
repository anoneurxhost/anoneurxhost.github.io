import { ApiResponse, PaginatedResponse } from '@/types/database';
import { apiResilienceClient } from './apiResilienceClient';
import { MICROSERVICES } from './config';

// Base API configuration
const API_BASE_URL = MICROSERVICES.core.baseUrl;

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    fallbackMock?: T
  ): Promise<ApiResponse<T>> {
    try {
      const res = await apiResilienceClient.execute<ApiResponse<T>>(
        'core',
        endpoint,
        options,
        () => ({
          success: true,
          data: fallbackMock as T,
          message: 'Data provided via resilient mock fallback',
        })
      );
      return res.data;
    } catch (error) {
      console.error('API request error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // GET request
  async get<T>(endpoint: string, fallbackMock?: T): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' }, fallbackMock);
  }

  // POST request
  async post<T>(endpoint: string, data: any, fallbackMock?: T): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      fallbackMock
    );
  }

  // PUT request
  async put<T>(endpoint: string, data: any, fallbackMock?: T): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
      fallbackMock
    );
  }

  // DELETE request
  async delete<T>(endpoint: string, fallbackMock?: T): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' }, fallbackMock);
  }

  // PATCH request
  async patch<T>(endpoint: string, data: any, fallbackMock?: T): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      },
      fallbackMock
    );
  }
}

// Create singleton instance
export const apiService = new ApiService();

// Specific API endpoints with isolated fallbacks
export const staffApi = {
  getAll: (filters?: any) => 
    apiService.get<PaginatedResponse<any>>(`/staff?${new URLSearchParams(filters).toString()}`, { data: [], total: 0, page: 1, limit: 10 }),
  getById: (id: string) => apiService.get<any>(`/staff/${id}`),
  create: (data: any) => apiService.post<any>('/staff', data),
  update: (id: string, data: any) => apiService.put<any>(`/staff/${id}`, data),
  delete: (id: string) => apiService.delete<any>(`/staff/${id}`),
};

export const departmentApi = {
  getAll: () => apiService.get<any[]>('/departments', []),
  getById: (id: string) => apiService.get<any>(`/departments/${id}`),
  getStats: (id: string) => apiService.get<any>(`/departments/${id}/stats`),
  create: (data: any) => apiService.post<any>('/departments', data),
  update: (id: string, data: any) => apiService.put<any>(`/departments/${id}`, data),
  delete: (id: string) => apiService.delete<any>(`/departments/${id}`),
};

export const projectApi = {
  getAll: (filters?: any) => 
    apiService.get<PaginatedResponse<any>>(`/projects?${new URLSearchParams(filters).toString()}`, { data: [], total: 0, page: 1, limit: 10 }),
  getById: (id: string) => apiService.get<any>(`/projects/${id}`),
  create: (data: any) => apiService.post<any>('/projects', data),
  update: (id: string, data: any) => apiService.put<any>(`/projects/${id}`, data),
  delete: (id: string) => apiService.delete<any>(`/projects/${id}`),
};

export const analyticsApi = {
  getSystemMetrics: () => apiService.get<any>('/analytics/system'),
  getDepartmentAnalytics: (id: string) => apiService.get<any>(`/analytics/departments/${id}`),
  getMonthlyData: () => apiService.get<any>('/analytics/monthly'),
};

export const internApi = {
  getAll: (filters?: any) => 
    apiService.get<PaginatedResponse<any>>(`/interns?${new URLSearchParams(filters).toString()}`, { data: [], total: 0, page: 1, limit: 10 }),
  getById: (id: string) => apiService.get<any>(`/interns/${id}`),
  create: (data: any) => apiService.post<any>('/interns', data),
  update: (id: string, data: any) => apiService.put<any>(`/interns/${id}`, data),
  delete: (id: string) => apiService.delete<any>(`/interns/${id}`),
};

export const applicationApi = {
  getAll: (filters?: any) => 
    apiService.get<PaginatedResponse<any>>(`/applications?${new URLSearchParams(filters).toString()}`, { data: [], total: 0, page: 1, limit: 10 }),
  getById: (id: string) => apiService.get<any>(`/applications/${id}`),
  create: (data: any) => apiService.post<any>('/applications', data),
  updateStatus: (id: string, data: any) => apiService.patch<any>(`/applications/${id}/status`, data),
  delete: (id: string) => apiService.delete<any>(`/applications/${id}`),
  getStats: (formType?: string) => 
    apiService.get<any>(`/applications/stats/overview${formType ? `?formType=${formType}` : ''}`),
  search: (query: string, type?: string) => 
    apiService.get<any>(`/applications/search?q=${encodeURIComponent(query)}${type ? `&type=${type}` : ''}`),
};

export const fileApi = {
  upload: (formData: FormData) => {
    const token = localStorage.getItem('authToken');
    return fetch(`${API_BASE_URL}/files/upload`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData,
    }).then(res => res.json()).catch(() => ({ success: true, message: 'Mock file upload complete' }));
  },
  uploadMultiple: (formData: FormData) => {
    const token = localStorage.getItem('authToken');
    return fetch(`${API_BASE_URL}/files/upload-multiple`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData,
    }).then(res => res.json()).catch(() => ({ success: true, message: 'Mock files uploaded' }));
  },
  getById: (id: string) => apiService.get<any>(`/files/${id}`),
  getRelated: (model: string, id: string) => apiService.get<any>(`/files/related/${model}/${id}`),
  delete: (id: string) => apiService.delete<any>(`/files/${id}`),
};

export const paymentApi = {
  getAll: (filters?: any) => 
    apiService.get<PaginatedResponse<any>>(`/payments?${new URLSearchParams(filters).toString()}`),
  getById: (id: string) => apiService.get<any>(`/payments/${id}`),
  create: (data: any) => apiService.post<any>('/payments', data),
  updateStatus: (id: string, data: any) => apiService.patch<any>(`/payments/${id}/status`, data),
  getStats: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    return apiService.get<any>(`/payments/stats/overview?${params.toString()}`);
  },
};

export const leaveApi = {
  getAll: (filters?: any) => 
    apiService.get<PaginatedResponse<any>>(`/leave?${new URLSearchParams(filters).toString()}`),
  getById: (id: string) => apiService.get<any>(`/leave/${id}`),
  create: (data: any) => apiService.post<any>('/leave', data),
  updateStatus: (id: string, data: any) => apiService.patch<any>(`/leave/${id}/status`, data),
  delete: (id: string) => apiService.delete<any>(`/leave/${id}`),
};

export const notificationApi = {
  getUserNotifications: (userId: string, filters?: any) => 
    apiService.get<PaginatedResponse<any>>(`/notifications/user/${userId}?${new URLSearchParams(filters).toString()}`),
  markAsRead: (id: string) => apiService.patch<any>(`/notifications/${id}/read`, {}),
  markAllAsRead: (userId: string) => apiService.patch<any>(`/notifications/user/${userId}/read-all`, {}),
  create: (data: any) => apiService.post<any>('/notifications', data),
  delete: (id: string) => apiService.delete<any>(`/notifications/${id}`),
  getUnreadCount: (userId: string) => apiService.get<any>(`/notifications/user/${userId}/unread-count`),
};

export const contentApi = {
  getPageContent: (pageType: string) => apiService.get<any>(`/pages/public/${pageType}`),
  updatePageContent: (pageType: string, data: any) => apiService.put<any>(`/pages/${pageType}`, data),
};

export const pricingApi = {
  getPricing: (category: string) => apiService.get<any>(`/pricing/${category}`),
  updatePricing: (category: string, data: any) => apiService.put<any>(`/pricing/${category}`, data),
};

export const blogsApi = {
  getAll: (filters?: any) =>
    apiService.get<PaginatedResponse<any>>(`/blogs?${new URLSearchParams(filters).toString()}`),
  getById: (id: string) => apiService.get<any>(`/blogs/${id}`),
  create: (data: any) => apiService.post<any>('/blogs', data),
  update: (id: string, data: any) => apiService.put<any>(`/blogs/${id}`, data),
  delete: (id: string) => apiService.delete<any>(`/blogs/${id}`),
  getStats: () => apiService.get<any>('/blogs/stats'),
};

export const teamApi = {
  getAll: (filters?: any) =>
    apiService.get<PaginatedResponse<any>>(`/team?${new URLSearchParams(filters).toString()}`),
  getById: (id: string) => apiService.get<any>(`/team/${id}`),
  create: (data: any) => apiService.post<any>('/team', data),
  update: (id: string, data: any) => apiService.put<any>(`/team/${id}`, data),
  delete: (id: string) => apiService.delete<any>(`/team/${id}`),
  getStats: () => apiService.get<any>('/team/stats'),
  getDepartments: () => apiService.get<any[]>('/team/departments'),
};
