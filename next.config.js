/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    EMAIL_HOST: process.env.EMAIL_HOST || "smtp.hostinger.com",
    EMAIL_PORT: process.env.EMAIL_PORT || "587",
    EMAIL_USER: process.env.EMAIL_USER || "info@oktaxis.co.uk",
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    
  },
  images: {
    domains: ["localhost",'res.cloudinary.com'], // ✅ allow local API image URLs
  },
};

module.exports = nextConfig;
