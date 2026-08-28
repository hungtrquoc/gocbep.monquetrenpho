/**
 * Kiểm tra xem 1 video YouTube có đang thực sự công khai (public) hay không.
 *
 * Bối cảnh: quy trình đăng bài cho phép "Đăng Website" một công thức TRƯỚC
 * khi video YouTube tương ứng thực sự lên public (video có thể đang ở chế độ
 * lên lịch/riêng tư). Nếu hiển thị công thức đó ngay, thumbnail sẽ hỏng và
 * link video không xem được. Module này cho phép các trang server-rendered
 * lọc bỏ những công thức như vậy, và tự "hồi phục" (hiện lại) khi video
 * chuyển sang public — không cần deploy lại — nhờ cơ chế revalidate (ISR)
 * ở từng trang gọi tới đây.
 */

/**
 * Dùng oEmbed endpoint chính thức của YouTube để kiểm tra video có public
 * hay không, KHÔNG cần API key.
 *
 * - 200: video công khai, xem được → true.
 * - 401/403/404: YouTube xác nhận video không công khai / không tồn tại → false.
 * - Bất kỳ lỗi nào khác (network error, timeout, 5xx...) → FAIL OPEN (true).
 *   Lý do: một trục trặc mạng tạm thời giữa Vercel và YouTube không được
 *   phép "đánh sập"/ẩn đi nội dung đang tốt, đang hiển thị bình thường trên
 *   toàn site. Chỉ ẩn công thức khi có tín hiệu CHẮC CHẮN là "không công
 *   khai", không ẩn vì lỗi mơ hồ.
 */
export async function isYoutubeVideoAvailable(videoId: string): Promise<boolean> {
  const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
    `https://www.youtube.com/watch?v=${videoId}`
  )}&format=json`;

  try {
    const res = await fetch(oembedUrl, { next: { revalidate: 1800 } });

    if (res.status === 200) return true;
    if (res.status === 401 || res.status === 403 || res.status === 404) return false;

    // Trạng thái không xác định (vd 5xx) — fail open, coi như vẫn khả dụng.
    return true;
  } catch {
    // Lỗi mạng/timeout — fail open, coi như vẫn khả dụng.
    return true;
  }
}

/**
 * Lọc 1 danh sách công thức (hoặc bất kỳ object nào có `videoId`), chỉ giữ
 * lại những cái có video đang công khai. Chạy song song, giữ nguyên thứ tự
 * ban đầu.
 */
export async function filterAvailableRecipes<T extends { videoId: string }>(
  recipes: T[]
): Promise<T[]> {
  const results = await Promise.allSettled(
    recipes.map((r) => isYoutubeVideoAvailable(r.videoId))
  );

  return recipes.filter((_, i) => {
    const result = results[i];
    // Nếu Promise.allSettled tự nó reject (không nên xảy ra vì
    // isYoutubeVideoAvailable luôn catch lỗi), fail open luôn cho chắc.
    return result.status === "fulfilled" ? result.value : true;
  });
}
