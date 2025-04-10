/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Recommended for Vercel
  // If using Cloudflare Workers features:
  experimental: {
    instrumentationHook: true,
  }
};

module.exports = nextConfig;