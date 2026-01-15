import { apiClient } from './apiClient';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  status: string;
  createdAt: string;
}

interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: string;
  department?: string;
}

export const userService = {
  async getUsers(type: 'customer' | 'employee'): Promise<User[]> {
    // Mock data
    if (type === 'customer') {
      return [
        { id: '1', email: 'john@example.com', firstName: 'John', lastName: 'Doe', status: 'active', createdAt: '2024-01-15' },
        { id: '2', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', status: 'active', createdAt: '2024-01-20' },
        { id: '3', email: 'bob@example.com', firstName: 'Bob', lastName: 'Wilson', status: 'inactive', createdAt: '2024-02-01' },
      ];
    }
    return [
      { id: '1', email: 'admin@company.com', firstName: 'Admin', lastName: 'User', role: 'admin', status: 'active', createdAt: '2023-06-01' },
      { id: '2', email: 'manager@company.com', firstName: 'Sarah', lastName: 'Johnson', role: 'manager', status: 'active', createdAt: '2023-08-15' },
      { id: '3', email: 'staff@company.com', firstName: 'Mike', lastName: 'Brown', role: 'staff', status: 'active', createdAt: '2024-01-10' },
    ];
  },

  async createUser(data: CreateUserData, type: 'customer' | 'employee'): Promise<User> {
    const endpoint = type === 'customer' ? '/customers' : '/managers';
    const response = await apiClient.post<User>(`${endpoint}/users`, data);
    return response.data;
  },

  async updateUser(id: string, data: Partial<CreateUserData>, type: 'customer' | 'employee'): Promise<User> {
    const endpoint = type === 'customer' ? '/customers' : '/managers';
    const response = await apiClient.put<User>(`${endpoint}/users/${id}`, data);
    return response.data;
  },

  async deleteUser(id: string, type: 'customer' | 'employee'): Promise<void> {
    const endpoint = type === 'customer' ? '/customers' : '/managers';
    await apiClient.delete(`${endpoint}/users/${id}`);
  },

  async resetPassword(id: string, type: 'customer' | 'employee'): Promise<void> {
    const endpoint = type === 'customer' ? '/customers' : '/managers';
    await apiClient.post(`${endpoint}/users/${id}/reset-password`);
  },
};
