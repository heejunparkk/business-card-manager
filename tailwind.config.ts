import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 라이트 모드 색상
        light: {
          background: "#ffffff",
          foreground: "#171717",
          cardBg: "#ffffff",
          inputBg: "#f9fafb",
        },
        // 다크 모드 색상
        dark: {
          background: "#111827",
          foreground: "#f3f4f6",
          cardBg: "#1f2937",
          inputBg: "#374151",
        },
      },
      boxShadow: {
        "dark-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
        "dark-md":
          "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.3)",
        "dark-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
