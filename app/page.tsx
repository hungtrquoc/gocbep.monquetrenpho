import Image from "next/image";
import Link from "next/link";
import { getLatestVideos, CHANNEL_URL } from "@/lib/youtube";
import { CATEGORIES, CATEGORY_SLUGS, getPublishedRecipes } from "@/lib/recipes";
import { getAllProducts } from "@/lib/products";
import VideoCard from "@/components/VideoCard";
import RecipeCard from "@/components/RecipeCard";
import ProductCard from "@/components/ProductCard";
import AdSlot from "@/components/AdSlot";

export default async function HomePage() {
  const videos = await getLatestVideos();
  const featuredVideos = videos.slice(0, 3);
  const publishedRecipes = getPublishedRecipes();
  const featuredRecipes = publishedRecipes.slice(0, 6);
  const featuredProducts = getAllProducts().slice(0, 3);
  const usedCategories = CATEGORIES.filter((c) =>
    publishedRecipes.some((r) => r.category === c)
  );

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
            Công thức nấu ăn chi tiết, dễ làm cho từng món quê dân dã — kèm gợi ý
            dụng cụ, nguyên liệu Góc Bếp thường dùng để anh/chị vào bếp thuận tiện
            hơn mỗi ngày.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/cong-thuc"
              className="rounded-full bg-chili px-6 py-3 font-semibold text-white shadow-md transition hover:bg-chili/90"
            >
              Xem công thức nấu ăn
            </Link>
            <Link
              href="/san-pham"
              className="rounded-full border border-chili px-6 py-3 font-semibold text-chili transition hover:bg-chili/10"
            >
              Sản phẩm gợi ý
            </Link>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-6 py-3 font-semibold text-coffee/70 underline-offset-4 transition hover:text-chili hover:underline"
            >
              Xem kênh YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Danh mục món ăn */}
      {usedCategories.length > 1 && (
        <section className="mx-auto max-w-5xl px-4 pt-10">
          <div className="flex flex-wrap justify-center gap-2">
            {usedCategories.map((category) => (
              <Link
                key={category}
                href={`/danh-muc/${CATEGORY_SLUGS[category]}`}
                className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-coffee/70 shadow-sm transition hover:bg-turmeric/15"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Công thức nổi bật */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between">
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

        <div className="mt-8 text-center sm:hidden">
          <Link href="/cong-thuc" className="font-semibold text-chili hover:underline">
            Xem tất cả công thức →
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4">
        <AdSlot slot="home-mid" />
      </div>

      {/* Sản phẩm gợi ý */}
      <section className="border-t border-turmeric/20 bg-white/60">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <div className="mb-8 flex items-end justify-between">
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
        </div>
      </section>

      {/* Video mới nhất */}
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
            <p className="text-4xl">📖</p>
            <h3 className="mt-3 font-display font-semibold text-coffee">Công thức chi tiết</h3>
            <p className="mt-1 text-sm text-coffee/70">
              Từng bước rõ ràng, nguyên liệu cụ thể — làm theo là thành công.
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
