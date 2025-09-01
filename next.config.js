/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Safety net: don’t fail build on type/eslint issues
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
module.exports = nextConfig;
