import {
  Bodoni_Moda,
  Roboto,
  Roboto_Condensed,
  Roboto_Mono,
} from "next/font/google";

export const acccentFont = Bodoni_Moda({
  weight: "variable",
  style: "italic",
  subsets: ["latin"],
});

export const mainFont = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const monoFont = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const headingFont = Roboto_Condensed({
  weight: "700",
  subsets: ["latin"],
});
