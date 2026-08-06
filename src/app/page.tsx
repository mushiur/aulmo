import Hero from "@/components/home/Hero";
import ProductGallery from "@/components/home/ProductGallery";
import InteriorGallery from "@/components/home/InteriorGallery";
import InteractiveProductView from "@/components/home/InteractiveProductView";
import FashionEditorial from "@/components/home/FashionEditorial";
import HomeClosingCta from "@/components/home/HomeClosingCta";
import { getHeroStats } from "@/lib/content";
import { getProductHierarchy } from "@/lib/products";

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
      <HomeClosingCta />
    </main>
  );
}
