import type { Metadata } from "next";
import Image from "next/image";
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

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = await getCircuitBreakerCategoryBySlug(categorySlug);
  if (!category) return {};
  return {
    title: `${category.name} — ${category.fullName}`,
    description: `${category.description} Browse ${category.name} products by pole, brand, rated current and voltage.`,
    alternates: { canonical: `${SITE_URL}/products/circuit-breaker/${category.slug}` },
  };
}

export default async function CircuitBreakerCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = await getCircuitBreakerCategoryBySlug(categorySlug);
  if (!category) notFound();

  const [products, brands] = await Promise.all([
    getCircuitBreakerProducts(category.slug),
    getCircuitBreakerBrands(),
  ]);

  return (
    <main data-theme="light" className="relative min-h-screen bg-paper-bright text-charcoal">
      <section className="relative isolate overflow-hidden border-b border-charcoal/10 bg-[#f1ece7]">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(135deg,transparent_0%,transparent_40%,rgb(232_222_214)_40%,rgb(232_222_214)_41%,transparent_41%)] md:block" />
        <div className="relative grid min-h-[390px] grid-cols-1 px-6 pt-[16vh] md:grid-cols-[1fr_minmax(360px,48%)] md:px-[4.5vw] md:pt-[18vh]">
          <div className="z-10 pb-10 md:pb-[9vh]">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Circuit Breaker", href: "/products/circuit-breaker" },
                { label: category.name },
              ]}
            />
            <Reveal as="h1" className="m-0 mt-6 text-[clamp(34px,5vw,72px)] leading-[0.98] font-extrabold tracking-[-0.04em] uppercase [font-stretch:114%]">
              {category.name}
            </Reveal>
            <Reveal delay={80} as="p" className="m-0 mt-4 max-w-[56ch] text-pretty text-[14.5px] leading-[1.66] md:text-[15px]">
              {category.fullName} — {category.description}
            </Reveal>
          </div>
          <div className="relative min-h-48 md:min-h-0">
            <Image src={category.image.src} alt={category.image.alt} fill priority sizes="(min-width: 768px) 48vw, 100vw" className="object-contain object-center md:object-bottom" />
          </div>
        </div>
      </section>

      <div className="px-6 py-[7vh] md:px-[4.5vw] md:py-[8vh]">
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
