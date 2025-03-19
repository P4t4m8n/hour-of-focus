import type { Config } from "tailwindcss";
import { GINGER_KID_IMAGE } from "./constants/images";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainWhite: {
          0: "#ffffff",
          50: "#fff7ed",
          100: "#ffeed5",
          150: "#f6f6f6f6",
        },
        mainOrange: {
          600: "#ea5d0c",
          700: "#cf4a0d",
          800: "#9a3712",
        },

        mainGold: {
          400: "#f3c71c",
          500: "#dba80e",
        },
        mainGray: {
          300: "#e7e7e7",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#292929",
          800: "#454545",
        },
        imageOverlay: {
          75: "rgba(90, 90, 90, 0.75)",
          60: "rgba(90, 90, 90, 0.6)",
        },
      },

      backgroundImage: {
        "ginger-kid":
          `url('${GINGER_KID_IMAGE}')`,
      },
      gridColumn: {
        materialsLayout: "repeat(auto-fit,_minmax(minSize,_1fr))",
      },
      fontSize: {
        14: "0.875rem",
        15: "0.9375rem",
        16: "1rem",
        18: "1.125rem",
        20: "1.25rem",
        24: "1.5rem",
        28: "1.75rem",
        36: "2.25rem",
        44: "2.75rem",
      },
      screens: {
        xs: { min: "24rem" },
        msm: { min: "28rem" },
      },

      borderRadius: {
        base: "4px",
      },
      padding: {
        base: "7.5rem",
        gaps: "3rem",
        "gaps-md": "5rem",
        sides: "1rem",
        "sides-sm": "6rem",
      },
      gap: {
        gaps: "3rem",
        "gaps-md": "5rem",
      },
      lineHeight: {
        21: "1.35rem",
        23: "1.4875rem",
        28: "1.8rem",
        30: "1.9125rem",
        34: "2.125rem",
        40: "2.55rem",
        42: "2.625rem",
        52: "3.3rem",
      },
      boxShadow: {
        material: "0px 4px 8px #00000026",
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
    }: {
      addUtilities: (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        utilities: Record<string, any>,
        options?: {
          variants?: string[];
          respectPrefix?: boolean;
          respectImportant?: boolean;
        }
      ) => void;
    }) {
      addUtilities({
        ".scrollbar-hidden": {
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
        },
        ".scrollbar-hidden::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
} satisfies Config;
