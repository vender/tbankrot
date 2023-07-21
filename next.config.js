/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'files.tbankrot.ru',
            port: '',
            pathname: '/etpPhoto/**',
          },
        ],
    },
}

module.exports = nextConfig
