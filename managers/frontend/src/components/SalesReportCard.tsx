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

interface SalesReportCardProps {
  report?: SalesReport;
  isLoading: boolean;
}

export function SalesReportCard({ report, isLoading }: SalesReportCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Sales Report</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-primary-600">
            ${report?.totalRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Total Revenue</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-primary-600">
            {report?.totalOrders}
          </p>
          <p className="text-sm text-gray-500">Total Orders</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-primary-600">
            ${report?.averageOrderValue.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">Avg Order Value</p>
        </div>
      </div>

      <h3 className="font-medium mb-3">Top Products</h3>
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-xs text-gray-500 uppercase">
            <th className="pb-2">Product</th>
            <th className="pb-2">Qty</th>
            <th className="pb-2 text-right">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {report?.topProducts.map((product) => (
            <tr key={product.productId} className="border-t">
              <td className="py-2">{product.productName}</td>
              <td className="py-2">{product.quantity}</td>
              <td className="py-2 text-right">${product.revenue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
