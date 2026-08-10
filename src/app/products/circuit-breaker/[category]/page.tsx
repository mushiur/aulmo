import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Reveal } from "@/components/ui/Reveal";
import CircuitBreakerListing from "@/components/circuit-breaker/CircuitBreakerListing";
import {
  getCircuitBreakerCategoryBySlug,
  getCircuitBreakerCategoryParams,
  getCircuitBreakerProducts,
  getCircuitBreakerBrands,
} from "@/lib/circuit-breakers";
import { SITE_URL } from "@/lib/seo";

export async function generateStaticParams() {
  return getCircuitBreakerCategoryParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = await getCircuitBreakerCategoryBySlug(categorySlug);
  if (!category) return {};
  const title = `${category.name} — ${category.fullName}`;
  return {
    title,
    description: `${category.description} Browse ${category.name} products by pole, brand, rated current and voltage.`,
    alternates: { canonical: `${SITE_URL}/products/circuit-breaker/${category.slug}` },
  };
}

export default async function CircuitBreakerCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = await getCircuitBreakerCategoryBySlug(categorySlug);
  if (!category) notFound();

  const [products, brands] = await Promise.all([
    getCircuitBreakerProducts(category.slug),
    getCircuitBreakerBrands(),
  ]);

  return (
    <main data-theme="light" className="relative min-h-screen bg-paper-bright text-charcoal">
      <div className="px-6 pt-[16vh] pb-[6vh] md:px-[4.5vw] md:pt-[18vh]">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Circuit Breaker", href: "/products/circuit-breaker" },
            { label: category.name },
          ]}
        />
        <Reveal as="h1" className="m-0 mt-6 text-[clamp(30px,4.6vw,64px)] leading-[0.98] font-extrabold tracking-[-0.04em] uppercase [font-stretch:114%]">
          {category.name}
        </Reveal>
        <Reveal delay={80} as="p" className="m-0 mt-3 max-w-[60ch] text-pretty text-[14.5px] leading-[1.66] opacity-65">
          {category.fullName} — {category.description}
        </Reveal>
      </div>

      <div className="px-6 pb-[10vh] md:px-[4.5vw]">
        <Suspense fallback={null}>
          <CircuitBreakerListing
            categoryName={category.name}
            categoryFullName={category.fullName}
            hasPoles={category.hasPoles}
            products={products}
            brands={brands}
          />
        </Suspense>
      </div>
    </main>
  );
}
