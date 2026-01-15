import { Request, Response, NextFunction } from 'express';
import { InventoryService } from '../services/inventoryService';
import { CreateInventoryItemDTO, UpdateInventoryDTO, StockAdjustmentDTO } from '../models/Inventory';
import { AuthRequest } from '../middleware/auth';

const inventoryService = new InventoryService();

export const getInventoryItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, location, lowStock, page = 1, limit = 50 } = req.query;
    const items = await inventoryService.findAll({
      category: category as string,
      location: location as string,
      lowStock: lowStock === 'true',
      page: Number(page),
      limit: Number(limit),
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getInventoryItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await inventoryService.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const createInventoryItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: CreateInventoryItemDTO = req.body;
    const item = await inventoryService.create(data);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

export const updateInventoryItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: UpdateInventoryDTO = req.body;
    const item = await inventoryService.update(req.params.id, data);
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const adjustStock = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: StockAdjustmentDTO = req.body;
    const movement = await inventoryService.adjustStock({
      ...data,
      performedBy: req.user!.userId,
    });
    res.status(201).json(movement);
  } catch (error) {
    next(error);
  }
};

export const getStockMovements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movements = await inventoryService.getMovements(req.params.id);
    res.json(movements);
  } catch (error) {
    next(error);
  }
};

export const getLowStockItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await inventoryService.getLowStock();
    res.json(items);
  } catch (error) {
    next(error);
  }
};
