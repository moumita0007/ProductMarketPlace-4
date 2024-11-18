/** @type {import('next').NextConfig} */
const nextConfig = {
  // Base path for GitHub Pages
  basePath: '/ProductMarketPlace-2',
  assetPrefix: '/ProductMarketPlace-2/',

  // Enables static export for GitHub Pages
  trailingSlash: true,

  // Other Next.js configurations
  reactStrictMode: true,
  swcMinify: true,

  images: {
    unoptimized: true, // Necessary for GitHub Pages to handle images correctly
  },
};

module.exports = nextConfig;

