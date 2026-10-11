import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLatestVideos, CHANNEL_URL } from "@/lib/youtube";
import { CATEGORY_SLUGS, CATEGORIES, getPublishedRecipes } from "@/lib/recipes";
import { getAllProducts } from "@/lib/products";
import { filterAvailableRecipes } from "@/lib/youtube-availability";
import VideoCard from "@/components/VideoCard";
import RecipeCard from "@/components/RecipeCard";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import OverlayCard from "@/components/OverlayCard";
import AdSlot from "@/components/AdSlot";

export const revalidate = 1800;

// Canonical đặt RIÊNG từng trang (không đặt ở layout vì sẽ bị mọi trang con kế thừa).
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const videos = await getLatestVideos();
  const mosaic = videos.slice(0, 5);
  const moreVideos = videos.slice(5, 9);
  const publishedRecipes = await filterAvailableRecipes(getPublishedRecipes());
  const latestRecipes = publishedRecipes.slice(0, 8);
  const featuredProducts = getAllProducts().slice(0, 4);

  // Ô danh mục có ảnh (học theo dải "Weeknight meals / Desserts..." của Just One Cookbook):
  // ảnh lấy từ công thức đầu tiên của từng danh mục.
  const categoryTiles = CATEGORIES.map((c) => ({
    name: c,
    recipe: publishedRecipes.find((r) => r.category === c),
  })).filter((t) => t.recipe);

  return (
    <div>
      <h1 className="sr-only">Góc Bếp – Món quê trên phố: video nấu ăn và công thức món quê dân dã</h1>

      {/* 1. Mosaic video mới nhất: 1 ô lớn + 4 ô nhỏ, tiêu đề phủ trên ảnh */}
      <section className="mx-auto max-w-6xl px-4 pt-5">
        {mosaic.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 lg:h-[460px] lg:grid-cols-4 lg:grid-rows-2">
            {mosaic.map((v, i) => (
              <OverlayCard
                key={v.id}
                href={v.url}
                external
                image={v.thumbnailUrl}
                title={v.title}
                badge={i === 0 ? "Mới nhất" : undefined}
                large={i === 0}
                priority={i === 0}
                className={
                  i === 0
                    ? "col-span-2 aspect-video lg:row-span-2 lg:aspect-auto"
                    : "aspect-video lg:aspect-auto"
                }
              />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-coffee/25 p-8 text-center text-coffee/60">
            Chưa tải được video từ YouTube. Vui lòng ghé thăm{" "}
            <a href={CHANNEL_URL} className="text-chili underline" target="_blank" rel="noopener noreferrer">
              kênh YouTube Góc Bếp
            </a>{" "}
            trực tiếp.
          </p>
        )}
      </section>

      {/* 2. Ô danh mục có ảnh */}
      {categoryTiles.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-10">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {categoryTiles.map(({ name, recipe }) => (
              <Link key={name} href={`/danh-muc/${CATEGORY_SLUGS[name]}`} className="group text-center">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-coffee/10">
                  <Image
                    src={recipe!.coverImage}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 33vw, 16vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 text-sm font-semibold text-coffee transition group-hover:text-chili">{name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 3. Video khác */}
      {moreVideos.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-12">
          <SectionHeader title="Video mới đăng" subtitle="Cập nhật tự động từ kênh YouTube" href="/videos" linkLabel="Tất cả video" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4">
            {moreVideos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Dải giới thiệu kênh (học theo khối "Konnichiwa, I'm Nami" của Just One Cookbook) */}
      <section className="mt-14 bg-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 text-center sm:flex-row sm:text-left">
          <Image src="/logo.png" alt="Logo Góc Bếp" width={120} height={120} className="rounded-full shadow" />
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold text-coffee">Chào anh/chị, đây là Góc Bếp</h2>
            <p className="mt-2 max-w-2xl text-coffee/75">
              Góc Bếp chia sẻ video nấu ăn món quê dân dã mỗi ngày, kèm công thức chi tiết từng bước để
              anh/chị làm theo dễ dàng tại nhà.
            </p>
          </div>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full bg-chili px-6 py-3 text-sm font-bold text-white transition hover:bg-chili/90"
          >
            Đăng ký kênh YouTube
          </a>
        </div>
      </section>

      {/* 5. Công thức mới */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <SectionHeader title="Công thức mới" subtitle="Hướng dẫn chi tiết từng bước, dễ làm tại nhà" href="/cong-thuc" linkLabel="Tất cả công thức" />
        {latestRecipes.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {latestRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-coffee/25 p-8 text-center text-coffee/60">
            Các bài công thức chi tiết đang được biên soạn, mời anh quay lại sau nhé!
          </p>
        )}
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <AdSlot slot="home-mid" />
      </div>

      {/* 6. Sản phẩm gợi ý */}
      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-12">
          <SectionHeader title="Sản phẩm Góc Bếp dùng" subtitle="Dụng cụ, nguyên liệu thường dùng trong video" href="/san-pham" linkLabel="Xem tất cả" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
