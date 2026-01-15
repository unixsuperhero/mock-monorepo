import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/services/productService';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 bg-gray-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
          {product.onSale && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Sale
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {product.salePrice ? (
                <>
                  <span className="font-bold text-primary-600">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="font-bold text-gray-800">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-xs text-orange-500">Only {product.stock} left</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
