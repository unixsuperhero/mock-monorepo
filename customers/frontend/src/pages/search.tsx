import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Layout } from '@/components/Layout';
import { SearchBar } from '@/components/SearchBar';
import { ProductCard } from '@/components/ProductCard';
import { productService } from '@/services/productService';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const query = typeof q === 'string' ? q : '';

  const { data: results, isLoading } = useQuery(
    ['search', query],
    () => productService.searchProducts(query),
    { enabled: !!query }
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar placeholder="Search products..." />
        </div>

        {query && (
          <h1 className="text-2xl font-bold mb-6">
            Search results for &quot;{query}&quot;
          </h1>
        )}

        {isLoading ? (
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
        ) : results?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No results found for &quot;{query}&quot;</p>
            <p className="text-sm text-gray-400 mt-2">
              Try adjusting your search terms
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
