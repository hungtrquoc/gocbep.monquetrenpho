import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLatestVideos, CHANNEL_URL } from "@/lib/youtube";
import { CATEGORY_SLUGS, CATEGORIES, getPublishedRecipes } from "@/lib/recipes";
import { getAllProducts } from "@/lib/products";
import { filterAvailableRecipes } from "@/lib/youtube-availability";
import VideoCard from "@/components/VideoCard";
import RecipeRow from "@/components/RecipeRow";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import AdSlot from "@/components/AdSlot";

export const revalidate = 1800;

// Canonical đặt RIÊNG từng trang (không đặt ở layout vì sẽ bị mọi trang con kế thừa).
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Bố cục: 3 khối RÕ RÀNG, mỗi khối 1 mục đích, không lặp nội dung.
//   1) VIDEO (YouTube)  - thẻ ảnh 16:9 có nút phát
//   2) CÔNG THỨC        - thẻ dạng hàng có chữ, nền kem để tách khỏi khối video
//   3) SẢN PHẨM         - gợi ý dụng cụ
export default async function HomePage() {
  const videos = await getLatestVideos();
  const homeVideos = videos.slice(0, 8);
  const publishedRecipes = await filterAvailableRecipes(getPublishedRecipes());
  const homeRecipes = publishedRecipes.slice(0, 6);
  const featuredProducts = getAllProducts().slice(0, 4);
  const usedCategories = CATEGORIES.filter((c) => publishedRecipes.some((r) => r.category === c));

  return (
    <div>
      <h1 className="sr-only">Góc Bếp – Món quê trên phố: video nấu ăn và công thức món quê dân dã</h1>

      {/* 1. VIDEO */}
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <SectionHeader
          title="Video mới nhất"
          subtitle="Xem trên YouTube - cập nhật mỗi ngày"
          href={CHANNEL_URL}
          linkLabel="Đăng ký kênh"
        />
        {homeVideos.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-7 lg:grid-cols-4">
            {homeVideos.map((v, i) => (
              <VideoCard key={v.id} video={v} priority={i < 2} />
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
        <div className="mt-6 text-center">
          <Link href="/videos" className="text-sm font-bold text-chili hover:underline">
            Xem tất cả video →
          </Link>
        </div>
      </section>

      {/* 2. CÔNG THỨC */}
      <section className="mt-12 bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <SectionHeader
            title="Công thức nấu ăn"
            subtitle="Nguyên liệu và các bước chi tiết, làm theo là được"
            href="/cong-thuc"
            linkLabel="Tất cả công thức"
          />

          {usedCategories.length > 0 && (
            <div className="mb-5 flex gap-2 overflow-x-auto whitespace-nowrap pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {usedCategories.map((c) => (
                <Link
                  key={c}
                  href={`/danh-muc/${CATEGORY_SLUGS[c]}`}
                  className="rounded-full border border-coffee/20 bg-white px-4 py-1.5 text-sm font-semibold text-coffee/80 transition hover:border-chili hover:text-chili"
                >
                  {c}
                </Link>
              ))}
            </div>
          )}

          {homeRecipes.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {homeRecipes.map((r) => (
                <RecipeRow key={r.slug} recipe={r} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-coffee/25 bg-white p-8 text-center text-coffee/60">
              Các bài công thức chi tiết đang được biên soạn, mời anh quay lại sau nhé!
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <AdSlot slot="home-mid" />
      </div>

      {/* 3. SẢN PHẨM */}
      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-12">
          <SectionHeader
            title="Dụng cụ Góc Bếp hay dùng"
            subtitle="Sản phẩm gợi ý xuất hiện trong video"
            href="/san-pham"
            linkLabel="Xem tất cả"
          />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Giới thiệu ngắn ở cuối */}
      <section className="mx-auto mt-14 max-w-6xl px-4">
        <div className="flex flex-col items-center gap-5 rounded-lg border border-coffee/10 p-6 text-center sm:flex-row sm:text-left">
          <Image src="/logo.png" alt="Logo Góc Bếp" width={80} height={80} className="rounded-full" />
          <p className="flex-1 text-coffee/75">
            <strong className="text-coffee">Góc Bếp – Món quê trên phố.</strong> Video nấu ăn món quê dân dã mỗi
            ngày, kèm công thức chi tiết để anh/chị làm theo tại nhà.
          </p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full bg-chili px-5 py-2.5 text-sm font-bold text-white hover:bg-chili/90"
          >
            Đăng ký kênh YouTube
          </a>
        </div>
      </section>
    </div>
  );
}
