import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="no-print mt-10 rounded-2xl border border-turmeric/20 bg-white/70 p-6">
      <h2 className="font-display text-lg font-semibold text-coffee">🛒 Dụng cụ dùng trong video này</h2>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
