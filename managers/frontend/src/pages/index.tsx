import { useQuery } from 'react-query';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { RevenueChart } from '@/components/RevenueChart';
import { LowStockAlert } from '@/components/LowStockAlert';
import { reportService } from '@/services/reportService';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const { data: stats, isLoading } = useQuery(
    'dashboardStats',
    () => reportService.getDashboardStats(),
    { enabled: !!user }
  );

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  if (authLoading || isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-80 bg-gray-200 rounded-lg"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`$${stats?.totalRevenue.toLocaleString()}`}
          change={stats?.revenueChange}
          trend="up"
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders.toLocaleString() || '0'}
          change={stats?.orderChange}
          trend="up"
        />
        <StatCard
          title="Active Employees"
          value={stats?.activeEmployees.toString() || '0'}
        />
        <StatCard
          title="Low Stock Items"
          value={stats?.lowStockItems.toString() || '0'}
          trend={stats?.lowStockItems > 10 ? 'down' : undefined}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
            <RevenueChart />
          </div>
        </div>
        <div>
          <LowStockAlert />
        </div>
      </div>
    </DashboardLayout>
  );
}
