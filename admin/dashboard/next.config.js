/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mock-monorepo/shared-utils'],
  async rewrites() {
    return [
      {
        source: '/api/customers/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
      {
        source: '/api/managers/:path*',
        destination: 'http://localhost:3002/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
