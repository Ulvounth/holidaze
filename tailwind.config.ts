import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        alkatra: ["var(--font-alkatra)", "sans-serif"],
      },
      container: {
        screens: {
          xl: "1500px",
          "2xl": "1800px",
          "3xl": "2200px",
        },
      },
      colors: {
        btnPrimary: "#e57399",
        btnSecondary: "#98a6f5",
      },
      maxWidth: {
        "7xl": "77rem",
      },
    },
  },
  plugins: [],
};

export default config;
