// next.config.ts
import type { NextConfig } from "next";

const repoName = "Mockup";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export", // required for static export

  images: {
    unoptimized: true, // required for GitHub Pages
  },

  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;
