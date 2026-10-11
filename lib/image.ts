/**
 * Ảnh thumbnail YouTube cho THẺ (card): đổi sang bản WebP 320x180 do chính YouTube phục vụ
 * (i.ytimg.com/vi_webp/<id>/mqdefault.webp) - định dạng thế hệ mới, rất nhẹ (~8-12KB), tải từ CDN
 * của Google nên KHÔNG tốn quota tối ưu ảnh của Vercel (kết hợp prop `unoptimized` của next/image).
 * Thẻ chỉ hiển thị ~170-270px nên 320px là đủ nét (PageSpeed: "Improve image delivery").
 * URL không phải ytimg thì giữ nguyên.
 */
export function cardThumb(url: string): string {
  const m = url.match(/^https:\/\/i\.ytimg\.com\/vi(?:_webp)?\/([\w-]+)\//);
  return m ? `https://i.ytimg.com/vi_webp/${m[1]}/mqdefault.webp` : url;
}
