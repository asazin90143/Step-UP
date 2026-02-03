import type { NextConfig } from "next";

// Force paths to match GitHub Pages structure in both Dev and Prod
const repoName = 'Step-UP';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Always use the repository name as the base path
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  env: {
    NEXT_PUBLIC_BASE_PATH: `/${repoName}`,
  },
  reactCompiler: true,
};

export default nextConfig;
