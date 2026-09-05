import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Video-testimonial poster frames are pulled from YouTube rather than
    // checked into public/ — see src/data/youtube.ts.
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com", pathname: "/vi/**" },
    ],
  },
};

export default nextConfig;
