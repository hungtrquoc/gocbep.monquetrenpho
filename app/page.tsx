import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLatestVideos, CHANNEL_URL, type YoutubeVideo } from "@/lib/youtube";
import { CATEGORY_SLUGS, CATEGORIES, getPublishedRecipes } from "@/lib/recipes";
import { getAllProducts } from "@/lib/products";
import { filterAvailableRecipes } from "@/lib/youtube-availability";
import { largeThumb } from "@/lib/image";
import VideoCard from "@/components/VideoCard";
import RecipeCard from "@/components/RecipeCard";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import AdSlot from "@/components/AdSlot";
import Reveal from "@/components/Reveal";

export const revalidate = 1800;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Trang chủ thiết kế lại theo phong cách "Caption News" của phim ngắn Góc Bếp
// (bold minimalism + khối vàng từ khoá + hiện dần khi cuộn), 4 khối rõ ràng:
//   HERO (giới thiệu + công thức mới nhất dạng khung Shorts) -> 01 VIDEO -> 02 CÔNG THỨC (bento) -> 03 DỤNG CỤ
export default async function HomePage() {
  const publishedRecipes = await filterAvailableRecipes(getPublishedRecipes());
  let videos: YoutubeVideo[] = await getLatestVideos();
  // Không lấy được video từ YouTube (mạng/API) -> dùng video gắn với các công thức để trang không trống.
  if (videos.length === 0) {
    videos = publishedRecipes.slice(0, 8).map((r) => ({
      id: r.videoId,
      title: r.title,
      description: r.excerpt,
      url: `https://www.youtube.com/watch?v=${r.videoId}`,
      thumbnailUrl: `https://i.ytimg.com/vi/${r.videoId}/hqdefault.jpg`,
      publishedAt: "",
      channelTitle: "Góc Bếp",
    }));
  }
  const homeVideos = videos.slice(0, 8);
  const [heroRecipe, ...rest] = publishedRecipes;
  const bento = rest.slice(0, 5);
  const featuredProducts = getAllProducts().slice(0, 4);
  const usedCategories = CATEGORIES.filter((c) => publishedRecipes.some((r) => r.category === c));

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-honey/10 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 md:grid-cols-[1.25fr_1fr] md:pb-20 md:pt-16">
          <div>
            <Reveal>
              <p className="kicker text-honey">Kênh nấu ăn món cơm nhà · Góc Bếp</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-4 text-fluid-2xl font-black leading-[1.02]">
                Món quê <span className="hl">ngon</span>
                <br />
                nấu được mỗi ngày.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-lg text-fluid-sm text-paper/70">
                Video ngắn dễ theo, kèm công thức chi tiết từng bước: nguyên liệu dễ tìm, cách làm gọn, đúng vị cơm nhà.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-7 flex flex-wrap gap-3">
              <Link href="/cong-thuc" className="btn-honey">
                Xem công thức →
              </Link>
              <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                ▶ Đăng ký kênh
              </a>
            </Reveal>
            <Reveal delay={320}>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {[
                  [publishedRecipes.length, "công thức"],
                  [videos.length, "video mới"],
                  [usedCategories.length, "nhóm món"],
                ].map(([n, label]) => (
                  <div key={label as string}>
                    <dt className="sr-only">{label}</dt>
                    <dd className="text-3xl font-black tabular-nums text-honey sm:text-4xl">{n}</dd>
                    <dd className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-paper/55">{label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {heroRecipe && (
            <Reveal delay={200} className="mx-auto w-full max-w-[340px]">
              <Link
                href={`/cong-thuc/${heroRecipe.slug}`}
                className="card-lift group relative block aspect-[9/16] overflow-hidden rounded-[28px] border-[6px] border-white/10 bg-black"
              >
                <Image
                  src={largeThumb(heroRecipe.coverImage)}
                  alt={heroRecipe.title}
                  fill
                  unoptimized
                  priority
                  sizes="340px"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
                <span className="absolute left-4 top-5 inline-flex text-[11px] font-black">
                  <span className="bg-honey px-2 py-1 text-ink">GÓC BẾP</span>
                  <span className="bg-ink/70 px-2 py-1 text-paper">MÓN MỚI</span>
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[28px] font-black leading-[1.15] text-paper">
                    Công thức
                    <br />
                    <span className="hl">mới nhất</span>
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm font-bold text-paper/85">{heroRecipe.title}</p>
                  <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.16em] text-honey">Xem ngay →</p>
                </div>
              </Link>
            </Reveal>
          )}
        </div>

        {/* Dải chạy chữ kiểu bản tin */}
        {usedCategories.length > 0 && (
          <div className="border-y border-white/10 bg-black/40 py-3">
            <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-sm font-black uppercase tracking-[0.14em]">
              {[...usedCategories, ...usedCategories, ...usedCategories, ...usedCategories].map((c, i) => (
                <Link
                  key={i}
                  href={`/danh-muc/${CATEGORY_SLUGS[c]}`}
                  tabIndex={i < usedCategories.length ? 0 : -1}
                  aria-hidden={i >= usedCategories.length}
                  className="flex items-center gap-8 text-paper/70 hover:text-honey"
                >
                  {c} <span className="text-honey">●</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 01 VIDEO */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <SectionHeader index="01" kicker="Video" title="Vừa lên {bếp}" subtitle="Xem trên YouTube, cập nhật mỗi ngày" href="/videos" linkLabel="Tất cả video" />
        {homeVideos.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {homeVideos.map((v, i) => (
              <Reveal key={v.id} delay={(i % 4) * 70}>
                <VideoCard video={v} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-ink/25 p-8 text-center text-coffee/60">
            Chưa tải được video. Mời ghé{" "}
            <a href={CHANNEL_URL} className="font-bold text-chili underline" target="_blank" rel="noopener noreferrer">
              kênh YouTube Góc Bếp
            </a>
            .
          </p>
        )}
      </section>

      {/* 02 CÔNG THỨC - bento */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <SectionHeader index="02" kicker="Công thức" title="Làm theo là {được}" subtitle="Nguyên liệu, thời gian và từng bước rõ ràng" href="/cong-thuc" linkLabel="Tất cả công thức" />
        {usedCategories.length > 0 && (
          <div className="mb-6 flex gap-2 overflow-x-auto whitespace-nowrap pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {usedCategories.map((c) => (
              <Link
                key={c}
                href={`/danh-muc/${CATEGORY_SLUGS[c]}`}
                className="rounded-full border border-ink/15 bg-white px-4 py-1.5 text-sm font-bold text-ink transition hover:border-ink hover:bg-ink hover:text-honey active:scale-95"
              >
                {c}
              </Link>
            ))}
          </div>
        )}
        {bento.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal className="sm:col-span-2 lg:row-span-2">
              <RecipeCard recipe={bento[0]} large />
            </Reveal>
            {bento.slice(1).map((r, i) => (
              <Reveal key={r.slug} delay={(i + 1) * 80}>
                <RecipeCard recipe={r} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-ink/25 bg-white p-8 text-center text-coffee/60">
            Các bài công thức chi tiết đang được biên soạn, mời quay lại sau nhé!
          </p>
        )}
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <AdSlot slot="home-mid" />
      </div>

      {/* 03 DỤNG CỤ */}
      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-20">
          <SectionHeader index="03" kicker="Dụng cụ" title="Góc Bếp {hay dùng}" subtitle="Đồ dùng xuất hiện trong video" href="/san-pham" linkLabel="Xem tất cả" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featuredProducts.map((product, i) => (
              <Reveal key={product.slug} delay={i * 70}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Lời mời đăng ký */}
      <section className="mx-auto mt-20 max-w-6xl px-4">
        <Reveal className="flex flex-col items-start gap-6 rounded-2xl bg-honey p-8 text-ink sm:flex-row sm:items-center sm:p-10">
          <div className="flex-1">
            <p className="kicker">Mỗi ngày một món</p>
            <p className="mt-2 text-fluid-lg font-black leading-tight">Lưu Góc Bếp lại, tối nay khỏi nghĩ nấu gì.</p>
          </div>
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn bg-ink text-honey hover:-translate-y-0.5 hover:shadow-lift">
            ▶ Đăng ký kênh YouTube
          </a>
        </Reveal>
      </section>
    </div>
  );
}
