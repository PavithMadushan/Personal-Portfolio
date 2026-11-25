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
        destination: "https://drive.google.com/file/d/1To0iaGir16uGVSORcY-2UnowtNT4Pu0N/view?usp=sharing", // Replace with your link
        permanent: false, // Set to false so browsers don't cache it forever
      },
    ];
  },


  /* config options here */
};

export default nextConfig;
