import { circuitBreakerBrands, circuitBreakerCategories, circuitBreakerProducts } from "@/data/circuit-breakers";
import type { CircuitBreakerPole } from "@/data/types";

/**
 * Accessors for the circuit breaker catalog. Components and pages should
 * read through this module rather than importing src/data/circuit-breakers.ts
 * directly — same convention as src/lib/products.ts.
 */

export async function getCircuitBreakerCategories() {
  return circuitBreakerCategories;
}

export async function getCircuitBreakerCategoryBySlug(slug: string) {
  return circuitBreakerCategories.find((c) => c.slug === slug);
}

export async function getCircuitBreakerCategoryParams() {
  return circuitBreakerCategories.map((c) => ({ category: c.slug }));
}

export async function getCircuitBreakerBrands() {
  return circuitBreakerBrands;
}

export function getBrandName(slug: string) {
  return circuitBreakerBrands.find((b) => b.slug === slug)?.name ?? slug;
}

export async function getCircuitBreakerProducts(categorySlug: string, pole?: CircuitBreakerPole) {
  return circuitBreakerProducts.filter(
    (p) => p.categorySlug === categorySlug && (!pole || p.pole === pole),
  );
}

/** Distinct filter option lists actually present in a category's products, so filters never show an empty-result option. */
export async function getCircuitBreakerFilterOptions(categorySlug: string) {
  const products = circuitBreakerProducts.filter((p) => p.categorySlug === categorySlug);
  const uniq = (values: (string | undefined)[]) => [...new Set(values.filter(Boolean) as string[])];
  return {
    brands: uniq(products.map((p) => p.brandSlug)),
    ratedCurrents: uniq(products.map((p) => p.ratedCurrent)),
    curveTypes: uniq(products.map((p) => p.curveType)),
    breakingCapacities: uniq(products.map((p) => p.breakingCapacity)),
    voltages: uniq(products.map((p) => p.voltage)),
    series: uniq(products.map((p) => p.series)),
  };
}
