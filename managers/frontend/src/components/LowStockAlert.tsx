import { useQuery } from 'react-query';
import { inventoryService } from '@/services/inventoryService';
import Link from 'next/link';

export function LowStockAlert() {
  const { data: lowStockItems } = useQuery('lowStock', () =>
    inventoryService.getLowStock()
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Low Stock Alerts</h2>
        <Link href="/inventory?lowStock=true" className="text-primary-600 text-sm hover:underline">
          View All
        </Link>
      </div>

      {lowStockItems?.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No low stock items</p>
      ) : (
        <ul className="space-y-3">
          {lowStockItems?.slice(0, 5).map((item) => (
            <li
              key={item.itemId}
              className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Min: {item.minQuantity} units
                </p>
              </div>
              <span className="px-2 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded">
                {item.currentQuantity} left
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
