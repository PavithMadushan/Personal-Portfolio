import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/cv",
        destination: "https://drive.google.com/file/d/19tq6iLUt85i7DCgW3nsNyYCPwo2Rr4gr/view?usp=sharing", // Replace with your link
        permanent: false, // Set to false so browsers don't cache it forever
      },
    ];
  },


  /* config options here */
};

export default nextConfig;
