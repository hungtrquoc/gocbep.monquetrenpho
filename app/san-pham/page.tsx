import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Sản phẩm Góc Bếp gợi ý",
  description: "Dụng cụ bếp và nguyên liệu được Góc Bếp sử dụng và gợi ý.",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <div className="mb-4 text-center">
        <h1 className="font-display text-3xl font-bold text-coffee">Sản phẩm Góc Bếp gợi ý</h1>
        <p className="mt-2 text-coffee/60">
          Những dụng cụ, nguyên liệu mà Góc Bếp thường dùng trong video, được gợi ý lại cho anh/chị.
        </p>
      </div>

      <p className="mx-auto mb-10 max-w-2xl rounded-lg border border-turmeric/20 bg-white/70 p-3 text-center text-xs text-coffee/60">
        Đây là các liên kết tiếp thị liên kết (affiliate) — nếu anh/chị mua hàng qua
        liên kết bên dưới, Góc Bếp có thể nhận được một khoản hoa hồng nhỏ mà
        không phát sinh thêm chi phí nào cho anh/chị.
      </p>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
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
