import Image from "next/image";
import Link from "next/link";
import { getLatestVideos, CHANNEL_URL } from "@/lib/youtube";
import { CATEGORIES, CATEGORY_SLUGS, getPublishedRecipes } from "@/lib/recipes";
import { getAllProducts } from "@/lib/products";
import { filterAvailableRecipes } from "@/lib/youtube-availability";
import VideoCard from "@/components/VideoCard";
import RecipeCard from "@/components/RecipeCard";
import ProductCard from "@/components/ProductCard";
import AdSlot from "@/components/AdSlot";

export const revalidate = 1800;

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
    <div>
      {/* Giới thiệu gọn: 1 dải mỏng, để nội dung (video) hiện ngay màn hình đầu */}
      {/* Mobile: ẩn khỏi màn hình (vẫn giữ h1 cho SEO/đọc màn hình) vì header đã có
          logo + nút Kênh YouTube, tránh lặp lại và chiếm chỗ của video. */}
      <section className="sr-only border-b border-turmeric/20 bg-turmeric/10 sm:not-sr-only">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo Góc Bếp"
              width={44}
              height={44}
              className="rounded-full ring-2 ring-white"
              priority
            />
            <div>
              <h1 className="font-display text-lg font-extrabold leading-tight text-chili sm:text-xl">
                Góc Bếp – Món quê trên phố
              </h1>
              <p className="text-sm text-coffee/70">
                Video nấu ăn mới mỗi ngày, kèm công thức chi tiết.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-chili px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-chili/90"
            >
              Đăng ký kênh YouTube
            </a>
            <Link
              href="/cong-thuc"
              className="rounded-full border border-chili px-4 py-2 text-sm font-semibold text-chili transition hover:bg-chili/10"
            >
              Công thức
            </Link>
          </div>
        </div>
      </section>

      {/* 1. Video mới nhất (YouTube) - nội dung cập nhật nhiều nhất nên đứng đầu */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6 flex items-end justify-between">
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

        {featuredVideos.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVideos.map((video) => (
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

        <div className="mt-6 text-center sm:hidden">
          <Link href="/videos" className="font-semibold text-chili hover:underline">
            Xem tất cả video →
          </Link>
        </div>
      </section>

      {/* 2. Công thức nổi bật */}
      <section className="border-t border-turmeric/20 bg-white/60">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-coffee sm:text-3xl">
                Công thức nổi bật
              </h2>
              <p className="text-coffee/60">Hướng dẫn chi tiết từng bước, dễ làm tại nhà</p>
            </div>
            <Link href="/cong-thuc" className="hidden text-sm font-semibold text-chili hover:underline sm:block">
              Xem tất cả →
            </Link>
          </div>

          {usedCategories.length > 1 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {usedCategories.map((category) => (
                <Link
                  key={category}
                  href={`/danh-muc/${CATEGORY_SLUGS[category]}`}
                  className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-coffee/70 shadow-sm ring-1 ring-turmeric/20 transition hover:bg-turmeric/15"
                >
                  {category}
                </Link>
              ))}
            </div>
          )}

          {featuredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredRecipes.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-turmeric/40 bg-white p-8 text-center text-coffee/60">
              Các bài công thức chi tiết đang được biên soạn, mời anh quay lại sau nhé!
            </p>
          )}

          <div className="mt-6 text-center sm:hidden">
            <Link href="/cong-thuc" className="font-semibold text-chili hover:underline">
              Xem tất cả công thức →
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4">
        <AdSlot slot="home-mid" />
      </div>

      {/* 3. Sản phẩm gợi ý */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-coffee sm:text-3xl">
              Sản phẩm Góc Bếp gợi ý
            </h2>
            <p className="text-coffee/60">Dụng cụ, nguyên liệu Góc Bếp thường dùng trong video</p>
          </div>
          <Link href="/san-pham" className="hidden text-sm font-semibold text-chili hover:underline sm:block">
            Xem tất cả →
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-turmeric/40 bg-white p-8 text-center text-coffee/60">
            Đang cập nhật danh sách sản phẩm gợi ý, mời quay lại sau!
          </p>
        )}
      </section>
    </div>
  );
}
