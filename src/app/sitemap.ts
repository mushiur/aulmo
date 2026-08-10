import type { MetadataRoute } from "next";
import { getProductHierarchy } from "@/lib/products";
import { getCircuitBreakerCategories } from "@/lib/circuit-breakers";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [series, circuitBreakerCategories] = await Promise.all([
    getProductHierarchy(),
    getCircuitBreakerCategories(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about-us`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about-us/workshop`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/products`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/products/circuit-breaker`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/certificate`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const seriesRoutes: MetadataRoute.Sitemap = series.map((s) => ({
    url: `${SITE_URL}/products/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const subSeriesRoutes: MetadataRoute.Sitemap = series.flatMap((s) =>
    s.subSeries.map((sub) => ({
      url: `${SITE_URL}/products/${s.slug}/${sub.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  );

  const circuitBreakerRoutes: MetadataRoute.Sitemap = circuitBreakerCategories.map((c) => ({
    url: `${SITE_URL}/products/circuit-breaker/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...seriesRoutes, ...subSeriesRoutes, ...circuitBreakerRoutes];
}
