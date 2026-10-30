"use client";

import { useEffect, useState } from "react";

/** Thanh tiến độ đọc công thức (vàng, mép trên màn hình) - chỉ transform, không gây giật trang. */
export default function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div aria-hidden className="no-print fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
      <div className="h-full origin-left bg-honey" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
