import { apiClient } from './apiClient';

interface Employee {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  status: string;
  hireDate: string;
  salary: number;
}

interface GetEmployeesOptions {
  department?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export const employeeService = {
  async getEmployees(options: GetEmployeesOptions = {}): Promise<{ data: Employee[]; total: number }> {
    const params = new URLSearchParams();
    if (options.department) params.append('department', options.department);
    if (options.role) params.append('role', options.role);
    if (options.status) params.append('status', options.status);
    if (options.page) params.append('page', String(options.page));
    if (options.limit) params.append('limit', String(options.limit));

    const response = await apiClient.get<{ data: Employee[]; total: number }>(
      `/employees?${params.toString()}`
    );
    return response.data;
  },

  async getEmployeeById(id: string): Promise<Employee> {
    const response = await apiClient.get<Employee>(`/employees/${id}`);
    return response.data;
  },

  async createEmployee(data: Partial<Employee>): Promise<Employee> {
    const response = await apiClient.post<Employee>('/employees', data);
    return response.data;
  },

  async updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
    const response = await apiClient.put<Employee>(`/employees/${id}`, data);
    return response.data;
  },

  async terminateEmployee(id: string): Promise<Employee> {
    const response = await apiClient.post<Employee>(`/employees/${id}/terminate`);
    return response.data;
  },
};
