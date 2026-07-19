import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/cv",
        destination: "/assets/Dimosthenis-Gkontolias-Resume.pdf",
      },
    ];
  },
};

export default nextConfig;
