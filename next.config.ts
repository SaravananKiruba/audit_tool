import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/audit_tool',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
