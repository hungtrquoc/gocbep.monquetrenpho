import type { Metadata } from "next";
import { getPublishedRecipes } from "@/lib/recipes";
import RecipeCard from "@/components/RecipeCard";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Công thức nấu ăn",
  description: "Toàn bộ công thức nấu ăn chi tiết từ kênh Góc Bếp.",
};

export default function RecipesPage() {
  const recipes = getPublishedRecipes();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-coffee">Công thức nấu ăn</h1>
        <p className="mt-2 text-coffee/60">
          Hướng dẫn chi tiết từng bước cho các món ăn trong video của Góc Bếp.
        </p>
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-turmeric/40 bg-white p-8 text-center text-coffee/60">
          Các bài công thức chi tiết đang được biên soạn, mời anh quay lại sau nhé!
        </p>
      )}

      <div className="mt-10">
        <AdSlot slot="recipes-list" />
      </div>
    </div>
  );
}
