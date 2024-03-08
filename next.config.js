/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./pagination/**/*.json"],
      "/*": ["./content/**/*.mdx"],
      "/*": ["pagination/**/*.json"],
      "/*": ["content/**/*.mdx"],
      "/*": ["**/*.json"],
      "/*": ["**/*.mdx"],
    },
  },
};

module.exports = nextConfig;
