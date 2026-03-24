/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.annihil.uççs',
      },
      {
        protocol: 'https',
        hostname: '**.annihil.us',
      },
    ],
  },
};

module.exports = nextConfig;