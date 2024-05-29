import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        logo: ["var(--font-lilita-one)"],
      },
    },
  },
  plugins: [typography, daisyui],
} satisfies Config;
