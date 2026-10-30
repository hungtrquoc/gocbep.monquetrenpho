import type { Metadata } from "next";
import { getLatestVideos, CHANNEL_URL } from "@/lib/youtube";
import VideoCard from "@/components/VideoCard";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Video",
  description: "Video nấu ăn mới nhất từ kênh YouTube Góc Bếp — món quê dân dã, cập nhật mỗi ngày.",
  alternates: { canonical: "/videos" },
};

export default async function VideosPage() {
  const videos = await getLatestVideos();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 border-b-2 border-coffee pb-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-chili">YouTube</p>
        <h1 className="mt-1 text-fluid-xl font-black leading-[1.08] text-ink">Video của Góc Bếp</h1>
        <p className="mt-1 text-sm text-coffee/60">
          Danh sách được lấy tự động từ kênh YouTube Góc Bếp (cập nhật mỗi giờ).
        </p>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
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
