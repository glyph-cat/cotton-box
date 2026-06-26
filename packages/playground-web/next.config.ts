import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  turbopack: {
    root: path.join(__dirname, '..', '..'),
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig
