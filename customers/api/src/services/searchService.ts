import { Customer } from '../models/Customer';
import { Order } from '../models/Order';

interface SearchOptions {
  query: string;
  type?: 'customers' | 'orders' | 'all';
  limit?: number;
  offset?: number;
}

interface SearchResults {
  customers: Customer[];
  orders: Order[];
  total: number;
}

export class SearchService {
  async search(options: SearchOptions): Promise<SearchResults> {
    const { query, type = 'all', limit = 20, offset = 0 } = options;
    const normalizedQuery = query.toLowerCase().trim();

    const results: SearchResults = {
      customers: [],
      orders: [],
      total: 0,
    };

    // Mock implementation
    if (type === 'all' || type === 'customers') {
      // Search customers by name or email
      results.customers = [];
    }

    if (type === 'all' || type === 'orders') {
      // Search orders by ID or product name
      results.orders = [];
    }

    results.total = results.customers.length + results.orders.length;
    return results;
  }

  async searchCustomers(query: string): Promise<Customer[]> {
    const { customers } = await this.search({ query, type: 'customers' });
    return customers;
  }

  async searchOrders(query: string): Promise<Order[]> {
    const { orders } = await this.search({ query, type: 'orders' });
    return orders;
  }
}
