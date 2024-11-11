/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {

    remotePatterns: [{hostname: 'igcgcloud.netlify.app', protocol: 'https'}, {hostname: 'github.com', protocol: 'https'}]
  }
}

module.exports = nextConfig
