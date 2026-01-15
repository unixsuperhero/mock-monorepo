export interface SalesReport {
  id: string;
  period: ReportPeriod;
  startDate: Date;
  endDate: Date;
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: ProductSales[];
  generatedAt: Date;
}

export interface ProductSales {
  productId: string;
  productName: string;
  quantity: number;
  revenue: number;
}

export interface InventoryReport {
  id: string;
  generatedAt: Date;
  totalItems: number;
  totalValue: number;
  lowStockItems: LowStockItem[];
  categoryBreakdown: CategoryBreakdown[];
}

export interface LowStockItem {
  itemId: string;
  name: string;
  currentQuantity: number;
  minQuantity: number;
}

export interface CategoryBreakdown {
  category: string;
  itemCount: number;
  totalValue: number;
}

export interface EmployeeReport {
  id: string;
  period: ReportPeriod;
  startDate: Date;
  endDate: Date;
  totalEmployees: number;
  newHires: number;
  terminations: number;
  departmentBreakdown: DepartmentBreakdown[];
  generatedAt: Date;
}

export interface DepartmentBreakdown {
  department: string;
  employeeCount: number;
  totalSalary: number;
}

export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
