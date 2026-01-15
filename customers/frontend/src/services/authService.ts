import { apiClient } from './apiClient';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async getMe(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await apiClient.post<{ accessToken: string }>(
      '/auth/refresh',
      { refreshToken }
    );
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },
};
