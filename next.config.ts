import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1'; // Detect Vercel environment
const repoName = 'Step-UP';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Only use base path for GitHub Pages (Production but NOT Vercel)
  basePath: (isProd && !isVercel) ? `/${repoName}` : '',
  assetPrefix: (isProd && !isVercel) ? `/${repoName}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: (isProd && !isVercel) ? `/${repoName}` : '',
  },
  reactCompiler: true,
};

export default nextConfig;
