import { useQuery } from 'react-query';
import { productService } from '@/services/productService';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  featured?: boolean;
  categoryId?: string;
  limit?: number;
}

export function ProductGrid({ featured, categoryId, limit }: ProductGridProps) {
  const { data: products, isLoading, error } = useQuery(
    ['products', { featured, categoryId, limit }],
    () => productService.getProducts({ featured, categoryId, limit })
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-t-lg"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Failed to load products. Please try again.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
