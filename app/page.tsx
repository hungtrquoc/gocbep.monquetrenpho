import type { Metadata } from "next";
import Link from "next/link";
import { getLatestVideos, CHANNEL_URL } from "@/lib/youtube";
import { CATEGORIES, CATEGORY_SLUGS, getPublishedRecipes } from "@/lib/recipes";
import { getAllProducts } from "@/lib/products";
import { filterAvailableRecipes } from "@/lib/youtube-availability";
import VideoCard from "@/components/VideoCard";
import RecipeCard from "@/components/RecipeCard";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import SearchBox from "@/components/SearchBox";
import AdSlot from "@/components/AdSlot";

export const revalidate = 1800;

// Canonical đặt RIÊNG từng trang (không đặt ở layout vì sẽ bị mọi trang con kế thừa).
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const videos = await getLatestVideos();
  const featuredVideos = videos.slice(0, 6);
  const publishedRecipes = await filterAvailableRecipes(getPublishedRecipes());
  const featuredRecipes = publishedRecipes.slice(0, 6);
  const featuredProducts = getAllProducts().slice(0, 3);
  const usedCategories = CATEGORIES.filter((c) =>
    publishedRecipes.some((r) => r.category === c)
  );

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* h1 cho SEO (ẩn khỏi mắt người xem vì header đã có thương hiệu) */}
      <h1 className="sr-only">Góc Bếp – Món quê trên phố: video nấu ăn và công thức món quê dân dã</h1>

      {/* Thanh tìm nhanh + danh mục: thứ người xem cần ngay khi vào trang */}
      <section className="flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between">
        <SearchBox className="w-full md:max-w-md" />
        {usedCategories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {usedCategories.map((category) => (
              <Link
                key={category}
                href={`/danh-muc/${CATEGORY_SLUGS[category]}`}
                className="rounded-full border border-coffee/20 px-3.5 py-1.5 text-sm font-medium text-coffee/75 transition hover:border-chili hover:text-chili"
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 1. Video mới nhất (YouTube): video đầu to, 2 video kế bên phải, rồi lưới */}
      <section className="pb-12 pt-2">
        <SectionHeader
          kicker="YouTube"
          title="Video mới nhất"
          subtitle="Cập nhật tự động từ kênh Góc Bếp"
          href="/videos"
        />

        {featuredVideos.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVideos.map((video, i) => (
              <div key={video.id} className={i === 0 ? "sm:col-span-2 lg:row-span-2" : ""}>
                <VideoCard video={video} featured={i === 0} priority={i === 0} />
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-coffee/25 bg-white p-8 text-center text-coffee/60">
            Chưa tải được video từ YouTube. Vui lòng ghé thăm{" "}
            <a href={CHANNEL_URL} className="text-chili underline" target="_blank" rel="noopener noreferrer">
              kênh YouTube Góc Bếp
            </a>{" "}
            trực tiếp.
          </p>
        )}

        <div className="mt-8 text-center">
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-chili px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-chili/90"
          >
            Đăng ký kênh YouTube Góc Bếp
          </a>
        </div>
      </section>

      {/* 2. Công thức */}
      <section className="pb-12">
        <SectionHeader
          kicker="Vào bếp"
          title="Công thức nổi bật"
          subtitle="Hướng dẫn chi tiết từng bước, dễ làm tại nhà"
          href="/cong-thuc"
        />
        {featuredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-coffee/25 bg-white p-8 text-center text-coffee/60">
            Các bài công thức chi tiết đang được biên soạn, mời anh quay lại sau nhé!
          </p>
        )}
      </section>

      <AdSlot slot="home-mid" />

      {/* 3. Sản phẩm gợi ý */}
      <section className="pb-4">
        <SectionHeader
          kicker="Gợi ý"
          title="Sản phẩm Góc Bếp dùng"
          subtitle="Dụng cụ, nguyên liệu thường dùng trong video"
          href="/san-pham"
        />
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-coffee/25 bg-white p-8 text-center text-coffee/60">
            Đang cập nhật danh sách sản phẩm gợi ý, mời quay lại sau!
          </p>
        )}
      </section>
    </div>
  );
}
