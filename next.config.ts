import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      // API routes voor webshop
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      // Subdomein support voor webshop
      {
        source: '/shop/:path*',
        destination: '/shop/:path*',
      },
      // Fallback voor hoofddomein
      {
        source: '/',
        destination: '/',
      },
    ];
  },
  // Ondersteuning voor meerdere domeinen
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
      {
        source: '/shop/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  // Zorg ervoor dat API routes correct werken
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
