import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  },
};

export default nextConfig;
