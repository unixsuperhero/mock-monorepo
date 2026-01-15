import { Order } from '@/services/orderService';
import Link from 'next/link';

interface OrderCardProps {
  order: Order;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">Order #{order.id.slice(0, 8)}</h3>
          <p className="text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[order.status] || 'bg-gray-100 text-gray-800'
          }`}
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="space-y-2">
          {order.items.slice(0, 3).map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.productName} x {item.quantity}
              </span>
              <span className="font-medium">${item.subtotal.toFixed(2)}</span>
            </div>
          ))}
          {order.items.length > 3 && (
            <p className="text-sm text-gray-500">
              +{order.items.length - 3} more items
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">
        <span className="font-bold text-lg">Total: ${order.total.toFixed(2)}</span>
        <Link
          href={`/orders/${order.id}`}
          className="text-primary-600 hover:text-primary-500 font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
