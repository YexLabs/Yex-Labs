/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";
const nextConfig = {
  reactStrictMode: true,
  output: isProduction ? 'export' : undefined,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
};

module.exports = nextConfig;
