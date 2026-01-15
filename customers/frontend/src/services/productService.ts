import { apiClient } from './apiClient';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  onSale: boolean;
  imageUrl?: string;
  categoryId: string;
  stock: number;
  createdAt: string;
}

interface GetProductsOptions {
  featured?: boolean;
  categoryId?: string;
  limit?: number;
  page?: number;
}

export const productService = {
  async getProducts(options: GetProductsOptions = {}): Promise<Product[]> {
    const params = new URLSearchParams();
    if (options.featured) params.append('featured', 'true');
    if (options.categoryId) params.append('categoryId', options.categoryId);
    if (options.limit) params.append('limit', String(options.limit));
    if (options.page) params.append('page', String(options.page));

    const response = await apiClient.get<{ data: Product[] }>(
      `/products?${params.toString()}`
    );
    return response.data.data;
  },

  async getProductById(id: string): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  async searchProducts(query: string): Promise<Product[]> {
    const response = await apiClient.get<{ data: Product[] }>(
      `/products/search?q=${encodeURIComponent(query)}`
    );
    return response.data.data;
  },
};
