import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
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
};

export default nextConfig;
