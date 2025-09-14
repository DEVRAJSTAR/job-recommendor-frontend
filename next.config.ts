import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // allows builds to succeed even with lint warnings/errors
  },
};

export default nextConfig;
