import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "br-small-bar-b204sfwu.storage.c-6.eu-central-1.aws.neon.tech",
      },
    ],
  },
};

export default nextConfig;
