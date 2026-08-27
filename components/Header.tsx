import Image from "next/image";
import Link from "next/link";
import { CHANNEL_URL } from "@/lib/youtube";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/videos", label: "Video" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-turmeric/20 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo Góc Bếp"
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <div className="leading-tight">
            <p className="font-display text-lg font-bold text-chili">Góc Bếp</p>
            <p className="text-xs text-coffee/70">Món quê trên phố</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium sm:gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-coffee/80 transition hover:bg-turmeric/15 hover:text-chili"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 rounded-full bg-chili px-4 py-2 text-white shadow-sm transition hover:bg-chili/90"
          >
            Kênh YouTube
          </a>
        </nav>
      </div>
    </header>
  );
}
