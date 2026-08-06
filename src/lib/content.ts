import { heroStats } from "@/data/hero";

/**
 * Accessor for homepage storytelling content (hero stats). The product
 * hierarchy itself lives in src/lib/products.ts — keep the two separate,
 * this file is homepage-only content.
 */

export async function getHeroStats() {
  return heroStats;
}
