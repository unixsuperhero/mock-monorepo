import { useState } from 'react';
import { useQuery } from 'react-query';
import { DashboardLayout } from '@/components/DashboardLayout';
import { InventoryTable } from '@/components/InventoryTable';
import { inventoryService } from '@/services/inventoryService';
import { useAuth } from '@/context/AuthContext';

export default function InventoryPage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    lowStock: false,
  });

  const { data: items, isLoading } = useQuery(
    ['inventory', filters],
    () => inventoryService.getItems(filters),
    { enabled: !!user }
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <div className="space-x-2">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            Export
          </button>
          {(user?.role === 'admin' || user?.role === 'manager') && (
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
              Add Item
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Components">Components</option>
          </select>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Locations</option>
            <option value="Warehouse A">Warehouse A</option>
            <option value="Warehouse B">Warehouse B</option>
            <option value="Store Front">Store Front</option>
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.lowStock}
              onChange={(e) => setFilters({ ...filters, lowStock: e.target.checked })}
              className="rounded border-gray-300"
            />
            <span>Low Stock Only</span>
          </label>
        </div>
      </div>

      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      ) : (
        <InventoryTable items={items?.data || []} />
      )}
    </DashboardLayout>
  );
}
