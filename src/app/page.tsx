import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ProductGallery from "@/components/home/ProductGallery";
import InteriorGallery from "@/components/home/InteriorGallery";
import InteractiveProductView from "@/components/home/InteractiveProductView";
import FashionEditorial from "@/components/home/FashionEditorial";
import BrandBand from "@/components/home/BrandBand";
import HomeClosingCta from "@/components/home/HomeClosingCta";
import { getHeroStats } from "@/lib/content";
import { getProductHierarchy } from "@/lib/products";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AULMO Bangladesh — Luxury Switches & Sockets",
  description:
    "AULMO switches and sockets in Bangladesh — luxury architectural hardware built to a single 86mm module, in glass, wood, antique bronze and high-gloss finishes. Showroom in Dhaka.",
  alternates: { canonical: SITE_URL },
};

export default async function Home() {
  const [series, heroStats] = await Promise.all([getProductHierarchy(), getHeroStats()]);

  const dSeries = series.find((s) => s.slug === "d-series");

  return (
    <main className="relative w-full overflow-x-hidden bg-ink">
      <Hero stats={heroStats} />
      <ProductGallery series={series} />
      <InteriorGallery />
      {dSeries && <InteractiveProductView series={dSeries} />}
      <FashionEditorial />
      <BrandBand />
      <HomeClosingCta />
    </main>
  );
}
