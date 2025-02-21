import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
images: {
  dangerouslyAllowSVG: true,
  remotePatterns: [
    {
      protocol: "https",
      hostname: "*", // Allow images from any hostname
      port: "",
      pathname: "/**", // Allow any path
    },
  ],
},
};

export default nextConfig;
