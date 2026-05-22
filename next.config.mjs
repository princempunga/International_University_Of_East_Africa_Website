/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // This allows dev resources to be accessed via the network IP
  allowedDevOrigins: ['172.16.114.87', 'retrieval-modular-detention.ngrok-free.dev'],
}

export default nextConfig
