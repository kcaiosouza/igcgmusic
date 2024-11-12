import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{hostname: 'github.com', protocol: 'https'}]
  }
};

export default withNextIntl(nextConfig);
