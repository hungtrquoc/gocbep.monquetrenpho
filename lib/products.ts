/**
 * Danh sách sản phẩm affiliate hiển thị ở trang "/san-pham".
 *
 * Cách thêm/sửa sản phẩm: chỉnh trực tiếp mảng `products` bên dưới, KHÔNG
 * cần biết lập trình nhiều — copy 1 khối `{ ... }` rồi đổi thông tin. Sau
 * khi sửa, commit + push lên GitHub, Vercel sẽ tự deploy lại.
 *
 * - `affiliateUrl`: link affiliate thật (Shopee Affiliate, Accesstrade,
 *   Involve Asia, TikTok Shop...). Nhớ dùng ĐÚNG link đã gắn mã affiliate
 *   của anh để được tính hoa hồng.
 * - `image`: có thể dùng link ảnh sản phẩm từ sàn TMĐT, hoặc để ảnh trong
 *   public/products/ rồi ghi đường dẫn dạng "/products/ten-anh.jpg".
 */

export type Product = {
  slug: string;
  name: string;
  image: string;
  price?: string;
  description: string;
  affiliateUrl: string;
  category?: string;
};

export const products: Product[] = [
  {
    slug: "san-pham-mau-1",
    name: "[Sản phẩm mẫu] Nồi/chảo dùng trong video",
    image: "/logo.png",
    price: "Xem giá tại gian hàng",
    description:
      "Đây là sản phẩm MẪU để xem thử giao diện trang — hãy thay bằng sản phẩm thật và link affiliate thật trong file lib/products.ts.",
    affiliateUrl: "https://shopee.vn/",
    category: "Dụng cụ bếp",
  },
];

export function getAllProducts(): Product[] {
  return products;
}
