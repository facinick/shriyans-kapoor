/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./pagination/**/*.json"],
      "/*": ["./content/**/*.mdx"],
    },
  },
};

module.exports = nextConfig;
