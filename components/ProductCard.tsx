import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.affiliateUrl}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-paper">
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-[0.14em] text-chili">
            {product.category}
          </span>
          {product.platform && (
            <span className="rounded-full bg-coffee/10 px-2 py-0.5 text-[11px] font-medium text-coffee/70">
              {product.platform}
            </span>
          )}
        </div>
        <h3 className="line-clamp-2 text-base font-extrabold text-ink">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-coffee/70">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          {product.price && (
            <span className="bg-honey px-1.5 font-black text-ink">{product.price}</span>
          )}
          <span className="text-sm font-extrabold text-ink transition group-hover:translate-x-1">
            Mua ngay →
          </span>
        </div>
      </div>
    </a>
  );
}
