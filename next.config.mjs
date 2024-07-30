/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.IMAGE_HOST_NAME,
        port: '',
        pathname: '/media/company/logos/**',
      },
    ],
  },
};

export default nextConfig;
