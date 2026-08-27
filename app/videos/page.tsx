import type { Metadata } from "next";
import { getLatestVideos, CHANNEL_URL } from "@/lib/youtube";
import VideoCard from "@/components/VideoCard";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Video",
  description: "Toàn bộ video mới nhất từ kênh YouTube Góc Bếp.",
};

export default async function VideosPage() {
  const videos = await getLatestVideos();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-coffee">Video của Góc Bếp</h1>
        <p className="mt-2 text-coffee/60">
          Danh sách được lấy tự động từ kênh YouTube Góc Bếp (cập nhật mỗi giờ).
        </p>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-turmeric/40 bg-white p-8 text-center text-coffee/60">
          Chưa tải được video từ YouTube. Vui lòng ghé thăm{" "}
          <a href={CHANNEL_URL} className="text-chili underline" target="_blank" rel="noopener noreferrer">
            kênh YouTube Góc Bếp
          </a>{" "}
          trực tiếp.
        </p>
      )}

      <div className="mt-10">
        <AdSlot slot="videos-list" />
      </div>
    </div>
  );
}
