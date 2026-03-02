import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Mantine v8 manages its own tree-shaking — adding it here breaks
    // compound components (Table.ScrollContainer, etc.) at runtime.
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
