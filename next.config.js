/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    EMAIL_HOST: process.env.EMAIL_HOST || "smtp.hostinger.com",
    EMAIL_PORT: process.env.EMAIL_PORT || "587",
    EMAIL_USER: process.env.EMAIL_USER || "info@oktaxis.co.uk",
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    MONGO_URI:
      process.env.MONGO_URI ||
      "mongodb+srv://asmasiddique44097:blogpost_12345@cluster0.rfedyai.mongodb.net/Blogs?retryWrites=true&w=majority&appName=Cluster0",
  },
  images: {
    domains: ["localhost"], // ✅ allow local API image URLs
  },
};

module.exports = nextConfig;
