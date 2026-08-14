import { circuitBreakerCategories } from "@/data/circuit-breakers";
import catalog from "@/data/circuit-breaker-catalog.json";
import type { CircuitBreakerBrand, CircuitBreakerCategory, CircuitBreakerPole, CircuitBreakerProduct } from "@/data/types";

/**
 * Accessors for the circuit breaker catalog. Components and pages should
 * read through this module rather than importing src/data/circuit-breakers.ts
 * or circuit-breaker-catalog.json directly — same convention as
 * src/lib/products.ts.
 *
 * Brands, breaker specs, brand logos, category card photos and nav icons are
 * all authored in circuit-breaker-catalog.json (a hand-editable content file,
 * not code) — this module is just the shape that JSON gets flattened into
 * for the rest of the app. Category structure (slug/name/description/
 * hasPoles) still comes from src/data/circuit-breakers.ts; its `image` and
 * `navIcon` are overridden from the JSON's `categories.<slug>` entry.
 */

type CatalogProduct = {
  id: string;
  category: string;
  pole?: CircuitBreakerPole;
  series?: string;
  name: string;
  ratedCurrent: string;
  curveType?: string;
  breakingCapacity?: string;
  voltage: string;
  madeIn?: string;
  image: string;
};

type CatalogBrand = {
  slug: string;
  name: string;
  logo?: string;
  products: CatalogProduct[];
};

type CatalogCategory = {
  navIcon?: string;
  cardImage?: string;
};

type Catalog = {
  categories?: Record<string, CatalogCategory>;
  brands: CatalogBrand[];
};

const typedCatalog = catalog as Catalog;

const circuitBreakerBrands: CircuitBreakerBrand[] = typedCatalog.brands.map((b) => ({
  slug: b.slug,
  name: b.name,
  logo: b.logo || undefined,
}));

const circuitBreakerProducts: CircuitBreakerProduct[] = typedCatalog.brands.flatMap((brand) =>
  brand.products.map((p) => ({
    id: p.id,
    categorySlug: p.category,
    brandSlug: brand.slug,
    pole: p.pole,
    name: p.name,
    series: p.series,
    ratedCurrent: p.ratedCurrent,
    curveType: p.curveType,
    breakingCapacity: p.breakingCapacity,
    voltage: p.voltage,
    madeIn: p.madeIn,
    image: { src: p.image, alt: `${brand.name} ${p.name}${p.pole ? `, ${p.pole}` : ""}` },
  })),
);

export async function getCircuitBreakerCategories(): Promise<CircuitBreakerCategory[]> {
  return circuitBreakerCategories.map((c) => {
    const override = typedCatalog.categories?.[c.slug];
    return {
      ...c,
      image: override?.cardImage ? { ...c.image, src: override.cardImage } : c.image,
      navIcon: override?.navIcon || undefined,
    };
  });
}

export async function getCircuitBreakerCategoryBySlug(slug: string) {
  const categories = await getCircuitBreakerCategories();
  return categories.find((c) => c.slug === slug);
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
