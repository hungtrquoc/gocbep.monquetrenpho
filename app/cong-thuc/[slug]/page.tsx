import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getRecipeBySlug, getAllRecipeSlugs } from "@/lib/recipes";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() {
  // Tạo trang tĩnh cho TẤT CẢ công thức (kể cả bản nháp) để anh xem trước
  // qua link trực tiếp; chỉ bài đã published mới xuất hiện ở trang danh sách.
  return getAllRecipeSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return {};
  return {
    title: recipe.title,
    description: recipe.excerpt,
    openGraph: {
      title: recipe.title,
      description: recipe.excerpt,
      images: [recipe.coverImage],
    },
  };
}

export default function RecipeDetailPage({ params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      {!recipe.published && (
        <div className="mb-6 rounded-lg border border-chili/40 bg-chili/10 px-4 py-3 text-sm text-chili">
          <strong>Bản nháp — chưa công khai.</strong> Trang này chỉ xem được qua
          link trực tiếp để duyệt nội dung, chưa xuất hiện ở trang danh sách
          "Công thức".
        </div>
      )}

      <h1 className="font-display text-3xl font-bold text-coffee sm:text-4xl">
        {recipe.title}
      </h1>
      <p className="mt-3 text-coffee/70">{recipe.excerpt}</p>

      <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-turmeric/10">
        <Image src={recipe.coverImage} alt={recipe.title} fill className="object-cover" />
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-coffee/70">
        {recipe.servings && <span>🍽️ Khẩu phần: {recipe.servings}</span>}
        {recipe.prepTime && <span>⏱️ Chuẩn bị: {recipe.prepTime}</span>}
        {recipe.cookTime && <span>🔥 Nấu: {recipe.cookTime}</span>}
      </div>

      {recipe.videoId && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${recipe.videoId}`}
            title={recipe.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className="mt-10 grid gap-10 sm:grid-cols-[1fr_1.6fr]">
        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">Nguyên liệu</h2>
          <ul className="mt-3 space-y-2 text-coffee/90">
            {recipe.ingredients.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 text-turmeric">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-coffee">Các bước thực hiện</h2>
          <ol className="mt-3 space-y-5">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-chili font-display font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  {step.title && (
                    <p className="font-display font-semibold text-coffee">{step.title}</p>
                  )}
                  <p className="text-coffee/90">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {recipe.tips && recipe.tips.length > 0 && (
        <section className="mt-10 rounded-2xl border border-turmeric/20 bg-turmeric/10 p-6">
          <h2 className="font-display text-lg font-semibold text-coffee">💡 Mẹo nhỏ</h2>
          <ul className="mt-3 space-y-2 text-coffee/90">
            {recipe.tips.map((tip, i) => (
              <li key={i}>• {tip}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10">
        <AdSlot slot="recipe-detail" />
      </div>

      <div className="mt-10 border-t border-turmeric/20 pt-6 text-sm">
        <Link href="/cong-thuc" className="font-semibold text-chili hover:underline">
          ← Xem thêm công thức khác
        </Link>
      </div>
    </article>
  );
}
