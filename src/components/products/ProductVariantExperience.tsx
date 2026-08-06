"use client";

import { useMemo, useState } from "react";
import ProductGallery from "@/components/products/ProductGallery";
import FinishSelector from "@/components/products/FinishSelector";
import type { ProductVariant } from "@/data/types";

export default function ProductVariantExperience({ variants }: { variants: ProductVariant[] }) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const activeVariant = variants[variantIndex];
  const images = useMemo(
    () => [activeVariant.hero, ...(activeVariant.gallery ?? [])],
    [activeVariant],
  );

  const selectVariant = (index: number) => {
    setVariantIndex(index);
    setImageIndex(0);
  };

  return (
    <div>
      <ProductGallery images={images} activeIndex={imageIndex} onSelect={setImageIndex} priority />
      {variants.length > 1 && (
        <div className="mt-6 border-t border-charcoal/14 pt-5">
          <div className="mb-3 font-mono-label text-[9px] tracking-[0.18em] opacity-45">
            FINISH — {activeVariant.name.toUpperCase()}
          </div>
          <FinishSelector variants={variants} activeIndex={variantIndex} onSelect={selectVariant} />
        </div>
      )}
    </div>
  );
}
