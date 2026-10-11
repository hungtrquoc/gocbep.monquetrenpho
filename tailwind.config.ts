import type { Config } from "tailwindcss";

// Phong cách "tạp chí ẩm thực hiện đại": nền trắng ngà ấm, chữ nâu đen,
// ớt đỏ là màu nhấn duy nhất, tiêu đề chữ có chân (Lora), góc bo vừa phải.
// Giữ nguyên TÊN màu cũ (cream/turmeric/chili/leaf/coffee) để không phải sửa
// từng component - chỉ đổi giá trị.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6F0", // chỉ dùng cho các dải nền phụ; nền trang là trắng
        turmeric: "#B8956A", // be/nâu nhạt - dùng làm viền/nền nhạt (opacity thấp)
        chili: "#C8372D",
        leaf: "#4C7A3D",
        coffee: "#2B2118",
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam)", "Be Vietnam Pro", "system-ui", "sans-serif"],
        display: ["var(--font-lora)", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "0.5rem",
        "2xl": "0.625rem",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(43,33,24,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
