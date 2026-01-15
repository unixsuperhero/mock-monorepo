import { Employee, CreateEmployeeDTO, UpdateEmployeeDTO, EmployeeRole, EmployeeStatus } from '../models/Employee';
import { generateId } from '../utils/helpers';

interface FindAllOptions {
  department?: string;
  role?: string;
  status?: string;
  page: number;
  limit: number;
}

export class EmployeeService {
  private employees: Map<string, Employee> = new Map();

  async findAll(options: FindAllOptions): Promise<{ data: Employee[]; total: number }> {
    let all = Array.from(this.employees.values());

    if (options.department) {
      all = all.filter((e) => e.department === options.department);
    }
    if (options.role) {
      all = all.filter((e) => e.role === options.role);
    }
    if (options.status) {
      all = all.filter((e) => e.status === options.status);
    }

    const start = (options.page - 1) * options.limit;
    const data = all.slice(start, start + options.limit);
    return { data, total: all.length };
  }

  async findById(id: string): Promise<Employee | null> {
    return this.employees.get(id) || null;
  }

  async findByEmail(email: string): Promise<Employee | null> {
    const all = Array.from(this.employees.values());
    return all.find((e) => e.email === email) || null;
  }

  async findByManager(managerId: string): Promise<Employee[]> {
    const all = Array.from(this.employees.values());
    return all.filter((e) => e.managerId === managerId);
  }

  async create(data: CreateEmployeeDTO): Promise<Employee> {
    const existing = await this.findByEmail(data.email);
    if (existing) {
      throw new Error('Employee with this email already exists');
    }

    const employee: Employee = {
      id: generateId(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      department: data.department,
      managerId: data.managerId,
      hireDate: new Date(),
      salary: data.salary,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.employees.set(employee.id, employee);
    return employee;
  }

  async update(id: string, data: UpdateEmployeeDTO): Promise<Employee> {
    const employee = await this.findById(id);
    if (!employee) {
      throw new Error('Employee not found');
    }

    const updated: Employee = {
      ...employee,
      ...data,
      updatedAt: new Date(),
    };

    this.employees.set(id, updated);
    return updated;
  }

  async terminate(id: string): Promise<Employee> {
    return this.update(id, { status: 'terminated' });
  }
}
