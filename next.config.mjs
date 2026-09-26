import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "besthomz.in",
        pathname: "/assets/images/**",
      },
      {
        protocol: "https",
        hostname: "www.besthomz.in",
        pathname: "/assets/images/**",
      },
    ],
  },
};

export default nextConfig;
