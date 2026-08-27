import Image from "next/image";
import Link from "next/link";
import { getLatestVideos, CHANNEL_URL } from "@/lib/youtube";
import VideoCard from "@/components/VideoCard";

export default async function HomePage() {
  const videos = await getLatestVideos();
  const featured = videos.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-turmeric/15 via-cream to-cream">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center sm:py-20">
          <Image
            src="/logo.png"
            alt="Logo Góc Bếp"
            width={140}
            height={140}
            className="rounded-full shadow-lg ring-4 ring-white"
            priority
          />
          <h1 className="font-display text-3xl font-extrabold text-chili sm:text-5xl">
            Góc Bếp – Món quê trên phố
          </h1>
          <p className="max-w-2xl text-base text-coffee/80 sm:text-lg">
            Nơi lưu giữ những công thức món ăn dân dã, mộc mạc của quê nhà, được
            nấu lại giữa nhịp sống thành phố. Cùng Góc Bếp vào bếp mỗi ngày với
            những món ăn gần gũi, ấm áp như bữa cơm gia đình.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-chili px-6 py-3 font-semibold text-white shadow-md transition hover:bg-chili/90"
            >
              Xem kênh YouTube
            </a>
            <Link
              href="/videos"
              className="rounded-full border border-chili px-6 py-3 font-semibold text-chili transition hover:bg-chili/10"
            >
              Xem tất cả video
            </Link>
          </div>
        </div>
      </section>

      {/* Latest videos */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-coffee sm:text-3xl">
              Video mới nhất
            </h2>
            <p className="text-coffee/60">Cập nhật tự động từ kênh YouTube Góc Bếp</p>
          </div>
          <Link href="/videos" className="hidden text-sm font-semibold text-chili hover:underline sm:block">
            Xem tất cả →
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((video) => (
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

        <div className="mt-8 text-center sm:hidden">
          <Link href="/videos" className="font-semibold text-chili hover:underline">
            Xem tất cả video →
          </Link>
        </div>
      </section>

      {/* Intro strip */}
      <section className="border-t border-turmeric/20 bg-white/60">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 sm:grid-cols-3">
          <div className="text-center">
            <p className="text-4xl">🍚</p>
            <h3 className="mt-3 font-display font-semibold text-coffee">Món quê dân dã</h3>
            <p className="mt-1 text-sm text-coffee/70">
              Công thức đơn giản, nguyên liệu dễ tìm, đậm hương vị quê nhà.
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl">🎥</p>
            <h3 className="mt-3 font-display font-semibold text-coffee">Video mới đều đặn</h3>
            <p className="mt-1 text-sm text-coffee/70">
              Video mới nhất trên trang này luôn được cập nhật tự động từ YouTube.
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl">❤️</p>
            <h3 className="mt-3 font-display font-semibold text-coffee">Ấm áp như ở nhà</h3>
            <p className="mt-1 text-sm text-coffee/70">
              Mỗi món ăn là một câu chuyện, một ký ức, một góc bếp thân thương.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
