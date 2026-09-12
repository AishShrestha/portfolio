/** @type {import('next').NextConfig} */
const isExport = process.env.ENABLE_EXPORT === '1';

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // export mode has no image optimization server; ship original files
    unoptimized: isExport,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  ...(isExport
    ? {
        output: 'export',
        basePath: process.env.EXPORT_BASE_PATH || '',
        assetPrefix: process.env.EXPORT_BASE_PATH || '',
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
