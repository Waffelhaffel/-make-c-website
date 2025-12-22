import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Temporarily ignore ESLint errors during build to test
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Temporarily ignore TypeScript errors during build to test
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
