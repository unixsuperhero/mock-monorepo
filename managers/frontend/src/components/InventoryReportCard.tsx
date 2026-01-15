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

interface InventoryReportCardProps {
  report?: InventoryReport;
  isLoading: boolean;
}

export function InventoryReportCard({ report, isLoading }: InventoryReportCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-48 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Inventory Report</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-primary-600">
            {report?.totalItems.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Total Items</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-primary-600">
            ${report?.totalValue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Total Value</p>
        </div>
      </div>

      <h3 className="font-medium mb-3">By Category</h3>
      <div className="space-y-2">
        {report?.categoryBreakdown.map((cat) => (
          <div key={cat.category} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>{cat.category}</span>
            <div className="text-right">
              <span className="text-sm text-gray-500 mr-4">{cat.itemCount} items</span>
              <span className="font-medium">${cat.totalValue.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
