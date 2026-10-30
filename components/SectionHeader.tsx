import Link from "next/link";

/**
 * Tiêu đề khối kiểu Caption News: số thứ tự + nhãn nhỏ, tiêu đề đậm lớn, 1 từ khoá
 * đặt trong {ngoặc nhọn} được tô khối vàng. Nút "xem thêm" dạng mũi tên tròn.
 */
export default function SectionHeader({
  index,
  kicker,
  title,
  subtitle,
  href,
  linkLabel = "Xem thêm",
  dark = false,
}: {
  index?: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  dark?: boolean;
}) {
  const parts = title.split(/(\{[^}]+\})/).filter(Boolean);
  const isExternal = href?.startsWith("http");
  const linkCls = `group inline-flex flex-none items-center gap-2 text-sm font-extrabold ${
    dark ? "text-paper hover:text-honey" : "text-ink"
  }`;
  const linkInner = (
    <>
      <span className="hidden sm:inline">{linkLabel}</span>
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full transition duration-300 group-hover:translate-x-1 ${
          dark ? "bg-honey text-ink" : "bg-ink text-honey"
        }`}
      >
        →
      </span>
    </>
  );
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        {(index || kicker) && (
          <p className={`kicker ${dark ? "text-honey" : "text-chili"}`}>
            {index && <span className="mr-2">{index}</span>}
            {kicker}
          </p>
        )}
        <h2 className={`mt-2 text-fluid-xl font-black leading-[1.05] ${dark ? "text-paper" : "text-ink"}`}>
          {parts.map((p, i) =>
            p.startsWith("{") ? (
              <span key={i} className="hl">
                {p.slice(1, -1)}
              </span>
            ) : (
              <span key={i}>{p}</span>
            )
          )}
        </h2>
        {subtitle && <p className={`mt-2 text-fluid-sm ${dark ? "text-paper/65" : "text-coffee/65"}`}>{subtitle}</p>}
      </div>
      {href &&
        (isExternal ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={linkCls} aria-label={linkLabel}>
            {linkInner}
          </a>
        ) : (
          <Link href={href} className={linkCls} aria-label={linkLabel}>
            {linkInner}
          </Link>
        ))}
    </div>
  );
}
