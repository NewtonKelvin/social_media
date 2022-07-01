/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/newPassword',
        destination: '/newPassword/index',
      },
      {
        source: '/feed',
        destination: '/system/feed',
      },
      {
        source: '/configurations',
        destination: '/system/configurations',
      }
    ]
  },
  images: {
    domains: ['s3.amazonaws.com', '192.168.15.81'],
    minimumCacheTTL: 1 * 60,
  }
}

module.exports = nextConfig
