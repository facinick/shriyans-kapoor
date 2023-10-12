/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./abc/pagination.json"],
      "/*": ["./content/**/*.mdx"],
    },
  },
};

module.exports = nextConfig;
