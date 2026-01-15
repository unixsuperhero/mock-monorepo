export interface Employee {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: EmployeeRole;
  department: string;
  managerId?: string;
  hireDate: Date;
  salary: number;
  status: EmployeeStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type EmployeeRole = 'admin' | 'manager' | 'staff';
export type EmployeeStatus = 'active' | 'inactive' | 'terminated';

export interface CreateEmployeeDTO {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: EmployeeRole;
  department: string;
  managerId?: string;
  salary: number;
}

export interface UpdateEmployeeDTO {
  firstName?: string;
  lastName?: string;
  role?: EmployeeRole;
  department?: string;
  managerId?: string;
  salary?: number;
  status?: EmployeeStatus;
}
