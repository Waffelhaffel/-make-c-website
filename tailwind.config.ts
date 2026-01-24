import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "makec-blue": "#2C2CC6",
        "makec-dark": "#14140F",
      },
      fontFamily: {
        garamond: ["var(--font-garamond)", "EB Garamond", "Georgia", "serif"],
        gotham: ["var(--font-gotham)", "system-ui", "-apple-system", "Helvetica Neue", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

