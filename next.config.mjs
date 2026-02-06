/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // recommended
  allowedDevOrigins: ['http://192.168.0.104:3000'], // your dev device IP
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
    ],
  },
};

export default nextConfig;
