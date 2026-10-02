import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    qualities: [75, 90],
  },
  // Old URLs from when the Litebox work and artifacts lived under their own
  // password-gated /work/private section; links to them were already shared.
  async redirects() {
    return [
      { source: "/work/private/artifacts/:path*", destination: "/artifacts/:path*", permanent: true },
      { source: "/work/private/enter", destination: "/enter", permanent: true },
      { source: "/work/private", destination: "/#work", permanent: true },
      { source: "/work/private/:slug", destination: "/work/:slug", permanent: true },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
