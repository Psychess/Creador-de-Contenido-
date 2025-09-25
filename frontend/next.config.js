/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'localhost',
      'p16-sign-va.tiktokcdn.com',
      'scontent.cdninstagram.com',
      'pbs.twimg.com',
      'i.ytimg.com',
      'graph.facebook.com',
      'media.licdn.com'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/:path*`,
      },
    ];
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3001',
    NEXT_PUBLIC_FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
};

module.exports = nextConfig;