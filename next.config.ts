import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 92, 100],
    remotePatterns: [
      { protocol: "https", hostname: "prof-p.ru" },
      { protocol: "https", hostname: "mc.yandex.ru" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/soglasie-na-obrabotku-personalnyh-dannyh",
        destination: "/soglasie.pdf",
      },
      {
        source: "/callback/:path*",
        destination: "https://prof-p.ru/callback/:path*",
      },
      {
        source: "/antibot/:path*",
        destination: "https://prof-p.ru/antibot/:path*",
      },
      {
        source: "/visite.php",
        destination: "https://prof-p.ru/visite.php",
      },
      {
        source: "/block_a.php",
        destination: "https://prof-p.ru/block_a.php",
      },
      {
        source: "/block_as.php",
        destination: "https://prof-p.ru/block_as.php",
      },
    ];
  },
};

export default nextConfig;
