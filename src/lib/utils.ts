import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** URL-safe lower-kebab slug. Strips diacritics, keeps a-z0-9-. */
export function slugify(input: string): string {
  return (input || "")
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Deterministic 5-letter slug (a-z) for a given id/seed. Stable across reloads. */
export function shortIdSlug(seed: string | number): string {
  const s = String(seed);
  // Simple 32-bit FNV-1a
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  let out = "";
  for (let i = 0; i < 5; i++) {
    out += String.fromCharCode(97 + (h % 26));
    h = Math.floor(h / 26) + ((h * 2654435761) >>> 0);
  }
  return out;
}
