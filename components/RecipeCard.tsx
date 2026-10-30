import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/lib/recipes";
import { cardThumb, largeThumb } from "@/lib/image";

/** Thẻ công thức: ảnh 4:3 + nhãn danh mục khối đen chữ vàng; `large` = ô lớn có chữ phủ (bento). */
export default function RecipeCard({ recipe, large = false }: { recipe: Recipe; large?: boolean }) {
  if (large) {
    return (
      <Link href={`/cong-thuc/${recipe.slug}`} className="card-lift group relative block h-full min-h-[340px] overflow-hidden rounded-2xl bg-ink">
        <Image
          src={largeThumb(recipe.coverImage)}
          alt={recipe.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-90 transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <span className="kicker bg-honey px-2 py-1 text-ink">{recipe.category}</span>
          <h3 className="mt-3 text-fluid-lg font-black leading-tight text-paper">{recipe.title}</h3>
          <p className="mt-2 line-clamp-2 max-w-xl text-sm text-paper/75">{recipe.excerpt}</p>
          <p className="mt-4 text-sm font-extrabold text-honey">Xem công thức →</p>
        </div>
      </Link>
    );
  }
  return (
    <Link href={`/cong-thuc/${recipe.slug}`} className="group flex h-full flex-col">
      <div className="card-lift relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-ink/10">
        <Image
          src={cardThumb(recipe.coverImage)}
          alt={recipe.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-0 top-3 bg-ink px-2 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-honey">
          {recipe.category}
        </span>
      </div>
      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-lg font-extrabold leading-snug text-ink transition group-hover:text-chili">{recipe.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-coffee/65">{recipe.excerpt}</p>
      </div>
    </Link>
  );
}
