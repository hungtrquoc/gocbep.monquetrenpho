import Image from "next/image";
import Link from "next/link";
import { CHANNEL_URL } from "@/lib/youtube";
import SearchBox from "@/components/SearchBox";

const NAV_LINKS = [
  { href: "/videos", label: "Video" },
  { href: "/cong-thuc", label: "Công thức" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
];

// Học theo RecipeTin Eats / Just One Cookbook: header trắng gọn, 1 hàng:
// logo trái - menu - ô tìm kiếm LUÔN thấy - nút YouTube. Mobile: menu cuộn ngang ở hàng dưới.
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-coffee/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-5 px-4 py-2.5">
        <Link href="/" className="flex flex-none items-center gap-2.5">
          <Image src="/logo.png" alt="Logo Góc Bếp" width={44} height={44} className="rounded-full" priority />
          <span className="whitespace-nowrap font-display text-2xl font-bold tracking-tight text-coffee">
            Góc Bếp
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-3 py-2 text-sm font-semibold text-coffee/80 transition hover:bg-coffee/5 hover:text-chili"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <SearchBox size="sm" className="hidden w-60 sm:block" />
          <Link
            href="/tim-kiem"
            aria-label="Tìm kiếm"
            className="rounded p-2 text-coffee/80 hover:bg-coffee/5 sm:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </Link>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full bg-chili px-4 py-2 text-sm font-semibold text-white transition hover:bg-chili/90"
          >
            YouTube
          </a>
        </div>
      </div>

      {/* Mobile: menu cuộn ngang */}
      <nav className="border-t border-coffee/10 md:hidden">
        <div className="flex items-center overflow-x-auto whitespace-nowrap px-2 text-sm font-semibold [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link href="/" className="px-3 py-2.5 text-coffee/80">Trang chủ</Link>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="px-3 py-2.5 text-coffee/80">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
