/**
 * Ô tìm kiếm - form GET thuần HTML (không cần JavaScript): gửi sang /tim-kiem?q=...
 */
export default function SearchBox({
  defaultValue = "",
  className = "",
  size = "md",
  autoFocus = false,
  tone = "light",
}: {
  defaultValue?: string;
  className?: string;
  size?: "sm" | "md";
  autoFocus?: boolean;
  tone?: "light" | "dark";
}) {
  const pad = size === "sm" ? "py-1.5 pl-9 pr-3 text-sm" : "py-3 pl-11 pr-4 text-base";
  return (
    <form action="/tim-kiem" method="get" role="search" className={`relative ${className}`}>
      <label htmlFor={`q-${size}`} className="sr-only">
        Tìm kiếm công thức, video, sản phẩm
      </label>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${tone === "dark" ? "text-paper/50" : "text-coffee/40"} ${
          size === "sm" ? "left-3 h-4 w-4" : "left-4 h-5 w-5"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        id={`q-${size}`}
        type="search"
        name="q"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        placeholder="Tìm món ăn, nguyên liệu, video..."
        autoComplete="off"
        className={`w-full rounded-full border ${pad} focus:outline-none ${
          tone === "dark"
            ? "border-white/15 bg-white/10 text-paper placeholder:text-paper/45 focus:border-honey"
            : "border-coffee/15 bg-white text-coffee placeholder:text-coffee/40 focus:border-ink"
        }`}
      />
    </form>
  );
}
