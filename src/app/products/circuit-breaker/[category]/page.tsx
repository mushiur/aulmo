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
    <main className="relative min-h-screen bg-paper-bright text-charcoal">
      <section
        data-theme="dark"
        className="relative flex min-h-[48vh] items-end overflow-hidden bg-ink text-paper sm:min-h-[56vh] md:min-h-[64vh]"
      >
        <Image
          src={category.image.src}
          alt={category.image.alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/45 to-ink/10" />
        <div className="relative w-full px-6 pt-[10vh] pb-[6vh] md:px-[4.5vw] md:pt-[18vh] md:pb-[8vh]">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Circuit Breaker", href: "/products/circuit-breaker" },
              { label: category.name },
            ]}
          />
          <Reveal as="h1" className="m-0 mt-6 text-[clamp(36px,6.4vw,88px)] leading-[0.92] font-extrabold tracking-[-0.045em] uppercase [font-stretch:114%]">
            {category.name}
          </Reveal>
          <Reveal delay={80} as="p" className="m-0 mt-6 max-w-[56ch] text-pretty text-[14.5px] leading-[1.66] opacity-75 md:text-[15px]">
            {category.fullName} — {category.description}
          </Reveal>
        </div>
      </section>

      <div data-theme="light" className="px-6 py-[7vh] md:px-[4.5vw] md:py-[8vh]">
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
