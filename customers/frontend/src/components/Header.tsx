import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary-600">
            Customer Portal
          </Link>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-gray-600 hover:text-primary-600">
              Products
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-primary-600">
              Cart
            </Link>

            {user ? (
              <>
                <Link href="/orders" className="text-gray-600 hover:text-primary-600">
                  My Orders
                </Link>
                <Link href="/profile" className="text-gray-600 hover:text-primary-600">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-primary-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-primary-600">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/products" className="block py-2 text-gray-600">
              Products
            </Link>
            <Link href="/cart" className="block py-2 text-gray-600">
              Cart
            </Link>
            {user ? (
              <>
                <Link href="/orders" className="block py-2 text-gray-600">
                  My Orders
                </Link>
                <button onClick={logout} className="block py-2 text-gray-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 text-gray-600">
                  Sign In
                </Link>
                <Link href="/register" className="block py-2 text-gray-600">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
