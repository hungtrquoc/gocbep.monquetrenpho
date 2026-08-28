import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://gocbep.vercel.app"),
  title: {
    default: "Góc Bếp – Món quê trên phố",
    template: "%s | Góc Bếp",
  },
  description:
    "Kênh Góc Bếp chia sẻ video nấu ăn món quê giản dị giữa lòng phố thị. Xem video mới nhất và tìm hiểu về kênh Góc Bếp.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Góc Bếp – Món quê trên phố",
    description:
      "Kênh Góc Bếp chia sẻ video nấu ăn món quê giản dị giữa lòng phố thị.",
    images: ["/logo.png"],
    type: "website",
  },
  // Xác minh quyền sở hữu domain này trong Google Search Console — cần cho
  // bước "Authorized domain" khi publish OAuth consent screen của dự án
  // camera-recorder. Next.js tự render thành thẻ
  // <meta name="google-site-verification" content="..." />.
  verification: {
    google: "-Xaf9IqKUu_7S27yyFsEf7ZZKvHd59dbA6mQf-9cF68",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="vi">
      <body className="flex min-h-screen flex-col font-display">
        {/* Chỉ tải script AdSense khi đã cấu hình NEXT_PUBLIC_ADSENSE_CLIENT
            trên Vercel — xem README.md mục "Bật quảng cáo (AdSense)". */}
        {adsenseClient && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
