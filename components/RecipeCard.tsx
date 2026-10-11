import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/lib/recipes";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/cong-thuc/${recipe.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-coffee/10">
        <Image
          src={recipe.coverImage}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 flex flex-1 flex-col">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-chili">{recipe.category}</p>
        <h3 className="mt-1 line-clamp-2 font-display text-lg font-semibold leading-snug text-coffee transition group-hover:text-chili">
          {recipe.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-coffee/65">{recipe.excerpt}</p>
      </div>
    </Link>
  );
}
