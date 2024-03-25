import type { Config } from "tailwindcss";
import daisyui from 'daisyui';
import tailwindTypography from '@tailwindcss/typography';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

  },
  plugins: [
    tailwindTypography,
    daisyui,
  ],
};
export default config;
