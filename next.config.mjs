/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cache dài cho file tĩnh trong /public (logo, ảnh) trên Edge CDN; file trong
  // /_next/static (JS/CSS/font có hash) Vercel đã tự gắn "immutable".
  async headers() {
    return [
      {
        source: "/:path*.(png|jpg|jpeg|webp|avif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "yt3.googleusercontent.com",
      },
      // Ảnh sản phẩm affiliate (tab "Thêm sản phẩm" / lib/products.ts) - CDN
      // ảnh của các sàn TMĐT. Dùng wildcard "**." vì mỗi sàn có nhiều subdomain
      // theo khu vực (vd Shopee: down-vn, deo-vn, down-sg,...).
      {
        protocol: "https",
        hostname: "**.susercontent.com", // Shopee (down-vn.img.susercontent.com,...)
      },
      {
        protocol: "https",
        hostname: "**.slatic.net", // Lazada (lzd-img-global.slatic.net,...)
      },
      {
        protocol: "https",
        hostname: "**.lazcdn.com", // Lazada (dự phòng, một số ảnh dùng domain này)
      },
      {
        protocol: "https",
        hostname: "**.ibyteimg.com", // TikTok Shop (p16-oec-va.ibyteimg.com,...)
      },
      {
        protocol: "https",
        hostname: "**.tiktokcdn.com", // TikTok Shop (dự phòng)
      },
    ],
  },
};

export default nextConfig;
