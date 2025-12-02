import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // For speed in this demo, strictly should be false
  },
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: '**',
        }
    ]
  }
};

export default nextConfig;
