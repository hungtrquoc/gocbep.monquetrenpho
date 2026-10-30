import Link from "next/link";
import { CHANNEL_URL } from "@/lib/youtube";
import SearchBox from "@/components/SearchBox";

const NAV_LINKS = [
  { href: "/videos", label: "Video" },
  { href: "/cong-thuc", label: "Công thức" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
];

/** Nhãn kênh giống góc trên phim: khối vàng "GÓC BẾP" + dải đen "MÓN QUÊ TRÊN PHỐ". */
export function Bug({ small = false }: { small?: boolean }) {
  return (
    <span className="inline-flex items-stretch font-black leading-none">
      <span className={`bg-honey text-ink ${small ? "px-2 py-1.5 text-sm" : "px-3 py-2 text-lg"}`}>GÓC BẾP</span>
      <span
        className={`bg-white/10 text-paper ${small ? "flex px-2 py-1.5 text-[10px]" : "hidden px-3 py-2 text-[11px] min-[420px]:flex"} items-center font-extrabold tracking-[0.18em]`}
      >
        MÓN QUÊ TRÊN PHỐ
      </span>
    </span>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 text-paper backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-5 px-4 py-3">
        <Link href="/" aria-label="Góc Bếp - trang chủ" className="flex-none transition active:scale-95">
          <Bug />
        </Link>

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative px-3 py-2 text-sm font-bold text-paper/80 transition hover:text-white"
            >
              {link.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-honey transition duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <SearchBox size="sm" tone="dark" className="hidden w-60 sm:block" />
          <Link href="/tim-kiem" aria-label="Tìm kiếm" className="rounded-full p-2 text-paper/80 hover:bg-white/10 sm:hidden">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </Link>
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-chili !px-4 !py-2" aria-label="Kênh YouTube Góc Bếp">
            <span aria-hidden>▶</span>
            <span className="hidden min-[400px]:inline">YouTube</span>
          </a>
        </div>
      </div>

      <nav className="border-t border-white/10 md:hidden">
        <div className="flex items-center overflow-x-auto whitespace-nowrap px-2 text-sm font-bold [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link href="/" className="px-3 py-2.5 text-paper/80">Trang chủ</Link>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="px-3 py-2.5 text-paper/80">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
