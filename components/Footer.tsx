import Link from "next/link";
import { CHANNEL_URL } from "@/lib/youtube";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-turmeric/20 bg-white/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-coffee/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display font-semibold text-coffee">Góc Bếp – Món quê trên phố</p>
          <p>© {year} Góc Bếp. Mọi video thuộc bản quyền của kênh YouTube Góc Bếp.</p>
          <p className="mt-1 text-xs text-coffee/45">
            Một số liên kết sản phẩm là liên kết affiliate.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/gioi-thieu" className="hover:text-chili">
            Giới thiệu
          </Link>
          <Link href="/videos" className="hover:text-chili">
            Video
          </Link>
          <Link href="/cong-thuc" className="hover:text-chili">
            Công thức
          </Link>
          <Link href="/san-pham" className="hover:text-chili">
            Sản phẩm
          </Link>
          <Link href="/privacy" className="hover:text-chili">
            Chính sách quyền riêng tư
          </Link>
          <Link href="/dieu-khoan" className="hover:text-chili">
            Điều khoản sử dụng
          </Link>
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-chili">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
