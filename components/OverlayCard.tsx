import Image from "next/image";
import Link from "next/link";

/**
 * Thẻ "ảnh phủ chữ" (học theo ô mosaic của RecipeTin Eats): ảnh full khung, tiêu đề
 * trắng trên nền gradient tối ở đáy. Khung hình lấp đầy ô cha (h-full) nên dùng được
 * cho lưới mosaic 1 ô lớn + 4 ô nhỏ. Link ngoài (YouTube) hoặc nội bộ tuỳ href.
 */
export default function OverlayCard({
  href,
  external = false,
  image,
  title,
  badge,
  large = false,
  priority = false,
  className = "",
}: {
  href: string;
  external?: boolean;
  image: string;
  title: string;
  badge?: string;
  large?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <Image
        src={image}
        alt={title}
        fill
        priority={priority}
        sizes={large ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      {badge && (
        <span className="absolute left-3 top-3 rounded bg-chili px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
          {badge}
        </span>
      )}
      <h3
        className={`absolute inset-x-0 bottom-0 line-clamp-3 p-3 font-display font-semibold leading-snug text-white sm:p-4 ${
          large ? "text-xl sm:text-2xl lg:text-3xl" : "text-sm sm:text-base"
        }`}
      >
        {title}
      </h3>
    </>
  );

  const cls = `group relative block overflow-hidden rounded-lg bg-coffee/10 ${className}`;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
