import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CHANNEL_URL } from "@/lib/youtube";

// Font Be Vietnam Pro TỰ HOST trong /public/fonts (khai báo @font-face ở globals.css, chia
// theo bảng chữ nên chỉ tải phần cần): không phụ thuộc Google Fonts lúc build/chạy.

const SITE_URL = "https://gocbep.vercel.app";
const SITE_NAME = "Góc Bếp";
const SITE_TITLE = "Góc Bếp – Món quê trên phố";
const SITE_DESCRIPTION =
  "Video nấu ăn món quê dân dã mỗi ngày kèm công thức chi tiết từng bước, nguyên liệu dễ tìm, dễ làm tại nhà từ kênh YouTube Góc Bếp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_TITLE} | Video & công thức nấu ăn`,
    template: "%s | Góc Bếp",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "vi_VN",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Logo Góc Bếp" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Xác minh quyền sở hữu domain này trong Google Search Console — cần cho
  // bước "Authorized domain" khi publish OAuth consent screen của dự án
  // camera-recorder. Next.js tự render thành thẻ
  // <meta name="google-site-verification" content="..." />.
  verification: {
    google: "-Xaf9IqKUu_7S27yyFsEf7ZZKvHd59dbA6mQf-9cF68",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0E0C",
  width: "device-width",
  initialScale: 1,
};

// Structured data toàn site: giúp Google hiểu thương hiệu + hiển thị tên site.
const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_TITLE,
    url: SITE_URL,
    inLanguage: "vi-VN",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [CHANNEL_URL],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="vi">
      <head>
        {/* Ảnh thumbnail (LCP) nằm ở i.ytimg.com: mở sẵn kết nối DNS+TLS ngay từ đầu,
            tiết kiệm ~0.5-1s trên mạng chậm. */}
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <link rel="preload" href="/fonts/be-vietnam-pro-vietnamese-900-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {/* Chỉ tải script AdSense khi đã cấu hình NEXT_PUBLIC_ADSENSE_CLIENT
            trên Vercel — xem README.md mục "Bật quảng cáo (AdSense)". */}
        {adsenseClient && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
