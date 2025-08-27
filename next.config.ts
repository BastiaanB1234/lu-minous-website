import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable image optimization completely
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
