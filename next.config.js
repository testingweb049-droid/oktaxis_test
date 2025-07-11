/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
 
  images: {
    domains: ["res.cloudinary.com"], // add other domains if needed
  },
};

module.exports = nextConfig;
