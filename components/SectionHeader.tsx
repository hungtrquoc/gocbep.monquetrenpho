import Link from "next/link";

/** Tiêu đề khối kiểu tạp chí: nhãn đỏ nhỏ + tiêu đề serif + đường kẻ đậm bên dưới. */
export default function SectionHeader({
  kicker,
  title,
  subtitle,
  href,
  linkLabel = "Xem tất cả",
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-coffee pb-3">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-chili">{kicker}</p>
        <h2 className="mt-1 font-display text-2xl font-bold text-coffee sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-coffee/60">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className="whitespace-nowrap text-sm font-semibold text-chili hover:underline">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
