/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Strapi Backend
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      // Edgestore Endpoints for Images
      {
        protocol: "https",
        hostname: "www.edgestore.com",
      },
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
    ],
  },
};

module.exports = nextConfig;
