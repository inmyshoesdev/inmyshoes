/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/demo',
        destination: '/youth',
        permanent: false,
      },
    ]
  },
}
