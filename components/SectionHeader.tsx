import Link from "next/link";

/** Tiêu đề khối: thanh đỏ + tiêu đề serif, nút "Xem thêm" đặc bên phải (học theo Just One Cookbook). */
export default function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel = "Xem thêm",
}: {
  kicker?: string; // giữ để tương thích, không còn hiển thị
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="border-l-4 border-chili pl-3">
        <h2 className="font-display text-2xl font-bold leading-tight text-coffee sm:text-[28px]">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-coffee/60">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="whitespace-nowrap rounded bg-coffee px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-chili"
        >
          {linkLabel} ›
        </Link>
      )}
    </div>
  );
}
