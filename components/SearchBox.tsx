/**
 * Ô tìm kiếm - form GET thuần HTML (không cần JavaScript): gửi sang /tim-kiem?q=...
 */
export default function SearchBox({
  defaultValue = "",
  className = "",
  size = "md",
  autoFocus = false,
}: {
  defaultValue?: string;
  className?: string;
  size?: "sm" | "md";
  autoFocus?: boolean;
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
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-coffee/40 ${
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
        className={`w-full rounded-full border border-turmeric/30 bg-white ${pad} text-coffee placeholder:text-coffee/40 focus:border-chili focus:outline-none`}
      />
    </form>
  );
}
