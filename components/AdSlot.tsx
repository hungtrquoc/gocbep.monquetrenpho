"use client";

import { useEffect, useRef } from "react";

/**
 * 1 vị trí đặt quảng cáo Google AdSense.
 *
 * Chỉ thực sự hiển thị quảng cáo khi đã cấu hình biến môi trường
 * NEXT_PUBLIC_ADSENSE_CLIENT (dạng "ca-pub-XXXXXXXXXXXXXXXX") trên Vercel —
 * nếu chưa có, component này không render gì cả (không lỗi, không có ô
 * trống xấu xí). Xem README.md mục "Bật quảng cáo (AdSense)" để biết cách
 * lấy mã publisher và cấu hình.
 */
export default function AdSlot({ slot }: { slot: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || pushed.current) return;
    try {
      // @ts-expect-error - adsbygoogle được script của Google gắn vào window
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (err) {
      console.error("Lỗi khi khởi tạo quảng cáo AdSense:", err);
    }
  }, [client]);

  if (!client) return null;

  return (
    <div className="flex justify-center overflow-hidden" data-ad-slot-name={slot}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={client}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
