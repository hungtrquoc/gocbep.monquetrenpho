import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8EC",
        turmeric: "#E8A33D",
        chili: "#D64933",
        leaf: "#4C7A3D",
        coffee: "#4A2E1F",
      },
      fontFamily: {
        display: ["Be Vietnam Pro", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
