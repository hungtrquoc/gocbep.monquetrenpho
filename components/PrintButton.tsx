"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-1.5 rounded-full border border-coffee/20 px-4 py-2 text-sm font-medium text-coffee/80 transition hover:bg-coffee/5"
    >
      🖨️ In công thức
    </button>
  );
}
