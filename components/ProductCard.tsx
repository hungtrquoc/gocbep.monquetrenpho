import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.affiliateUrl}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-turmeric/20 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-turmeric/10">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-turmeric">
            {product.category}
          </span>
          {product.platform && (
            <span className="rounded-full bg-coffee/10 px-2 py-0.5 text-[11px] font-medium text-coffee/70">
              {product.platform}
            </span>
          )}
        </div>
        <h3 className="line-clamp-2 font-display text-base font-semibold text-coffee">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-coffee/70">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          {product.price && (
            <span className="font-display font-semibold text-chili">{product.price}</span>
          )}
          <span className="text-sm font-semibold text-chili group-hover:underline">
            Mua ngay →
          </span>
        </div>
      </div>
    </a>
  );
}
