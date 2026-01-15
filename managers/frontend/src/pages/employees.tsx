import { useState } from 'react';
import { useQuery } from 'react-query';
import { DashboardLayout } from '@/components/DashboardLayout';
import { EmployeeTable } from '@/components/EmployeeTable';
import { employeeService } from '@/services/employeeService';
import { useAuth } from '@/context/AuthContext';

export default function EmployeesPage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    department: '',
    role: '',
    status: 'active',
  });

  const { data: employees, isLoading } = useQuery(
    ['employees', filters],
    () => employeeService.getEmployees(filters),
    { enabled: !!user }
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        {user?.role === 'admin' && (
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
            Add Employee
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.department}
            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
            <option value="HR">HR</option>
          </select>
          <select
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      ) : (
        <EmployeeTable employees={employees?.data || []} />
      )}
    </DashboardLayout>
  );
}
