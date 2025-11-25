import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/audit_tool' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  allowedDevOrigins: ['http://172.27.144.1:3000'],
};

export default nextConfig;
