import type { Metadata } from "next";
import Link from "next/link";
import { getLatestVideos, type YoutubeVideo } from "@/lib/youtube";
import { CATEGORIES, CATEGORY_SLUGS, getPublishedRecipes, type Recipe } from "@/lib/recipes";
import { getAllProducts, type Product } from "@/lib/products";
import { filterAvailableRecipes } from "@/lib/youtube-availability";
import { rank, tokenize } from "@/lib/search";
import SearchBox from "@/components/SearchBox";
import RecipeCard from "@/components/RecipeCard";
import VideoCard from "@/components/VideoCard";
import ProductCard from "@/components/ProductCard";

// Trang kết quả tìm kiếm: không cho Google index (tránh hàng nghìn URL ?q= trùng lặp/mỏng).
export const metadata: Metadata = {
  title: "Tìm kiếm",
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string | string[] };
}) {
  const raw = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q;
  const query = (raw ?? "").slice(0, 100).trim();
  const tokens = tokenize(query);

  let recipes: Recipe[] = [];
  let videos: YoutubeVideo[] = [];
  let products: Product[] = [];

  if (tokens.length > 0) {
    const [allRecipes, allVideos] = await Promise.all([
      filterAvailableRecipes(getPublishedRecipes()),
      getLatestVideos(),
    ]);

    recipes = rank(allRecipes, tokens, (r) => [
      { text: r.title, weight: 4 },
      { text: r.category, weight: 3 },
      { text: r.keywords?.join(" "), weight: 3 },
      { text: r.ingredients.join(" "), weight: 2 },
      { text: r.excerpt, weight: 1 },
    ]);
    videos = rank(allVideos, tokens, (v) => [
      { text: v.title, weight: 4 },
      { text: v.description, weight: 1 },
    ]).slice(0, 12);
    products = rank(getAllProducts(), tokens, (p) => [
      { text: p.name, weight: 4 },
      { text: p.category, weight: 3 },
      { text: p.description, weight: 1 },
    ]);
  }

  const total = recipes.length + videos.length + products.length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-fluid-xl font-black leading-[1.08] text-ink">Tìm kiếm</h1>
      <SearchBox defaultValue={query} className="mt-4 max-w-xl" autoFocus={!query} />

      {tokens.length === 0 && (
        <div className="mt-10">
          <p className="text-coffee/70">Gợi ý nhanh theo danh mục:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                href={`/danh-muc/${CATEGORY_SLUGS[c]}`}
                className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-coffee/70 ring-1 ring-turmeric/25 transition hover:bg-turmeric/15"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      )}

      {tokens.length > 0 && total === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-turmeric/40 bg-white p-8 text-center">
          <p className="font-display text-lg font-semibold text-coffee">
            Không tìm thấy kết quả cho “{query}”
          </p>
          <p className="mt-1 text-sm text-coffee/60">
            Thử từ khoá ngắn hơn (vd “gà”, “bánh”, “canh”) hoặc xem theo danh mục.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                href={`/danh-muc/${CATEGORY_SLUGS[c]}`}
                className="rounded-full bg-cream px-4 py-1.5 text-sm font-medium text-coffee/70 ring-1 ring-turmeric/25 hover:bg-turmeric/15"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      )}

      {tokens.length > 0 && total > 0 && (
        <p className="mt-6 text-sm text-coffee/60">
          {total} kết quả cho “{query}”
        </p>
      )}

      {videos.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-coffee">Video ({videos.length})</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}

      {recipes.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold text-coffee">Công thức ({recipes.length})</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold text-coffee">Sản phẩm ({products.length})</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
