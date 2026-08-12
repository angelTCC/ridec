import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, compact = false, decimals = 0) {
  if (compact) {
    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(decimals) + "M";
    }
    if (value >= 1_000) {
      return (value / 1_000).toFixed(decimals) + "K";
    }
  }

  return value.toLocaleString("es-PE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}
