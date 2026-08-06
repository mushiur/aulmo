"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PremiumLoader from "@/components/ui/PremiumLoader";
import ProductLoader from "@/components/ui/ProductLoader";

/**
 * The homepage gets the full branded reveal (PremiumLoader). Product pages
 * get a lighter, faster "Loading" spinner (ProductLoader) — the elaborate
 * showroom reveal doesn't fit a quick product lookup.
 *
 * `Loader` lives in the root layout, which persists across client-side
 * navigations — it never remounts on its own. Which variant to show is
 * decided once, from the route the page actually loaded on, and locked in
 * via the lazy `useState` initializer so it doesn't flip (and re-trigger)
 * every time the pathname changes on a later in-app navigation.
 */
export default function Loader() {
  const pathname = usePathname();
  const [isProductRoute] = useState(() => pathname?.startsWith("/products") ?? false);

  // Browsers restore the previous scroll position on a hard reload by
  // default, which reads as broken on a site with a full-screen intro
  // loader — force it back to the top while the loader still covers the
  // viewport, and stop the browser from fighting that on future reloads.
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return isProductRoute ? <ProductLoader /> : <PremiumLoader />;
}
