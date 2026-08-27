import Image from "next/image";
import type { YoutubeVideo } from "@/lib/youtube";
import { formatVideoDate } from "@/lib/youtube";

export default function VideoCard({ video }: { video: YoutubeVideo }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-turmeric/20 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-turmeric/10">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-chili/90 text-white opacity-0 shadow-lg transition group-hover:opacity-100">
            ▶
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-display text-base font-semibold text-coffee">
          {video.title}
        </h3>
        {video.publishedAt && (
          <p className="text-xs text-coffee/60">{formatVideoDate(video.publishedAt)}</p>
        )}
      </div>
    </a>
  );
}
