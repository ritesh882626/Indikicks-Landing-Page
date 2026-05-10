/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  turbopack: {
    root: process.cwd()
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp']
  }
}

export default nextConfig
