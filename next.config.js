/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/', // The root URL
        destination: '/all?page=1', // Redirect to this URL
        permanent: false, // Set to `false` for a 302 permanent redirect
      },
    ];
  },
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;
