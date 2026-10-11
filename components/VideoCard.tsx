import Image from "next/image";
import type { YoutubeVideo } from "@/lib/youtube";
import { formatVideoDate } from "@/lib/youtube";

// Thẻ phẳng kiểu tạp chí: ảnh lớn, không viền/đổ bóng, tiêu đề serif.
// featured=true: dùng cho video nổi bật đầu trang (tiêu đề to hơn, có nhãn "Mới nhất").
export default function VideoCard({
  video,
  featured = false,
  priority = false,
}: {
  video: YoutubeVideo;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-coffee/10">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          priority={priority}
          sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {featured && (
          <span className="absolute left-3 top-3 rounded bg-chili px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            Mới nhất
          </span>
        )}
        <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm text-chili opacity-0 shadow transition group-hover:opacity-100">
          ▶
        </span>
      </div>
      <div className="mt-3 flex flex-1 flex-col">
        {video.publishedAt && (
          <p className="text-[11px] font-semibold uppercase tracking-wider text-coffee/45">
            {formatVideoDate(video.publishedAt)}
          </p>
        )}
        <h3
          className={`mt-1 line-clamp-2 font-display font-semibold leading-snug text-coffee transition group-hover:text-chili ${
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {video.title}
        </h3>
      </div>
    </a>
  );
}
