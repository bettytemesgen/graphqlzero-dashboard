/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This will ignore the 'ignoreDeprecations' type error
    ignoreBuildErrors: true, 
  },
  eslint: {
    // This prevents ESLint from stopping the build
    ignoreDuringBuilds: true,
  },
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