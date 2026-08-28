import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import ProductsGrid from "@/components/ProductsGrid";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Sản phẩm Góc Bếp gợi ý",
  description: "Dụng cụ bếp và nguyên liệu được Góc Bếp sử dụng và gợi ý.",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold text-coffee">Sản phẩm Góc Bếp gợi ý</h1>
        <p className="mx-auto mt-2 max-w-xl text-coffee/60">
          Những dụng cụ, nguyên liệu Góc Bếp dùng trong video, chọn lại cho anh/chị.
        </p>
      </div>

      {products.length > 0 ? (
        <ProductsGrid products={products} />
      ) : (
        <p className="rounded-xl border border-dashed border-turmeric/40 bg-white p-8 text-center text-coffee/60">
          Đang cập nhật danh sách sản phẩm gợi ý, mời quay lại sau!
        </p>
      )}

      <div className="mt-10">
        <AdSlot slot="products-list" />
      </div>
    </div>
  );
}
