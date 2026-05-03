/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // This allows dev resources to be accessed via the network IP
  allowedDevOrigins: ['172.16.114.87'],
}

export default nextConfig
