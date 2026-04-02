/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This is a "global allow" for development
      },
      {
        protocol: 'http',
        hostname: '**', // Allows the older API links
      },
    ],
  },
};

export default nextConfig;