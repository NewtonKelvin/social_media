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
        source: '/config/editProfile',
        destination: '/system/editProfile',
      },
      {
        source: '/post/:post',
        destination: '/system/post/:post',
      }
    ]
  },
  images: {
    domains: ['s3.amazonaws.com', '192.168.15.81'],
    minimumCacheTTL: 1 * 60,
  },
  env: {
    ENVIRONMENT: "development",
    AWS_S3_LINK: "https://s3.amazonaws.com/kn-social.media",
    BACK_END: "http://192.168.15.81:3001/v1"
  }
}

module.exports = nextConfig
