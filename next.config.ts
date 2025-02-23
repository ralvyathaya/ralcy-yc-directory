 // Start of Selection
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Allow images from any hostname
        pathname: "/**", // Allow any path
      },
    ],
  },
  experimental: {
    ppr: "incremental"
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  }
};

export default nextConfig;
