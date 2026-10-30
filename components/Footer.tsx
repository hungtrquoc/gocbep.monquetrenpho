import Link from "next/link";
import { CHANNEL_URL } from "@/lib/youtube";
import { Bug } from "@/components/Header";

export default function Footer() {
  const year = new Date().getFullYear();
  const link = "text-paper/70 transition hover:text-honey";
  return (
    <footer className="mt-20 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 pt-14">
        <p className="max-w-3xl text-fluid-xl font-black leading-[1.1]">
          Món quê dân dã, <span className="hl">dễ nấu</span> mỗi ngày.
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Bug small />
          <p className="mt-4 max-w-xs text-sm text-paper/65">
            Video nấu ăn món cơm nhà mỗi ngày, kèm công thức chi tiết từng bước.
          </p>
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-honey mt-5">
            Đăng ký kênh YouTube
          </a>
        </div>
        <div>
          <p className="kicker text-honey">Khám phá</p>
          <ul className="mt-3 space-y-2 text-sm font-bold">
            <li><Link href="/videos" className={link}>Video</Link></li>
            <li><Link href="/cong-thuc" className={link}>Công thức</Link></li>
            <li><Link href="/san-pham" className={link}>Sản phẩm</Link></li>
            <li><Link href="/tim-kiem" className={link}>Tìm kiếm</Link></li>
          </ul>
        </div>
        <div>
          <p className="kicker text-honey">Về Góc Bếp</p>
          <ul className="mt-3 space-y-2 text-sm font-bold">
            <li><Link href="/gioi-thieu" className={link}>Giới thiệu</Link></li>
            <li><Link href="/privacy" className={link}>Chính sách quyền riêng tư</Link></li>
            <li><Link href="/dieu-khoan" className={link}>Điều khoản sử dụng</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-paper/45 sm:flex-row sm:justify-between">
          <p>© {year} Góc Bếp. Mọi video thuộc bản quyền của kênh YouTube Góc Bếp.</p>
          <p>Một số liên kết sản phẩm là liên kết affiliate.</p>
        </div>
      </div>
    </footer>
  );
}
