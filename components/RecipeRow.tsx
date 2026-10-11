import Image from "next/image";
import Link from "next/link";
import type { Recipe } from "@/lib/recipes";
import { cardThumb } from "@/lib/image";

/**
 * Thẻ công thức dạng HÀNG (ảnh nhỏ bên trái, chữ bên phải) - cố ý KHÁC thẻ video
 * (ảnh to 16:9 có nút phát) để người xem phân biệt ngay: video = xem, công thức = đọc/làm theo.
 */
export default function RecipeRow({ recipe }: { recipe: Recipe }) {
  const meta = [recipe.cookTime && `Nấu ${recipe.cookTime}`, recipe.servings && recipe.servings]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={`/cong-thuc/${recipe.slug}`}
      className="group flex gap-4 rounded-lg border border-coffee/10 bg-white p-3 transition hover:border-chili/40 hover:shadow-md"
    >
      <div className="relative h-28 w-28 flex-none overflow-hidden rounded-md bg-coffee/10 sm:h-32 sm:w-32">
        <Image
          src={cardThumb(recipe.coverImage)}
          alt={recipe.title}
          fill
          unoptimized
          sizes="128px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="w-fit rounded bg-chili/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-chili">
          {recipe.category}
        </span>
        <h3 className="mt-1.5 line-clamp-2 font-display text-lg font-semibold leading-snug text-coffee group-hover:text-chili">
          {recipe.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-coffee/65">{recipe.excerpt}</p>
        <p className="mt-auto pt-2 text-xs font-semibold text-coffee/50">
          {meta && <span>{meta} · </span>}
          <span className="text-chili">Xem công thức →</span>
        </p>
      </div>
    </Link>
  );
}
