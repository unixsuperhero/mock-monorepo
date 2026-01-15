import { apiClient } from './apiClient';

type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  activeEmployees: number;
  lowStockItems: number;
  revenueChange: number;
  orderChange: number;
}

interface SalesReport {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: Array<{
    productId: string;
    productName: string;
    quantity: number;
    revenue: number;
  }>;
}

interface InventoryReport {
  totalItems: number;
  totalValue: number;
  lowStockItems: Array<{
    itemId: string;
    name: string;
    currentQuantity: number;
    minQuantity: number;
  }>;
  categoryBreakdown: Array<{
    category: string;
    itemCount: number;
    totalValue: number;
  }>;
}

interface EmployeeReport {
  totalEmployees: number;
  newHires: number;
  terminations: number;
  departmentBreakdown: Array<{
    department: string;
    employeeCount: number;
    totalSalary: number;
  }>;
}

export const reportService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>('/reports/dashboard');
    return response.data;
  },

  async getSalesReport(period: ReportPeriod): Promise<SalesReport> {
    const response = await apiClient.get<SalesReport>(`/reports/sales?period=${period}`);
    return response.data;
  },

  async getInventoryReport(): Promise<InventoryReport> {
    const response = await apiClient.get<InventoryReport>('/reports/inventory');
    return response.data;
  },

  async getEmployeeReport(period: ReportPeriod): Promise<EmployeeReport> {
    const response = await apiClient.get<EmployeeReport>(`/reports/employees?period=${period}`);
    return response.data;
  },

  async exportReport(type: string, format: 'csv' | 'xlsx' | 'pdf'): Promise<Blob> {
    const response = await apiClient.get(`/reports/export?type=${type}&format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
