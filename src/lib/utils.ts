import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function range(start: number, end: number) {
  let length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
}
