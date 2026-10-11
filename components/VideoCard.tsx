import Image from "next/image";
import type { YoutubeVideo } from "@/lib/youtube";
import { formatVideoDate } from "@/lib/youtube";

// Thẻ VIDEO: ảnh 16:9 luôn có nút phát tròn ở giữa + nhãn YouTube -> nhìn là biết "bấm để xem video".
export default function VideoCard({
  video,
  priority = false,
}: {
  video: YoutubeVideo;
  featured?: boolean; // giữ để tương thích, không còn dùng
  priority?: boolean;
}) {
  return (
    <a href={video.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-coffee/10">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 pl-0.5 text-lg text-white ring-2 ring-white/80 transition group-hover:scale-110 group-hover:bg-chili">
            ▶
          </span>
        </span>
        <span className="absolute bottom-2 left-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          YouTube
        </span>
      </div>
      <div className="mt-2.5 flex flex-1 flex-col">
        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-coffee transition group-hover:text-chili">
          {video.title}
        </h3>
        {video.publishedAt && (
          <p className="mt-1 text-xs text-coffee/50">{formatVideoDate(video.publishedAt)}</p>
        )}
      </div>
    </a>
  );
}
