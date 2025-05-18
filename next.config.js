/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Email configuration
  env: {
    EMAIL_HOST: process.env.EMAIL_HOST || "smtp.hostinger.com",
    EMAIL_PORT: process.env.EMAIL_PORT || "587",
    EMAIL_USER: process.env.EMAIL_USER || "info@oktaxis.co.uk",
    // Password should always come from environment variables in production
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  },
};

module.exports = nextConfig;
