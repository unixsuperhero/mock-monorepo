export interface InventoryItem {
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
  lastRestocked: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockMovement {
  id: string;
  itemId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  performedBy: string;
  createdAt: Date;
}

export interface CreateInventoryItemDTO {
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

export interface UpdateInventoryDTO {
  name?: string;
  description?: string;
  minQuantity?: number;
  maxQuantity?: number;
  unitPrice?: number;
  category?: string;
  location?: string;
}

export interface StockAdjustmentDTO {
  itemId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
}
