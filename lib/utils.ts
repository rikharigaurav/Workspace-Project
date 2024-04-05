import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// interface cn {
//   input?: string,
// }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
