/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
  // Make it explicit: this project uses Turbopack (dev + build).
  turbopack: {},
};

export default nextConfig;
