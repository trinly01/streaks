import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_HOST: 'http://localhost:3000',
  },
};

export default nextConfig;
