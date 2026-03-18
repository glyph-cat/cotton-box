import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig
