import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getRecipeBySlug,
  getAllRecipeSlugs,
  getRelatedRecipes,
  CATEGORY_SLUGS,
} from "@/lib/recipes";
import { isYoutubeVideoAvailable, filterAvailableRecipes } from "@/lib/youtube-availability";
import AdSlot from "@/components/AdSlot";
import RecipeCard from "@/components/RecipeCard";
import RecipeIngredients from "@/components/RecipeIngredients";
import PrintButton from "@/components/PrintButton";
import RelatedProducts from "@/components/RelatedProducts";
import { getProductsForRecipe } from "@/lib/products";

export const revalidate = 1800;

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
    keywords: recipe.keywords,
    openGraph: {
      title: recipe.title,
      description: recipe.excerpt,
      images: [recipe.coverImage],
      type: "article",
    },
  };
}

function parseDurationToIso(text?: string): string | undefined {
  if (!text) return undefined;
  const match = text.match(/(\d+)/);
  if (!match) return undefined;
  return `PT${match[1]}M`;
}

export default async function RecipeDetailPage({ params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return notFound();

  // Công thức đã published nhưng video YouTube chưa thực sự public (vd còn
  // đang lên lịch) → 404 tạm thời, tự hiện lại khi video chuyển sang public
  // nhờ revalidate ISR ở trên, không cần deploy lại.
  if (recipe.published && !(await isYoutubeVideoAvailable(recipe.videoId))) {
    return notFound();
  }

  const related = await filterAvailableRecipes(getRelatedRecipes(recipe, 3));
  const relatedProducts = getProductsForRecipe(recipe.slug);
  const siteUrl = "https://gocbep.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.excerpt,
    image: [recipe.coverImage],
    author: {
      "@type": "Organization",
      name: "Góc Bếp – Món quê trên phố",
    },
    datePublished: recipe.updatedAt,
    recipeCategory: recipe.category,
    recipeCuisine: "Việt Nam",
    keywords: recipe.keywords?.join(", "),
    recipeYield: recipe.servings,
    prepTime: parseDurationToIso(recipe.prepTime),
    cookTime: parseDurationToIso(recipe.cookTime),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.description,
    })),
    ...(recipe.videoId && {
      video: {
        "@type": "VideoObject",
        name: recipe.title,
        description: recipe.excerpt,
        thumbnailUrl: [recipe.coverImage],
        uploadDate: recipe.updatedAt,
        contentUrl: `https://www.youtube.com/watch?v=${recipe.videoId}`,
        embedUrl: `https://www.youtube.com/embed/${recipe.videoId}`,
      },
    }),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      {/* Structured data cho Google Rich Results (Recipe) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {!recipe.published && (
        <div className="no-print mb-6 rounded-lg border border-chili/40 bg-chili/10 px-4 py-3 text-sm text-chili">
          <strong>Bản nháp — chưa công khai.</strong> Trang này chỉ xem được qua
          link trực tiếp để duyệt nội dung, chưa xuất hiện ở trang danh sách
          "Công thức".
        </div>
      )}

      <nav className="no-print mb-3 text-xs text-coffee/50">
        <Link href="/cong-thuc" className="hover:text-chili hover:underline">
          Công thức
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={`/danh-muc/${CATEGORY_SLUGS[recipe.category]}`} className="hover:text-chili hover:underline">
          {recipe.category}
        </Link>
      </nav>

      <span className="inline-block rounded-full bg-turmeric/15 px-3 py-1 text-xs font-semibold text-chili">
        {recipe.category}
      </span>

      <h1 className="mt-3 font-display text-3xl font-bold text-coffee sm:text-4xl">
        {recipe.title}
      </h1>
      <p className="mt-3 text-coffee/70">{recipe.excerpt}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-turmeric/20 bg-white/70 px-5 py-4 text-sm text-coffee/80">
        {recipe.servings && (
          <span className="flex items-center gap-1.5">
            <span aria-hidden>🍽️</span> Khẩu phần: <strong className="text-coffee">{recipe.servings}</strong>
          </span>
        )}
        {recipe.prepTime && (
          <span className="flex items-center gap-1.5">
            <span aria-hidden>⏱️</span> Chuẩn bị: <strong className="text-coffee">{recipe.prepTime}</strong>
          </span>
        )}
        {recipe.cookTime && (
          <span className="flex items-center gap-1.5">
            <span aria-hidden>🔥</span> Nấu: <strong className="text-coffee">{recipe.cookTime}</strong>
          </span>
        )}
        <div className="ml-auto">
          <PrintButton />
        </div>
      </div>

      <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-turmeric/10">
        <Image src={recipe.coverImage} alt={recipe.title} fill className="object-cover" />
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
          <RecipeIngredients ingredients={recipe.ingredients} />
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

      <RelatedProducts products={relatedProducts} />

      <div className="no-print mt-10">
        <AdSlot slot="recipe-detail" />
      </div>

      {related.length > 0 && (
        <section className="no-print mt-12 border-t border-turmeric/20 pt-8">
          <h2 className="font-display text-xl font-semibold text-coffee">Món liên quan</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </section>
      )}

      <div className="no-print mt-10 border-t border-turmeric/20 pt-6 text-sm">
        <Link href="/cong-thuc" className="font-semibold text-chili hover:underline">
          ← Xem thêm công thức khác
        </Link>
      </div>
    </article>
  );
}
