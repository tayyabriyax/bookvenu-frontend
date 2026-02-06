/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // optional if using Unsplash
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com', // optional if using iStock
      },
    ],
  },
};

export default nextConfig;