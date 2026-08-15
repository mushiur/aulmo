"use client";

import { useState } from "react";
import Image from "next/image";
//import MagneticLink from "@/components/ui/MagneticLink";
import Lightbox from "@/components/ui/Lightbox";
import { ExpandIcon } from "@/components/ui/Icon";
import type { CircuitBreakerProduct } from "@/data/types";

export default function CircuitBreakerCard({
  product,
  brandName,
  categoryName,
}: {
  product: CircuitBreakerProduct;
  brandName: string;
  categoryName: string;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="group flex flex-row overflow-hidden rounded-[16px] border border-charcoal/12 bg-paper-bright transition-colors duration-300 hover:border-charcoal/30 sm:flex-col">
      <button
        type="button"
        aria-label={`View larger image of ${product.name}`}
        onClick={() => setLightboxOpen(true)}
        className="relative aspect-square w-40 flex-none bg-white sm:w-full"
      >
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 160px"
          className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105 sm:p-4"
        />
        <span className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink/55 text-paper backdrop-blur-sm transition-colors group-hover:bg-ink/75">
          <ExpandIcon className="h-3.5 w-3.5" />
        </span>
      </button>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <div className="font-mono-label text-[9px] tracking-[0.16em] text-signal-red">{brandName}</div>
        <div className="mt-1 text-[14px] font-bold tracking-[-0.01em] sm:text-[15px]">{product.name}</div>
        {product.model && (
          <div>
            <dd className="m-0 font-bold ">Model: {product.model}</dd>
          </div>
        )}
        <div className="mt-0.5 text-[11px] opacity-55 sm:text-[11.5px]">
          {categoryName}
          {product.pole && ` — ${product.pole}`}
        </div>
        <dl className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1.5 border-t border-charcoal/10 pt-2.5 text-[11px] sm:mt-3 sm:pt-3">
          <div>
            <dt className="opacity-45">Current</dt>
            <dd className="m-0 font-semibold">{product.ratedCurrent}</dd>
          </div>
          {product.breakingCapacity && (
            <div>
              <dt className="opacity-45">Breaking</dt>
              <dd className="m-0 font-semibold">{product.breakingCapacity}</dd>
            </div>
          )}
          <div>
            <dt className="opacity-45">Voltage</dt>
            <dd className="m-0 font-semibold">{product.voltage}</dd>
          </div>
          {product.curveType && (
            <div>
              <dt className="opacity-45">Curve</dt>
              <dd className="m-0 font-semibold">{product.curveType}</dd>
            </div>
          )}
          
          {product.madeIn && (
            <div>
              <dt className="opacity-45">Made In</dt>
              <dd className="m-0 font-semibold">{product.madeIn}</dd>
            </div>
          )}
        </dl>
        {/* <MagneticLink
          href="/contact"
          arrow
          className="mt-3 inline-flex items-center gap-2 font-mono-label text-[10px] font-bold tracking-[0.16em] text-charcoal uppercase transition-colors duration-300 group-hover:text-signal-red sm:mt-4"
        >
          View Details
        </MagneticLink> */}
      </div>

      {lightboxOpen && (
        <Lightbox
          count={1}
          activeIndex={0}
          onNext={() => {}}
          onPrev={() => {}}
          onClose={() => setLightboxOpen(false)}
          caption={product.name}
        >
          <div
            className="relative h-[80vh] w-full max-w-[900px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={product.image.src} alt={product.image.alt} fill sizes="90vw" className="object-contain" />
          </div>
        </Lightbox>
      )}
    </div>
  );
}
