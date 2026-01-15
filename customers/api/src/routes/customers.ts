import { Router } from 'express';
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customerController';
import { authenticate } from '../middleware/auth';
import { validateBody } from '../middleware/validation';

export const customerRoutes = Router();

customerRoutes.get('/', authenticate, getCustomers);
customerRoutes.get('/:id', authenticate, getCustomerById);
customerRoutes.post('/', validateBody(['email', 'firstName', 'lastName', 'password']), createCustomer);
customerRoutes.put('/:id', authenticate, updateCustomer);
customerRoutes.delete('/:id', authenticate, deleteCustomer);
