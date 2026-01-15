import {
  SalesReport,
  InventoryReport,
  EmployeeReport,
  ReportPeriod,
} from '../models/Report';
import { generateId } from '../utils/helpers';

interface ReportOptions {
  period: ReportPeriod;
  startDate?: Date;
  endDate?: Date;
}

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  activeEmployees: number;
  lowStockItems: number;
  revenueChange: number;
  orderChange: number;
}

export class ReportService {
  async generateSalesReport(options: ReportOptions): Promise<SalesReport> {
    const now = new Date();
    const startDate = options.startDate || this.getPeriodStart(now, options.period);
    const endDate = options.endDate || now;

    return {
      id: generateId(),
      period: options.period,
      startDate,
      endDate,
      totalRevenue: 125750.50,
      totalOrders: 342,
      averageOrderValue: 367.69,
      topProducts: [
        { productId: '1', productName: 'Premium Widget', quantity: 150, revenue: 45000 },
        { productId: '2', productName: 'Standard Gadget', quantity: 200, revenue: 30000 },
        { productId: '3', productName: 'Basic Component', quantity: 300, revenue: 15000 },
      ],
      generatedAt: new Date(),
    };
  }

  async generateInventoryReport(): Promise<InventoryReport> {
    return {
      id: generateId(),
      generatedAt: new Date(),
      totalItems: 1250,
      totalValue: 456789.00,
      lowStockItems: [
        { itemId: '1', name: 'Widget A', currentQuantity: 5, minQuantity: 20 },
        { itemId: '2', name: 'Gadget B', currentQuantity: 8, minQuantity: 15 },
      ],
      categoryBreakdown: [
        { category: 'Electronics', itemCount: 450, totalValue: 234567.00 },
        { category: 'Accessories', itemCount: 800, totalValue: 222222.00 },
      ],
    };
  }

  async generateEmployeeReport(options: ReportOptions): Promise<EmployeeReport> {
    const now = new Date();
    const startDate = options.startDate || this.getPeriodStart(now, options.period);
    const endDate = options.endDate || now;

    return {
      id: generateId(),
      period: options.period,
      startDate,
      endDate,
      totalEmployees: 85,
      newHires: 5,
      terminations: 2,
      departmentBreakdown: [
        { department: 'Engineering', employeeCount: 30, totalSalary: 3000000 },
        { department: 'Sales', employeeCount: 25, totalSalary: 1875000 },
        { department: 'Operations', employeeCount: 20, totalSalary: 1200000 },
        { department: 'HR', employeeCount: 10, totalSalary: 600000 },
      ],
      generatedAt: new Date(),
    };
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return {
      totalRevenue: 125750.50,
      totalOrders: 342,
      activeEmployees: 85,
      lowStockItems: 12,
      revenueChange: 15.3,
      orderChange: 8.7,
    };
  }

  async exportReport(type: string, format: 'csv' | 'xlsx' | 'pdf'): Promise<Buffer> {
    // Mock implementation - returns empty buffer
    return Buffer.from('');
  }

  private getPeriodStart(date: Date, period: ReportPeriod): Date {
    const start = new Date(date);
    switch (period) {
      case 'daily':
        start.setHours(0, 0, 0, 0);
        break;
      case 'weekly':
        start.setDate(start.getDate() - 7);
        break;
      case 'monthly':
        start.setMonth(start.getMonth() - 1);
        break;
      case 'quarterly':
        start.setMonth(start.getMonth() - 3);
        break;
      case 'yearly':
        start.setFullYear(start.getFullYear() - 1);
        break;
    }
    return start;
  }
}
