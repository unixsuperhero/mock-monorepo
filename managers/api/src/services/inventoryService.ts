import { InventoryItem, StockMovement, CreateInventoryItemDTO, UpdateInventoryDTO } from '../models/Inventory';
import { generateId } from '../utils/helpers';

interface FindAllOptions {
  category?: string;
  location?: string;
  lowStock?: boolean;
  page: number;
  limit: number;
}

interface AdjustStockData {
  itemId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  performedBy: string;
}

export class InventoryService {
  private items: Map<string, InventoryItem> = new Map();
  private movements: StockMovement[] = [];

  async findAll(options: FindAllOptions): Promise<{ data: InventoryItem[]; total: number }> {
    let all = Array.from(this.items.values());

    if (options.category) {
      all = all.filter((i) => i.category === options.category);
    }
    if (options.location) {
      all = all.filter((i) => i.location === options.location);
    }
    if (options.lowStock) {
      all = all.filter((i) => i.quantity <= i.minQuantity);
    }

    const start = (options.page - 1) * options.limit;
    const data = all.slice(start, start + options.limit);
    return { data, total: all.length };
  }

  async findById(id: string): Promise<InventoryItem | null> {
    return this.items.get(id) || null;
  }

  async findBySku(sku: string): Promise<InventoryItem | null> {
    const all = Array.from(this.items.values());
    return all.find((i) => i.sku === sku) || null;
  }

  async create(data: CreateInventoryItemDTO): Promise<InventoryItem> {
    const existing = await this.findBySku(data.sku);
    if (existing) {
      throw new Error('Item with this SKU already exists');
    }

    const item: InventoryItem = {
      id: generateId(),
      ...data,
      lastRestocked: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.set(item.id, item);
    return item;
  }

  async update(id: string, data: UpdateInventoryDTO): Promise<InventoryItem> {
    const item = await this.findById(id);
    if (!item) {
      throw new Error('Item not found');
    }

    const updated: InventoryItem = {
      ...item,
      ...data,
      updatedAt: new Date(),
    };

    this.items.set(id, updated);
    return updated;
  }

  async adjustStock(data: AdjustStockData): Promise<StockMovement> {
    const item = await this.findById(data.itemId);
    if (!item) {
      throw new Error('Item not found');
    }

    let newQuantity = item.quantity;
    if (data.type === 'in') {
      newQuantity += data.quantity;
    } else if (data.type === 'out') {
      newQuantity -= data.quantity;
      if (newQuantity < 0) {
        throw new Error('Insufficient stock');
      }
    } else {
      newQuantity = data.quantity;
    }

    item.quantity = newQuantity;
    item.updatedAt = new Date();
    if (data.type === 'in') {
      item.lastRestocked = new Date();
    }
    this.items.set(item.id, item);

    const movement: StockMovement = {
      id: generateId(),
      itemId: data.itemId,
      type: data.type,
      quantity: data.quantity,
      reason: data.reason,
      performedBy: data.performedBy,
      createdAt: new Date(),
    };

    this.movements.push(movement);
    return movement;
  }

  async getMovements(itemId: string): Promise<StockMovement[]> {
    return this.movements.filter((m) => m.itemId === itemId);
  }

  async getLowStock(): Promise<InventoryItem[]> {
    const all = Array.from(this.items.values());
    return all.filter((i) => i.quantity <= i.minQuantity);
  }
}
