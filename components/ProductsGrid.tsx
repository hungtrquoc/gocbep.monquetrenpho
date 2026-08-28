"use client";

import { useMemo, useState } from "react";
import { PRODUCT_CATEGORIES, type Product, type ProductCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ProductsGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState<ProductCategory | "all">("all");

  const usedCategories = useMemo(
    () => PRODUCT_CATEGORIES.filter((c) => products.some((p) => p.category === c)),
    [products]
  );

  const visible = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      {usedCategories.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setActive("all")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              active === "all" ? "bg-chili text-white" : "bg-white text-coffee/70 hover:bg-turmeric/15"
            }`}
          >
            Tất cả
          </button>
          {usedCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                active === category ? "bg-chili text-white" : "bg-white text-coffee/70 hover:bg-turmeric/15"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-turmeric/40 bg-white p-8 text-center text-coffee/60">
          Chưa có sản phẩm trong danh mục này, mời anh quay lại sau!
        </p>
      )}
    </div>
  );
}
