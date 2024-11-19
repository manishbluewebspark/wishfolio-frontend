/** @type {import('next').NextConfig} */

const nextConfig = {
  // images: {
  //   domains: ["localhost", "13.53.166.146", "wishfolio.co"], // Add multiple domains if needed
  // },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wishfolio.co",
        port: "",
        pathname: "/**", // You can be more specific with paths
      },
    ],
  },
};

export default nextConfig;
