/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  transpilePackages: ["react-simple-maps"],

  images: {
    unoptimized: true,
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;