/** @type {import('next').NextConfig} */

const imageHostName = process.env.IMAGE_HOST_NAME;

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'collyn-bucket-local.s3.amazonaws.com',
        port: '',
        pathname: '/media/**/**',
      },
    ],
  },
};

export default nextConfig;
