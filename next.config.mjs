/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
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
