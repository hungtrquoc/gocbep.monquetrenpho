import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CATEGORIES,
  CATEGORY_SLUGS,
  getCategoryBySlug,
  getRecipesByCategory,
} from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: CATEGORY_SLUGS[c] }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const category = getCategoryBySlug(params.category);
  if (!category) return {};
  return {
    title: `Công thức ${category}`,
    description: `Toàn bộ công thức ${category} chi tiết từ kênh Góc Bếp — hướng dẫn từng bước, dễ làm tại nhà.`,
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = getCategoryBySlug(params.category);
  if (!category) return notFound();

  const recipes = getRecipesByCategory(category);

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <nav className="mb-3 text-xs text-coffee/50">
        <Link href="/cong-thuc" className="hover:text-chili hover:underline">
          Công thức
        </Link>
        <span className="mx-1.5">/</span>
        <span>{category}</span>
      </nav>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-coffee">{category}</h1>
          <p className="mt-2 text-coffee/60">
            {recipes.length} công thức {category.toLowerCase()} — hướng dẫn chi tiết từng bước.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c !== category).map((c) => (
            <Link
              key={c}
              href={`/danh-muc/${CATEGORY_SLUGS[c]}`}
              className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-coffee/70 transition hover:bg-turmeric/15"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-turmeric/40 bg-white p-8 text-center text-coffee/60">
          Công thức {category.toLowerCase()} đang được biên soạn, mời anh quay lại sau nhé!
        </p>
      )}

      <div className="mt-10">
        <AdSlot slot="category-list" />
      </div>
    </div>
  );
}
