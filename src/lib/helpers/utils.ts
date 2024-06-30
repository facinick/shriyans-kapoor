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

export const range = (start: number, end?: number, step = 1) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export const getRandomIntBetween = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
