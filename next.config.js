/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./public/pagination.json"],
      "/*": ["./content/**/*.mdx"],
    },
  },
};

module.exports = nextConfig;
