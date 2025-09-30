// next.config.ts
import type { NextConfig } from "next";

const repoName = "Mockup";

const nextConfig: NextConfig = {
  output: "export", // static export always

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
    ],
  },

  // ✅ Always set these for GitHub Pages
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,

  trailingSlash: true,
};

export default nextConfig;
