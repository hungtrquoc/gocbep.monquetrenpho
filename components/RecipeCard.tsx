import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/lib/recipes";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/cong-thuc/${recipe.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-turmeric/20 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-turmeric/10">
        <Image
          src={recipe.coverImage}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-display text-base font-semibold text-coffee">
          {recipe.title}
        </h3>
        <p className="line-clamp-2 text-sm text-coffee/70">{recipe.excerpt}</p>
      </div>
    </Link>
  );
}
