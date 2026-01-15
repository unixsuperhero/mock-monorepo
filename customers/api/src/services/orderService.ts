import { Order, CreateOrderDTO, OrderStatus } from '../models/Order';
import { generateId } from '../utils/helpers';

interface FindAllOptions {
  customerId?: string;
  status?: string;
  page: number;
  limit: number;
}

export class OrderService {
  private orders: Map<string, Order> = new Map();

  async findAll(options: FindAllOptions): Promise<{ data: Order[]; total: number }> {
    let all = Array.from(this.orders.values());

    if (options.customerId) {
      all = all.filter((o) => o.customerId === options.customerId);
    }
    if (options.status) {
      all = all.filter((o) => o.status === options.status);
    }

    const start = (options.page - 1) * options.limit;
    const data = all.slice(start, start + options.limit);
    return { data, total: all.length };
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.get(id) || null;
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    const all = Array.from(this.orders.values());
    return all.filter((o) => o.customerId === customerId);
  }

  async create(data: CreateOrderDTO): Promise<Order> {
    // Validate order data
    if (!data.items || data.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    for (const item of data.items) {
      if (item.quantity <= 0) {
        throw new Error('Item quantity must be greater than 0');
      }
      if (item.unitPrice < 0) {
        throw new Error('Item price cannot be negative');
      }
    }

    if (!data.shippingAddress || !data.shippingAddress.street) {
      throw new Error('Valid shipping address is required');
    }

    const items = data.items.map((item) => ({
      ...item,
      subtotal: item.quantity * item.unitPrice,
    }));

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    if (total <= 0) {
      throw new Error('Order total must be greater than 0');
    }

    const order: Order = {
      id: generateId(),
      customerId: data.customerId,
      items,
      status: 'pending',
      total,
      shippingAddress: data.shippingAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orders.set(order.id, order);
    return order;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.findById(id);
    if (!order) {
      throw new Error('Order not found');
    }

    const updated: Order = {
      ...order,
      status,
      updatedAt: new Date(),
    };

    this.orders.set(id, updated);
    return updated;
  }

  async cancel(id: string): Promise<Order> {
    return this.updateStatus(id, 'cancelled');
  }
}
