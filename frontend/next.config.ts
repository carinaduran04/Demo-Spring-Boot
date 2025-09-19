/*import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*", // 👈 proxy al backend
      },
    ];
  },
};

export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here 
  eslint: {
    ignoreDuringBuilds: true,
  },
};npm 

export default nextConfig;*/

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://72.60.26.63:8080/api/:path*", 
      },
    ];
  },
};

export default nextConfig;