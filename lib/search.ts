/**
 * Tìm kiếm đơn giản, không phân biệt hoa/thường và KHÔNG phân biệt dấu tiếng
 * Việt ("ga chien" tìm ra "Gà Chiên"). Mọi từ khoá phải có mặt (AND); điểm cao
 * hơn nếu khớp ở tiêu đề / danh mục / từ khoá.
 */

export function normalizeText(s: string): string {
  return s
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(query: string): string[] {
  return normalizeText(query).split(" ").filter(Boolean);
}

type Field = { text: string | undefined; weight: number };

/** Trả về điểm (0 = không khớp). Mọi token phải xuất hiện ít nhất ở 1 trường. */
export function scoreItem(tokens: string[], fields: Field[]): number {
  if (tokens.length === 0) return 0;
  const normalized = fields.map((f) => ({ text: normalizeText(f.text ?? ""), weight: f.weight }));
  let total = 0;
  for (const token of tokens) {
    let best = 0;
    for (const f of normalized) {
      if (f.text.includes(token)) best = Math.max(best, f.weight);
    }
    if (best === 0) return 0;
    total += best;
  }
  return total;
}

export function rank<T>(items: T[], tokens: string[], fieldsOf: (item: T) => Field[]): T[] {
  return items
    .map((item) => ({ item, score: scoreItem(tokens, fieldsOf(item)) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.item);
}
