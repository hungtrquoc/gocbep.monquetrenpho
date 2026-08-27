import type { Metadata } from "next";
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="flex min-h-screen flex-col font-display">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
