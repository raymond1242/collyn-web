/** @type {import('next').NextConfig} */

const imageHostName = process.env.IMAGE_HOST_NAME;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: imageHostName,
        port: '',
        pathname: '/media/company/logos/**',
      },
    ],
  },
};

export default nextConfig;
