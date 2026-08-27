import { XMLParser } from "fast-xml-parser";

// ID kênh YouTube "Góc Bếp" — lấy từ URL kênh do người dùng cung cấp.
export const CHANNEL_ID = "UCv8-WFJj50Wy_50ddQS9Y9A";
export const CHANNEL_URL = `https://www.youtube.com/channel/${CHANNEL_ID}`;
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export type YoutubeVideo = {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  publishedAt: string;
  channelTitle: string;
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

function toArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Lấy danh sách video mới nhất từ RSS feed công khai của kênh YouTube.
 * Không cần API key — nhưng feed công khai của YouTube chỉ trả về tối đa
 * 15 video gần nhất, đã đủ cho mục "video mới nhất" trên trang chủ/trang video.
 */
export async function getLatestVideos(): Promise<YoutubeVideo[]> {
  try {
    const res = await fetch(FEED_URL, {
      // Một số máy chủ/YouTube có thể chặn request không có User-Agent hợp lệ.
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      // Làm mới dữ liệu mỗi giờ để trang luôn có video mới mà không phải
      // gọi lại RSS liên tục trên mỗi lượt truy cập.
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Không tải được RSS feed YouTube:", res.status);
      return [];
    }

    const xml = await res.text();
    const data = parser.parse(xml);
    const entries = toArray(data?.feed?.entry);

    return entries.map((entry: any): YoutubeVideo => {
      const videoId: string = entry["yt:videoId"] ?? "";
      const mediaGroup = entry["media:group"] ?? {};
      const thumbnail = mediaGroup["media:thumbnail"];
      const description: string = mediaGroup["media:description"] ?? "";

      return {
        id: videoId,
        title: entry.title ?? "",
        description,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnailUrl:
          thumbnail?.["@_url"] ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        publishedAt: entry.published ?? "",
        channelTitle: entry.author?.name ?? "Góc Bếp",
      };
    });
  } catch (err) {
    console.error("Lỗi khi lấy video từ YouTube RSS:", err);
    return [];
  }
}

export function formatVideoDate(iso: string): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}
