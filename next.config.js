/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',           // The root URL
        destination: '/all?page=1',  // Redirect to this URL
        permanent: true,       // Set to `true` for a 301 permanent redirect
      },
    ];
  },
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;
