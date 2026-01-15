import { Router } from 'express';
import {
  getSalesReport,
  getInventoryReport,
  getEmployeeReport,
  getDashboardStats,
  exportReport,
} from '../controllers/reportController';
import { authenticate } from '../middleware/auth';

export const reportRoutes = Router();

reportRoutes.use(authenticate);

reportRoutes.get('/dashboard', getDashboardStats);
reportRoutes.get('/sales', getSalesReport);
reportRoutes.get('/inventory', getInventoryReport);
reportRoutes.get('/employees', getEmployeeReport);
reportRoutes.get('/export', exportReport);
