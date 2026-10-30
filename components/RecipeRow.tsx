import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/lib/recipes";
import { cardThumb } from "@/lib/image";

/** Thẻ công thức dạng HÀNG (ảnh nhỏ trái, chữ phải) - dùng cho danh sách dài. */
export default function RecipeRow({ recipe }: { recipe: Recipe }) {
  const meta = [recipe.cookTime && `Nấu ${recipe.cookTime}`, recipe.servings && recipe.servings].filter(Boolean).join(" · ");
  return (
    <Link
      href={`/cong-thuc/${recipe.slug}`}
      className="card-lift group flex gap-4 rounded-xl border border-ink/10 bg-white p-3 hover:border-ink/30"
    >
      <div className="relative h-28 w-28 flex-none overflow-hidden rounded-lg bg-ink/10 sm:h-32 sm:w-32">
        <Image src={cardThumb(recipe.coverImage)} alt={recipe.title} fill unoptimized sizes="128px" className="object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="w-fit bg-ink px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-honey">{recipe.category}</span>
        <h3 className="mt-2 line-clamp-2 text-lg font-extrabold leading-snug text-ink group-hover:text-chili">{recipe.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-coffee/65">{recipe.excerpt}</p>
        <p className="mt-auto pt-2 text-xs font-bold text-coffee/50">
          {meta && <span>{meta} · </span>}
          <span className="text-ink underline decoration-honey decoration-[3px] underline-offset-4">Xem công thức →</span>
        </p>
      </div>
    </Link>
  );
}
