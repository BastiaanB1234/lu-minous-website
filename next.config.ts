import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lu.minous.app',
        port: '',
        pathname: '/images/**',
      },
    ],
    unoptimized: true, // Disable Next.js image optimization for now
  },
};

export default nextConfig;
