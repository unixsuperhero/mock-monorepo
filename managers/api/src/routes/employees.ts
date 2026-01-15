import { Router } from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  terminateEmployee,
  getDirectReports,
} from '../controllers/employeeController';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';

export const employeeRoutes = Router();

employeeRoutes.use(authenticate);

employeeRoutes.get('/', getEmployees);
employeeRoutes.get('/:id', getEmployeeById);
employeeRoutes.get('/:id/reports', getDirectReports);
employeeRoutes.post('/', requireRole(['admin']), createEmployee);
employeeRoutes.put('/:id', requireRole(['admin', 'manager']), updateEmployee);
employeeRoutes.post('/:id/terminate', requireRole(['admin']), terminateEmployee);
