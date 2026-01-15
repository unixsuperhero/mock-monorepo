import { Router } from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/orderController';
import { authenticate } from '../middleware/auth';
import { validateBody } from '../middleware/validation';

export const orderRoutes = Router();

orderRoutes.get('/', authenticate, getOrders);
orderRoutes.get('/:id', authenticate, getOrderById);
orderRoutes.post('/', authenticate, validateBody(['customerId', 'items', 'shippingAddress']), createOrder);
orderRoutes.patch('/:id/status', authenticate, validateBody(['status']), updateOrderStatus);
orderRoutes.post('/:id/cancel', authenticate, cancelOrder);
