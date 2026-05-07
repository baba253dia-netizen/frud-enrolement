import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        frud: {
          blue: '#0047AB',
          black: '#000000',
          white: '#FFFFFF',
          red: '#CC0000',
        },
      },
    },
  },
  plugins: [],
};

export default config;
