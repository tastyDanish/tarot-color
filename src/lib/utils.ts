import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function choose<T>(myList: T[]) {
  if (myList.length === 0) return null;

  const random = Math.floor(Math.random() * myList.length);
  if (random < myList.length) {
    return myList[random];
  } else {
    return myList[0];
  }
}
