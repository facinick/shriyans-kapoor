/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./assets/pagination.json"],
      "/*": ["./content/**/*.mdx"],
    },
  },
};

module.exports = nextConfig;
