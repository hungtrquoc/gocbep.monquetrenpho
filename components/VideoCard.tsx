import Image from "next/image";
import type { YoutubeVideo } from "@/lib/youtube";
import { formatVideoDate } from "@/lib/youtube";
import { cardThumb } from "@/lib/image";

// Thẻ VIDEO: ảnh 16:9, nút phát vàng nảy lên khi rê chuột, nhãn YouTube góc ảnh.
export default function VideoCard({
  video,
  priority = false,
  dark = false,
}: {
  video: YoutubeVideo;
  featured?: boolean; // giữ để tương thích
  priority?: boolean;
  dark?: boolean;
}) {
  return (
    <a href={video.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col">
      <div className="card-lift relative aspect-video w-full overflow-hidden rounded-xl bg-ink/20">
        <Image
          src={cardThumb(video.thumbnailUrl)}
          alt={video.title}
          fill
          unoptimized
          priority={priority}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 scale-90 items-center justify-center rounded-full bg-honey pl-0.5 text-lg text-ink shadow-lift transition duration-300 group-hover:scale-110">
            ▶
          </span>
        </span>
        <span className="absolute left-2 top-2 bg-ink px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-honey">
          YouTube
        </span>
      </div>
      <div className="mt-3 flex flex-1 flex-col">
        <h3
          className={`line-clamp-2 text-[15px] font-extrabold leading-snug transition ${
            dark ? "text-paper group-hover:text-honey" : "text-ink group-hover:text-chili"
          }`}
        >
          {video.title}
        </h3>
        {video.publishedAt && (
          <p className={`mt-1 text-xs ${dark ? "text-paper/50" : "text-coffee/50"}`}>{formatVideoDate(video.publishedAt)}</p>
        )}
      </div>
    </a>
  );
}
