"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-1.5 btn border border-ink/20 text-ink hover:border-ink"
    >
      In công thức
    </button>
  );
}
