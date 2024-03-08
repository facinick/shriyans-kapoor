import {
  Albert_Sans,
  Bodoni_Moda,
  Merriweather,
  Open_Sans,
} from "next/font/google";

export const acccentFont = Bodoni_Moda({
  weight: "variable",
  style: "italic",
  subsets: ["latin"],
});

export const headingFont = Merriweather({
  weight: "700",
  subsets: ["latin"],
});

export const mainFont = Open_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const monoFont = Open_Sans({
  weight: "400",
  subsets: ["latin"],
});