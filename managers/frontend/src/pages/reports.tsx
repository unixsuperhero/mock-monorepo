import { useState } from 'react';
import { useQuery } from 'react-query';
import { DashboardLayout } from '@/components/DashboardLayout';
import { SalesReportCard } from '@/components/SalesReportCard';
import { InventoryReportCard } from '@/components/InventoryReportCard';
import { EmployeeReportCard } from '@/components/EmployeeReportCard';
import { reportService } from '@/services/reportService';
import { useAuth } from '@/context/AuthContext';

type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export default function ReportsPage() {
  const { user } = useAuth();
  const [period, setPeriod] = useState<ReportPeriod>('monthly');

  const { data: salesReport, isLoading: salesLoading } = useQuery(
    ['salesReport', period],
    () => reportService.getSalesReport(period),
    { enabled: !!user }
  );

  const { data: inventoryReport, isLoading: inventoryLoading } = useQuery(
    'inventoryReport',
    () => reportService.getInventoryReport(),
    { enabled: !!user }
  );

  const { data: employeeReport, isLoading: employeeLoading } = useQuery(
    ['employeeReport', period],
    () => reportService.getEmployeeReport(period),
    { enabled: !!user }
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex items-center space-x-4">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as ReportPeriod)}
            className="border rounded-md px-3 py-2"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
            Export All
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <SalesReportCard report={salesReport} isLoading={salesLoading} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InventoryReportCard report={inventoryReport} isLoading={inventoryLoading} />
          <EmployeeReportCard report={employeeReport} isLoading={employeeLoading} />
        </div>
      </div>
    </DashboardLayout>
  );
}
