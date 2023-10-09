import { Bodoni_Moda, Quattrocento, Questrial } from "next/font/google";

export const acccentFont = Bodoni_Moda({
  weight: "variable",
  style: "italic",
  subsets: ["latin"],
});

export const mainFont = Questrial({
  weight: "400",
  subsets: ["latin"],
});

export const hedingFont = Quattrocento({
  weight: "400",
  subsets: ["latin"],
});
