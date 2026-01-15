import { Customer, CreateCustomerDTO, UpdateCustomerDTO } from '../models/Customer';
import { generateId } from '../utils/helpers';

export class CustomerService {
  private customers: Map<string, Customer> = new Map();

  async findAll(page: number, limit: number): Promise<{ data: Customer[]; total: number }> {
    const all = Array.from(this.customers.values());
    const start = (page - 1) * limit;
    const data = all.slice(start, start + limit);
    return { data, total: all.length };
  }

  async findById(id: string): Promise<Customer | null> {
    return this.customers.get(id) || null;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const all = Array.from(this.customers.values());
    return all.find((c) => c.email === email) || null;
  }

  async create(data: CreateCustomerDTO): Promise<Customer> {
    const existing = await this.findByEmail(data.email);
    if (existing) {
      throw new Error('Customer with this email already exists');
    }

    const customer: Customer = {
      id: generateId(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.customers.set(customer.id, customer);
    return customer;
  }

  async update(id: string, data: UpdateCustomerDTO): Promise<Customer> {
    const customer = await this.findById(id);
    if (!customer) {
      throw new Error('Customer not found');
    }

    const updated: Customer = {
      ...customer,
      ...data,
      updatedAt: new Date(),
    };

    this.customers.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    if (!this.customers.has(id)) {
      throw new Error('Customer not found');
    }
    this.customers.delete(id);
  }
}
