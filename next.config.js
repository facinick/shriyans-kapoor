/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./public/pagination.json"],
    },
  },
};

module.exports = nextConfig;
