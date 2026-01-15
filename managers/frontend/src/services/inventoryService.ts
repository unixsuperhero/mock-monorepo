import { apiClient } from './apiClient';

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  unitPrice: number;
  category: string;
  location: string;
}

interface LowStockItem {
  itemId: string;
  name: string;
  currentQuantity: number;
  minQuantity: number;
}

interface GetItemsOptions {
  category?: string;
  location?: string;
  lowStock?: boolean;
  page?: number;
  limit?: number;
}

interface StockAdjustment {
  itemId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
}

export const inventoryService = {
  async getItems(options: GetItemsOptions = {}): Promise<{ data: InventoryItem[]; total: number }> {
    const params = new URLSearchParams();
    if (options.category) params.append('category', options.category);
    if (options.location) params.append('location', options.location);
    if (options.lowStock) params.append('lowStock', 'true');
    if (options.page) params.append('page', String(options.page));
    if (options.limit) params.append('limit', String(options.limit));

    const response = await apiClient.get<{ data: InventoryItem[]; total: number }>(
      `/inventory?${params.toString()}`
    );
    return response.data;
  },

  async getItemById(id: string): Promise<InventoryItem> {
    const response = await apiClient.get<InventoryItem>(`/inventory/${id}`);
    return response.data;
  },

  async getLowStock(): Promise<LowStockItem[]> {
    const response = await apiClient.get<LowStockItem[]>('/inventory/low-stock');
    return response.data;
  },

  async adjustStock(data: StockAdjustment): Promise<void> {
    await apiClient.post('/inventory/adjust', data);
  },

  async createItem(data: Partial<InventoryItem>): Promise<InventoryItem> {
    const response = await apiClient.post<InventoryItem>('/inventory', data);
    return response.data;
  },

  async updateItem(id: string, data: Partial<InventoryItem>): Promise<InventoryItem> {
    const response = await apiClient.put<InventoryItem>(`/inventory/${id}`, data);
    return response.data;
  },
};
