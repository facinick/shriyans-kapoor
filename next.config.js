/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./content/pagination.json"],
      "/*": ["./content/**/*.mdx"],
    },
  },
};

module.exports = nextConfig;
