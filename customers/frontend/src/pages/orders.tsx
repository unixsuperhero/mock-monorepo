import { useQuery } from 'react-query';
import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/Layout';
import { OrderCard } from '@/components/OrderCard';
import { orderService } from '@/services/orderService';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function OrdersPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const { data: orders, isLoading } = useQuery(
    ['orders', user?.id],
    () => orderService.getMyOrders(),
    { enabled: !!user }
  );

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  if (authLoading || isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {orders?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You haven&apos;t placed any orders yet</p>
            <a href="/products" className="text-primary-600 hover:text-primary-500">
              Start shopping
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders?.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
