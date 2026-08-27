/**
 * "CMS" đơn giản cho các trang chi tiết công thức (mỗi video 1 trang).
 *
 * Quy trình: khi có video mới, nhờ Claude soạn 1 bản nháp công thức dựa
 * trên tiêu đề/mô tả video (đặt videoId đúng với video đó), để `published:
 * false`. Anh xem lại nội dung ở đây, sửa nếu cần, rồi đổi thành
 * `published: true` và deploy lại — công thức đó mới hiển thị công khai
 * trên website. Recipe có `published: false` sẽ KHÔNG xuất hiện ở trang
 * "/cong-thuc" hay trang chủ, nhưng vẫn xem thử được qua đường link trực
 * tiếp `/cong-thuc/<slug>` để anh duyệt trước khi công khai.
 */

export type RecipeStep = {
  title?: string;
  description: string;
};

export type Recipe = {
  slug: string;
  /** ID video YouTube tương ứng (phần sau "v=" trong link video), để nhúng video vào bài viết. */
  videoId: string;
  title: string;
  /** Mô tả ngắn hiển thị ở thẻ danh sách công thức. */
  excerpt: string;
  /** Ảnh đại diện — có thể dùng ảnh thumbnail YouTube hoặc ảnh riêng đặt trong public/recipes/. */
  coverImage: string;
  servings?: string;
  prepTime?: string;
  cookTime?: string;
  ingredients: string[];
  steps: RecipeStep[];
  tips?: string[];
  published: boolean;
  updatedAt: string; // YYYY-MM-DD
};

export const recipes: Recipe[] = [
  {
    slug: "vi-du-cong-thuc-mau",
    videoId: "",
    title: "[Bài mẫu] Cách trình bày 1 trang công thức trên website",
    excerpt:
      "Đây là bài công thức MẪU để anh xem thử giao diện trang chi tiết trông như thế nào — chưa phải nội dung thật, đang ở trạng thái nháp (published: false) nên KHÔNG hiển thị công khai.",
    coverImage: "/logo.png",
    servings: "2-3 người ăn",
    prepTime: "10 phút",
    cookTime: "20 phút",
    ingredients: [
      "500g nguyên liệu chính",
      "2 muỗng canh gia vị A",
      "1 củ hành tím, băm nhỏ",
      "Rau thơm ăn kèm",
    ],
    steps: [
      {
        title: "Sơ chế nguyên liệu",
        description: "Rửa sạch nguyên liệu, để ráo nước, cắt miếng vừa ăn.",
      },
      {
        title: "Ướp gia vị",
        description: "Ướp nguyên liệu với gia vị A trong khoảng 15 phút cho ngấm.",
      },
      {
        title: "Chế biến",
        description: "Bắc chảo lên bếp, phi thơm hành tím rồi cho nguyên liệu vào xào/nấu chín.",
      },
      {
        title: "Hoàn thiện & trình bày",
        description: "Nêm nếm lại cho vừa ăn, cho ra đĩa, rắc thêm rau thơm rồi thưởng thức.",
      },
    ],
    tips: [
      "Đây là mục 'Mẹo nhỏ' — có thể ghi các lưu ý giúp món ăn ngon hơn.",
      "File dữ liệu nằm ở lib/recipes.ts — sửa/thêm bài mới trực tiếp ở đó.",
    ],
    published: false,
    updatedAt: "2026-08-27",
  },
];

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
