import { useQuery } from 'react-query';
import { AdminLayout } from '@/components/AdminLayout';
import { SystemHealthCard } from '@/components/SystemHealthCard';
import { ServiceStatusCard } from '@/components/ServiceStatusCard';
import { ActivityFeed } from '@/components/ActivityFeed';
import { QuickActions } from '@/components/QuickActions';
import { adminService } from '@/services/adminService';
import { useAuth } from '@/context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  const { data: systemHealth } = useQuery('systemHealth', () =>
    adminService.getSystemHealth()
  );

  const { data: services } = useQuery('services', () =>
    adminService.getServiceStatus()
  );

  const { data: activity } = useQuery('activity', () =>
    adminService.getRecentActivity()
  );

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.firstName}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <SystemHealthCard health={systemHealth} />
        <ServiceStatusCard services={services} />
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed activities={activity} />
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">System Metrics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">CPU Usage</span>
              <div className="w-48 bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Memory Usage</span>
              <div className="w-48 bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '68%' }}></div>
              </div>
              <span className="font-medium">68%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Disk Usage</span>
              <div className="w-48 bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '32%' }}></div>
              </div>
              <span className="font-medium">32%</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
