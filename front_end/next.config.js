/** @type {import('next').NextConfig} */
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
      }
    ]
  },
}

module.exports = nextConfig
