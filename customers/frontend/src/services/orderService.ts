import { apiClient } from './apiClient';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: string;
  total: number;
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}

interface CreateOrderData {
  items: { productId: string; quantity: number }[];
  shippingAddress: ShippingAddress;
}

export const orderService = {
  async getMyOrders(): Promise<Order[]> {
    const response = await apiClient.get<{ data: Order[] }>('/orders');
    return response.data.data;
  },

  async getOrderById(id: string): Promise<Order> {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
  },

  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await apiClient.post<Order>('/orders', data);
    return response.data;
  },

  async cancelOrder(id: string): Promise<Order> {
    const response = await apiClient.post<Order>(`/orders/${id}/cancel`);
    return response.data;
  },
};
