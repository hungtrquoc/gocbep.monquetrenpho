import Image from "next/image";
import Link from "next/link";
import { CHANNEL_URL } from "@/lib/youtube";
import SearchBox from "@/components/SearchBox";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/videos", label: "Video" },
  { href: "/cong-thuc", label: "Công thức" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
];

// Kiểu "báo/tạp chí": hàng trên là thương hiệu + tìm kiếm + nút YouTube,
// hàng dưới là menu chữ hoa nhỏ ngăn cách bằng đường kẻ mảnh.
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-coffee/15 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo Góc Bếp" width={44} height={44} className="rounded-full" priority />
          <div className="whitespace-nowrap leading-none">
            <p className="font-display text-2xl font-bold tracking-tight text-coffee">Góc Bếp</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-chili">
              Món quê trên phố
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <SearchBox size="sm" className="hidden w-64 md:block" />
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

      <nav className="border-t border-coffee/10">
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto whitespace-nowrap px-4 text-[13px] font-semibold uppercase tracking-wider [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2.5 text-coffee/75 transition hover:text-chili first:pl-0"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/tim-kiem" className="px-3 py-2.5 text-coffee/75 transition hover:text-chili md:hidden">
            Tìm kiếm
          </Link>
        </div>
      </nav>
    </header>
  );
}
