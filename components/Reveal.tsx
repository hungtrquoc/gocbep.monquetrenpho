"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";

/**
 * Hiện dần phần tử khi cuộn tới (scroll reveal, kiểu AOS) chỉ bằng IntersectionObserver +
 * CSS (globals.css [data-reveal]) - không thêm thư viện, không làm chậm trang. Nội dung vẫn
 * có sẵn trong HTML cho Google/không JS; người bật "giảm chuyển động" thấy ngay, không hiệu ứng.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.reveal = "shown";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.reveal = "shown";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} data-reveal="" className={className} style={{ ["--d" as string]: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
