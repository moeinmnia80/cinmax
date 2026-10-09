import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "br-small-bar-b204sfwu.storage.c-6.eu-central-1.aws.neon.tech",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
