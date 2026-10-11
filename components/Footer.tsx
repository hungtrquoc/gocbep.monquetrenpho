import Image from "next/image";
import Link from "next/link";
import { CHANNEL_URL } from "@/lib/youtube";

export default function Footer() {
  const year = new Date().getFullYear();
  const link = "text-cream/70 transition hover:text-white";
  return (
    <footer className="mt-16 bg-coffee text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo Góc Bếp" width={40} height={40} className="rounded-full" />
            <div className="leading-none">
              <p className="font-display text-xl font-bold">Góc Bếp</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-turmeric">
                Món quê trên phố
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-cream/65">
            Video nấu ăn món quê dân dã mỗi ngày, kèm công thức chi tiết từng bước.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-turmeric">Khám phá</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/videos" className={link}>Video</Link></li>
            <li><Link href="/cong-thuc" className={link}>Công thức</Link></li>
            <li><Link href="/san-pham" className={link}>Sản phẩm</Link></li>
            <li><Link href="/tim-kiem" className={link}>Tìm kiếm</Link></li>
            <li>
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className={link}>
                Kênh YouTube
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-turmeric">Về Góc Bếp</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/gioi-thieu" className={link}>Giới thiệu</Link></li>
            <li><Link href="/privacy" className={link}>Chính sách quyền riêng tư</Link></li>
            <li><Link href="/dieu-khoan" className={link}>Điều khoản sử dụng</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-cream/50 sm:flex-row sm:justify-between">
          <p>© {year} Góc Bếp. Mọi video thuộc bản quyền của kênh YouTube Góc Bếp.</p>
          <p>Một số liên kết sản phẩm là liên kết affiliate.</p>
        </div>
      </div>
    </footer>
  );
}
