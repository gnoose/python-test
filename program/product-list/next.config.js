/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    api: process.env.API_URL || 'http://localhost:8000/api/v0',
  },
}

module.exports = nextConfig
