/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "pottertrivia.s3.eu-central-1.amazonaws.com",
      "d16toh0t29dtt4.cloudfront.net",
      "i.ibb.co",
      "ibb.co",
    ],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
}

export default nextConfig
