/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['soristic.sgp1.cdn.digitaloceanspaces.com']
  },
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
