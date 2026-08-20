/**
 * Dedicated Authentication Microservice API Client
 * Primary Endpoint: auth.anoneurx.com (configured via VITE_AUTH_API_URL)
 * 
 * If auth.anoneurx.com is offline, authentication requests automatically
 * fall back to mock authentication responses so local development and testing
 * continue without interruption.
 */

import { apiResilienceClient } from './apiResilienceClient';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: AuthUser;
  message?: string;
  isFallback?: boolean;
}

const mockDefaultUser: AuthUser = {
  id: 'usr_mock_101',
  name: 'Alex Morgan',
  email: 'alex.morgan@anoneurx.com',
  role: 'Engineer',
  department: 'AI & Systems Engineering',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
};

export const authApi = {
  // Login user via auth.anoneurx.com
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const res = await apiResilienceClient.execute<AuthResponse>(
        'auth',
        '/api/v1/login',
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        },
        () => ({
          success: true,
          token: `mock_jwt_auth_anoneurx_${Date.now()}`,
          user: {
            ...mockDefaultUser,
            email: email || mockDefaultUser.email,
          },
          message: 'Authenticated successfully (Mock Mode fallback)',
        })
      );
      return { ...res.data, isFallback: res.isFallback };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || 'Authentication request failed',
      };
    }
  },

  // Signup user via auth.anoneurx.com
  signup: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      const res = await apiResilienceClient.execute<AuthResponse>(
        'auth',
        '/api/v1/signup',
        {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
        },
        () => ({
          success: true,
          token: `mock_jwt_auth_anoneurx_${Date.now()}`,
          user: {
            id: `usr_${Math.random().toString(36).substr(2, 8)}`,
            name,
            email,
            role: 'Developer',
            department: 'Open Source Community',
          },
          message: 'Account created successfully (Mock Mode fallback)',
        })
      );
      return { ...res.data, isFallback: res.isFallback };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || 'Registration request failed',
      };
    }
  },

  // Get current user session via auth.anoneurx.com
  me: async (): Promise<{ success: boolean; user?: AuthUser; isFallback?: boolean }> => {
    try {
      const res = await apiResilienceClient.execute<{ success: boolean; user: AuthUser }>(
        'auth',
        '/api/v1/me',
        { method: 'GET' },
        () => ({
          success: true,
          user: mockDefaultUser,
        })
      );
      return { ...res.data, isFallback: res.isFallback };
    } catch (err: any) {
      return {
        success: false,
      };
    }
  },

  // Update profile via auth.anoneurx.com
  updateProfile: async (data: Partial<AuthUser>): Promise<AuthResponse> => {
    try {
      const res = await apiResilienceClient.execute<AuthResponse>(
        'auth',
        '/api/v1/profile',
        {
          method: 'PUT',
          body: JSON.stringify(data),
        },
        () => ({
          success: true,
          user: { ...mockDefaultUser, ...data },
          message: 'Profile updated successfully (Mock Mode fallback)',
        })
      );
      return { ...res.data, isFallback: res.isFallback };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Profile update failed' };
    }
  },

  // Change password via auth.anoneurx.com
  changePassword: async (currentPassword: string, newPassword: string): Promise<AuthResponse> => {
    try {
      const res = await apiResilienceClient.execute<AuthResponse>(
        'auth',
        '/api/v1/change-password',
        {
          method: 'POST',
          body: JSON.stringify({ currentPassword, newPassword }),
        },
        () => ({
          success: true,
          message: 'Password changed successfully (Mock Mode fallback)',
        })
      );
      return { ...res.data, isFallback: res.isFallback };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Password change failed' };
    }
  },
};
