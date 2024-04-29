import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "very_dark": "#171717",
        "dark": "#232A3C",
        "medium": "#293245",
        "light": "#202124",
        "dark_blue": "#1F2937",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      minHeight: {
        "86vh": "86vh",
      },
      height: {
        '18': '4.4rem',
        '22': '5.4em',
      },
      
    },
  },
  plugins: [],
};
export default config;
