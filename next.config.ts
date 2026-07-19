import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/cv",
        destination: "/assets/DIMOSTHENIS_GKONTOLIAS_CV.pdf",
      },
    ];
  },
};

export default nextConfig;
