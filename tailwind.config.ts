import type { Config } from "tailwindcss";

// Thiết kế 2026 "Caption News" - đồng bộ với phim ngắn của kênh: nền mực đen + giấy ngà,
// khối vàng mật ong làm điểm nhấn từ khoá, chữ Be Vietnam Pro đậm (bold minimalism).
// Giữ TÊN màu cũ (cream/turmeric/chili/leaf/coffee) để mọi trang cũ tự đổi theo.
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0E0C", // nền tối (header, hero, footer) - giống phim
        paper: "#F7F5EF", // giấy ngà - nền trang
        honey: "#FFC21A", // khối vàng làm nổi từ khoá
        cream: "#F7F5EF",
        turmeric: "#C99A12",
        chili: "#C8372D", // nút YouTube / hành động
        leaf: "#4C7A3D",
        coffee: "#1C1A17", // chữ chính
      },
      fontFamily: {
        sans: ["BV", "Be Vietnam Pro", "system-ui", "sans-serif"],
        display: ["BV", "Be Vietnam Pro", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Thang chữ co giãn theo màn hình (clamp) - skill modern-web-design
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
        "fluid-lg": "clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem)",
        "fluid-xl": "clamp(1.75rem, 1.4rem + 1.6vw, 2.75rem)",
        "fluid-2xl": "clamp(2.5rem, 1.8rem + 3.6vw, 5rem)",
      },
      borderRadius: { xl: "0.75rem", "2xl": "1rem" },
      boxShadow: {
        sm: "0 1px 2px rgba(14,14,12,0.06)",
        lift: "0 14px 30px -12px rgba(14,14,12,0.35)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: { marquee: "marquee 40s linear infinite" },
    },
  },
  plugins: [],
};

export default config;
