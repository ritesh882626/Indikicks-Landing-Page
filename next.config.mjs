/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  turbopack: {
    root: process.cwd()
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp']
  }
}

export default nextConfig
