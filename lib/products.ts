/**
 * Danh sách sản phẩm affiliate hiển thị ở trang "/san-pham" và (nếu gắn
 * `relatedRecipeSlugs`) ở khối "Dụng cụ gợi ý" trên trang chi tiết công thức.
 *
 * Dữ liệu sản phẩm giờ nằm ở `data/products.json` — một file JSON thuần,
 * được cấu trúc để cả website (qua file này) lẫn công cụ Python "Thêm sản
 * phẩm" (tab mới trong GocBepApp.py — GocBep_Application, đọc/ghi trực tiếp
 * file JSON, không cần parse TypeScript) đều dùng chung được. File
 * `lib/products.ts` này chỉ còn nhiệm vụ định nghĩa kiểu dữ liệu (types) và
 * cung cấp các hàm tiện ích (helpers) có kiểu (typed) để phần còn lại của
 * website truy vấn dữ liệu.
 *
 * Cách thêm sản phẩm mới: dùng tab "Thêm sản phẩm" trong GocBepApp.py — dán
 * link sản phẩm (Shopee/Lazada/TikTok Shop...), bấm "Lấy thông tin" để tool
 * tự lấy tên/ảnh/giá (khi lấy được), điền/sửa nốt các ô còn thiếu rồi bấm
 * "Lưu sản phẩm" — tool tự ghi vào data/products.json và git push, Vercel tự
 * deploy lại. Sửa tay file data/products.json vẫn dùng được (vd sửa nhanh 1
 * chi tiết nhỏ) nhưng KHÔNG còn là cách làm chính.
 *
 * - `affiliateUrl`: link affiliate thật (Shopee Affiliate, Lazada
 *   Affiliate, Accesstrade, Involve Asia, TikTok Shop...). Dùng ĐÚNG link
 *   đã gắn mã affiliate của anh để được tính hoa hồng.
 * - `image`: link ảnh sản phẩm lấy trực tiếp từ trang sàn TMĐT, hoặc ảnh
 *   riêng đặt trong public/products/ rồi ghi đường dẫn "/products/ten-anh.jpg".
 * - `category`: PHẢI là 1 trong PRODUCT_CATEGORIES bên dưới (dùng để nhóm +
 *   lọc ở trang /san-pham).
 * - `platform`: sàn bán (hiện badge nhỏ trên thẻ sản phẩm), tuỳ chọn.
 * - `relatedRecipeSlugs`: DANH SÁCH slug công thức mà sản phẩm này liên
 *   quan (vd nồi dùng trong video món đó) — điền vào để sản phẩm tự hiện
 *   thêm ở khối "Dụng cụ gợi ý" ngay trên trang công thức đó (chỗ có khả
 *   năng chuyển đổi mua hàng cao nhất, vì người đọc đang có nhu cầu ngay
 *   lúc đó). Để trống mảng `[]` nếu sản phẩm chung chung, không gắn món cụ
 *   thể nào — vẫn hiện ở trang "/san-pham" bình thường.
 */

import productsData from "@/data/products.json";

export const PRODUCT_CATEGORIES = [
  "Dụng cụ bếp",
  "Nguyên liệu & Gia vị",
  "Đồ gia dụng nhà bếp",
  "Khác",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type ProductPlatform = "Shopee" | "Lazada" | "TikTok Shop" | "Khác";

export type Product = {
  slug: string;
  name: string;
  image: string;
  price?: string;
  description: string;
  affiliateUrl: string;
  category: ProductCategory;
  platform?: ProductPlatform;
  /** Slug các công thức liên quan — sản phẩm sẽ tự hiện thêm ở trang công thức đó. */
  relatedRecipeSlugs?: string[];
};

export const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

/** Sản phẩm gắn với 1 công thức cụ thể (qua relatedRecipeSlugs) — dùng cho khối "Dụng cụ gợi ý" trên trang công thức. */
export function getProductsForRecipe(recipeSlug: string): Product[] {
  return products.filter((p) => p.relatedRecipeSlugs?.includes(recipeSlug));
}
