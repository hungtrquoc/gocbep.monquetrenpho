import { XMLParser } from "fast-xml-parser";

// ID kênh YouTube "Góc Bếp" — lấy từ URL kênh do người dùng cung cấp.
export const CHANNEL_ID = "UCv8-WFJj50Wy_50ddQS9Y9A";
export const CHANNEL_URL = `https://www.youtube.com/channel/${CHANNEL_ID}`;
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const API_BASE = "https://www.googleapis.com/youtube/v3";

export type YoutubeVideo = {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  publishedAt: string;
  channelTitle: string;
};

const REVALIDATE_SECONDS = 3600; // làm mới dữ liệu mỗi giờ

/**
 * Lấy danh sách video mới nhất của kênh.
 *
 * Cách chính: YouTube Data API v3 (cần biến môi trường YOUTUBE_API_KEY) —
 * ổn định, lấy được nhiều video hơn (tối đa 50) và đầy đủ thông tin hơn.
 *
 * Nếu chưa cấu hình YOUTUBE_API_KEY (hoặc gọi API bị lỗi), tự động chuyển
 * sang lấy từ RSS feed công khai của YouTube (không cần key, nhưng chỉ có
 * tối đa ~15 video gần nhất và có thể không ổn định trên 1 số hạ tầng
 * server) — đảm bảo trang không bị trắng hoàn toàn nếu chưa kịp cấu hình
 * API key.
 */
export async function getLatestVideos(): Promise<YoutubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (apiKey) {
    try {
      const videos = await getLatestVideosFromDataApi(apiKey);
      if (videos.length > 0) return videos;
    } catch (err) {
      console.error("Lỗi khi lấy video từ YouTube Data API, chuyển sang RSS:", err);
    }
  }

  return getLatestVideosFromRss();
}

async function getLatestVideosFromDataApi(apiKey: string): Promise<YoutubeVideo[]> {
  // Bước 1: lấy ID playlist "Uploads" của kênh (playlist ẩn chứa toàn bộ
  // video đã đăng, theo đúng thứ tự mới nhất trước).
  const channelRes = await fetch(
    `${API_BASE}/channels?part=contentDetails&id=${CHANNEL_ID}&key=${apiKey}`,
    { next: { revalidate: REVALIDATE_SECONDS } }
  );
  if (!channelRes.ok) {
    throw new Error(`channels.list thất bại: ${channelRes.status}`);
  }
  const channelData = await channelRes.json();
  const uploadsPlaylistId =
    channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) {
    throw new Error("Không tìm thấy uploads playlist cho kênh.");
  }

  // Bước 2: lấy danh sách video trong playlist Uploads (tối đa 50/lần).
  const itemsRes = await fetch(
    `${API_BASE}/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${uploadsPlaylistId}&key=${apiKey}`,
    { next: { revalidate: REVALIDATE_SECONDS } }
  );
  if (!itemsRes.ok) {
    throw new Error(`playlistItems.list thất bại: ${itemsRes.status}`);
  }
  const itemsData = await itemsRes.json();
  const items: any[] = itemsData?.items ?? [];

  return items
    .map((item): YoutubeVideo => {
      const snippet = item.snippet ?? {};
      const videoId: string = item.contentDetails?.videoId ?? snippet.resourceId?.videoId ?? "";
      const thumb =
        snippet.thumbnails?.maxres ??
        snippet.thumbnails?.high ??
        snippet.thumbnails?.medium ??
        snippet.thumbnails?.default;

      return {
        id: videoId,
        title: snippet.title ?? "",
        description: snippet.description ?? "",
        url: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnailUrl: thumb?.url ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        publishedAt: item.contentDetails?.videoPublishedAt ?? snippet.publishedAt ?? "",
        channelTitle: snippet.channelTitle ?? "Góc Bếp",
      };
    })
    // Video mới nhất trước, và loại bỏ các mục chưa có videoId hợp lệ
    // (ví dụ video riêng tư/đã xoá vẫn còn trong playlist).
    .filter((v) => v.id)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

const rssParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

function toArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

async function getLatestVideosFromRss(): Promise<YoutubeVideo[]> {
  try {
    const res = await fetch(FEED_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error("Không tải được RSS feed YouTube:", res.status);
      return [];
    }

    const xml = await res.text();
    const data = rssParser.parse(xml);
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

/** Tìm 1 video cụ thể theo videoId trong danh sách video mới nhất đã lấy được. */
export async function getVideoById(videoId: string): Promise<YoutubeVideo | undefined> {
  const videos = await getLatestVideos();
  return videos.find((v) => v.id === videoId);
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
