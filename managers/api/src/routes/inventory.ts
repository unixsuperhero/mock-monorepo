import { Router } from 'express';
import {
  getInventoryItems,
  getInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  adjustStock,
  getStockMovements,
  getLowStockItems,
} from '../controllers/inventoryController';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';

export const inventoryRoutes = Router();

inventoryRoutes.use(authenticate);

inventoryRoutes.get('/', getInventoryItems);
inventoryRoutes.get('/low-stock', getLowStockItems);
inventoryRoutes.get('/:id', getInventoryItemById);
inventoryRoutes.get('/:id/movements', getStockMovements);
inventoryRoutes.post('/', requireRole(['admin', 'manager']), createInventoryItem);
inventoryRoutes.put('/:id', requireRole(['admin', 'manager']), updateInventoryItem);
inventoryRoutes.post('/adjust', adjustStock);
