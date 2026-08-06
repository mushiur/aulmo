import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ProductCard from "@/components/products/ProductCard";
import { getProductHierarchy } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse the AULMO product range — L, D, M, K and S Series switches and sockets.",
};

export default async function ProductsPage() {
  const series = await getProductHierarchy();

  return (
    <main data-theme="light" className="relative min-h-screen bg-paper-bright text-charcoal">
      <PageHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Products" }]}
        eyebrow="PRODUCTS"
        title="The full range."
        intro="Five series, one shared 86 mm module. Select a series to view its sub-series and specifications."
      />
      <div className="grid grid-cols-1 gap-10 px-6 py-[8vh] sm:grid-cols-2 md:grid-cols-3 md:px-[4.5vw]">
        {series.map((s) => (
          <ProductCard
            key={s.slug}
            href={`/products/${s.slug}`}
            eyebrow={`${s.subSeries.length} SUB-SERIES`}
            name={s.name}
            description={s.tagline}
            image={s.image}
          />
        ))}
      </div>
    </main>
  );
}
