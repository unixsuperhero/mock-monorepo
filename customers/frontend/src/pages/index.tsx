import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/Layout';
import { ProductGrid } from '@/components/ProductGrid';
import { HeroBanner } from '@/components/HeroBanner';
import Link from 'next/link';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <Layout>
      <HeroBanner
        title="Welcome to Our Store"
        subtitle="Discover amazing products at great prices"
        ctaText="Shop Now"
        ctaLink="/products"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <ProductGrid featured limit={4} />
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Shop With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
            <div className="p-6">
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Your data is always protected</p>
            </div>
            <div className="p-6">
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">We&apos;re here to help anytime</p>
            </div>
          </div>
        </div>
      </section>

      {!user && (
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Us Today</h2>
            <p className="text-gray-600 mb-6">
              Create an account to track your orders and get exclusive deals
            </p>
            <Link
              href="/register"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
            >
              Create Account
            </Link>
          </div>
        </section>
      )}
    </Layout>
  );
}
