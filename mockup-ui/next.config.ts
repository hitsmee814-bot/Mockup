// next.config.ts
import type { NextConfig } from "next";

const repoName = "Mockup";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export", // ✅ always set this for static export

  images: {
    unoptimized: true, // ✅ required for GitHub Pages
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

  // ✅ only set these when deploying to GitHub Pages
  basePath: isProd ? `/${repoName}` : undefined,
  assetPrefix: isProd ? `/${repoName}/` : undefined,

  trailingSlash: true,
};

export default nextConfig;
