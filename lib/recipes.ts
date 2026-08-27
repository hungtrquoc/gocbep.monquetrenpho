/**
 * "CMS" đơn giản cho các trang chi tiết công thức (mỗi video 1 trang).
 *
 * Quy trình: khi có video mới, nhờ Claude soạn 1 bản nháp công thức dựa
 * trên tiêu đề video đó (đặt videoId đúng với video đó), để `published:
 * false`. Anh xem lại nội dung ở đây, sửa nếu cần, rồi đổi thành
 * `published: true` và deploy lại — công thức đó mới hiển thị công khai
 * trên website. Recipe có `published: false` sẽ KHÔNG xuất hiện ở trang
 * "/cong-thuc" hay trang chủ, nhưng vẫn xem thử được qua đường link trực
 * tiếp `/cong-thuc/<slug>` để anh duyệt trước khi công khai.
 *
 * Dữ liệu công thức giờ nằm ở `data/recipes.json` — một file JSON thuần,
 * được cấu trúc để cả website (qua file này) lẫn 1 script Python tự động
 * (đọc/ghi trực tiếp file JSON, không cần parse TypeScript) đều dùng
 * chung được. File `lib/recipes.ts` này chỉ còn nhiệm vụ định nghĩa kiểu
 * dữ liệu (types) và cung cấp các hàm tiện ích (helpers) có kiểu (typed)
 * để phần còn lại của website truy vấn dữ liệu.
 *
 * Danh sách ~365 video còn lại chưa lên bài (videoId + tiêu đề thật, lấy từ
 * dữ liệu YouTube Studio Analytics) nằm ở `lib/video-backlog.ts` — dùng làm
 * hàng chờ để viết tiếp các đợt công thức sau, tránh phải quét lại kênh.
 */

import recipesData from "@/data/recipes.json";

export const CATEGORIES = [
  "Món nước",
  "Món chính",
  "Bánh & Ăn vặt",
  "Gỏi & Nộm",
  "Món chay",
  "Tráng miệng",
  "Nước chấm & Gia vị",
] as const;

export type RecipeCategory = (typeof CATEGORIES)[number];

/** Slug URL-safe cho từng category (dùng ở /danh-muc/[slug]), vì tên tiếng Việt có dấu và ký tự "&". */
export const CATEGORY_SLUGS: Record<RecipeCategory, string> = {
  "Món nước": "mon-nuoc",
  "Món chính": "mon-chinh",
  "Bánh & Ăn vặt": "banh-an-vat",
  "Gỏi & Nộm": "goi-nom",
  "Món chay": "mon-chay",
  "Tráng miệng": "trang-mieng",
  "Nước chấm & Gia vị": "nuoc-cham-gia-vi",
};

export function getCategoryBySlug(slug: string): RecipeCategory | undefined {
  return CATEGORIES.find((c) => CATEGORY_SLUGS[c] === slug);
}

export type RecipeStep = {
  title?: string;
  description: string;
};

export type Recipe = {
  slug: string;
  /** ID video YouTube tương ứng (phần sau "v=" trong link video), để nhúng video vào bài viết. */
  videoId: string;
  title: string;
  /** Mô tả ngắn hiển thị ở thẻ danh sách công thức + thẻ SEO. */
  excerpt: string;
  /** Ảnh đại diện — mặc định dùng thumbnail YouTube của chính video, hoặc ảnh riêng đặt trong public/recipes/. */
  coverImage: string;
  category: RecipeCategory;
  /** Từ khoá phụ để hỗ trợ SEO (không hiển thị trực tiếp, đưa vào meta keywords + JSON-LD). */
  keywords?: string[];
  servings?: string;
  prepTime?: string;
  cookTime?: string;
  ingredients: string[];
  steps: RecipeStep[];
  tips?: string[];
  published: boolean;
  updatedAt: string; // YYYY-MM-DD
};

export const recipes = recipesData as Recipe[];

export function getPublishedRecipes(): Recipe[] {
  return recipes
    .filter((r) => r.published)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function getAllRecipeSlugs(): string[] {
  return recipes.map((r) => r.slug);
}

export function getRecipesByCategory(category: RecipeCategory): Recipe[] {
  return getPublishedRecipes().filter((r) => r.category === category);
}

/** Lấy tối đa `limit` công thức "liên quan" — ưu tiên cùng category, khác chính nó. */
export function getRelatedRecipes(current: Recipe, limit = 3): Recipe[] {
  const published = getPublishedRecipes().filter((r) => r.slug !== current.slug);
  const sameCategory = published.filter((r) => r.category === current.category);
  const rest = published.filter((r) => r.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
