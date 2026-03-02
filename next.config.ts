import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@mantine/core', '@mantine/charts'],
  },
};

export default nextConfig;
