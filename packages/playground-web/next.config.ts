import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig
