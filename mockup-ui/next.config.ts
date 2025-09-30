// next.config.ts
import type { NextConfig } from "next";

const repoName = "Mockup";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // 👈 important for GitHub Pages
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
    ],
  },
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  trailingSlash: true,
  ...(isProd ? { output: "export" } : {}), // 👈 only export in prod
};

export default nextConfig;
