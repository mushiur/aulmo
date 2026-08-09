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
        <div className="mt-5 rounded-[16px] border border-charcoal/10 bg-bone-deep/60 p-4">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="font-mono-label text-[9px] font-semibold tracking-[0.18em] opacity-45">FINISH</span>
            <span className="h-px w-9 bg-charcoal/20" />
          </div>
          <div className="mb-3.5 text-base font-extrabold tracking-[-0.01em] uppercase [font-stretch:114%]">
            {activeVariant.name}
          </div>
          <FinishSelector variants={variants} activeIndex={variantIndex} onSelect={selectVariant} />
        </div>
      )}
    </div>
  );
}
