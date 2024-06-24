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

export function min(a: number, b: number): number {
  return Math.min(a, b)
}

export function minWithCap(a: number, b: number, cap: number): number {
  const min = Math.min(a, b);
  return min < cap ? cap : min;
}

export function range(start: number, end: number) {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
}

export function extractTimeDigitsFromDate(date: Date) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const hourTensDigit = Math.floor(hour / 10);
  const hourUnitDigit = hour % 10;
  const minuteTensDigit = Math.floor(minute / 10);
  const minuteUnitDigit = minute % 10;
  const secondTensDigit = Math.floor(second / 10);
  const secondUnitDigit = second % 10;

  return {
    hourTensDigit,
    hourUnitDigit,
    minuteTensDigit,
    minuteUnitDigit,
    secondTensDigit,
    secondUnitDigit,
  };
}
