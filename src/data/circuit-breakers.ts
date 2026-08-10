import type { CircuitBreakerBrand, CircuitBreakerCategory, CircuitBreakerProduct } from "./types";

/**
 * Circuit Breaker — distributed third-party brands sold alongside AULMO's
 * own switch/socket manufacturing, not part of that hierarchy (see
 * product-hierarchy.ts). Every product entry below is structured mock data
 * standing in for a real catalog import — ratings use common
 * industry-standard values (16A, C-curve, 6kA, 230/400V) as illustrative
 * placeholders, not verified specifications for a specific in-stock SKU.
 * Replace with real catalog data before this section goes live with actual
 * inventory and photography.
 */

export const circuitBreakerCategories: CircuitBreakerCategory[] = [
  {
    slug: "mcb",
    name: "MCB",
    fullName: "Miniature Circuit Breaker",
    description: "Overload and short-circuit protection for residential and light commercial circuits.",
    hasPoles: true,
    image: {
      src: "/images/products/circuit-breaker/mcb/mcb-sp-placeholder.png",
      alt: "MCB — Miniature Circuit Breaker",
    },
  },
  {
    slug: "mccb",
    name: "MCCB",
    fullName: "Molded Case Circuit Breaker",
    description: "Higher-current protection for distribution boards and industrial feeders.",
    hasPoles: true,
    image: {
      src: "/images/products/circuit-breaker/mccb/mccb-sp-placeholder.png",
      alt: "MCCB — Molded Case Circuit Breaker",
    },
  },
  {
    slug: "magnetic-contactor",
    name: "Magnetic Contactor",
    fullName: "Industrial Control & Switching",
    description: "Remote switching for motors, lighting banks and industrial control circuits.",
    hasPoles: false,
    image: {
      src: "/images/products/circuit-breaker/magnetic-contactor/magnetic-contactor-placeholder.png",
      alt: "Magnetic Contactor — Industrial Control & Switching",
    },
  },
];

export const circuitBreakerBrands: CircuitBreakerBrand[] = [
  { slug: "schneider-electric", name: "Schneider Electric" },
  { slug: "abb", name: "ABB" },
  { slug: "legrand", name: "Legrand" },
  { slug: "hyundai", name: "Hyundai" },
  { slug: "chint", name: "CHINT" },
  { slug: "cnc-breaker", name: "CNC Breaker" },
  { slug: "cns-circuit-breaker", name: "CNS Circuit Breaker" },
];

const mcbImage = (pole: "sp" | "dp" | "tp") => ({
  src: `/images/products/circuit-breaker/mcb/mcb-${pole}-placeholder.png`,
  alt: `MCB, ${pole.toUpperCase()}`,
});

const mccbImage = (pole: "sp" | "dp" | "tp") => ({
  src: `/images/products/circuit-breaker/mccb/mccb-${pole}-placeholder.png`,
  alt: `MCCB, ${pole.toUpperCase()}`,
});

const contactorImage = {
  src: "/images/products/circuit-breaker/magnetic-contactor/magnetic-contactor-placeholder.png",
  alt: "Magnetic Contactor",
};

const MCB_LINES: { brandSlug: string; series: string }[] = [
  { brandSlug: "schneider-electric", series: "Acti9 iC60N" },
  { brandSlug: "abb", series: "S200" },
  { brandSlug: "legrand", series: "DX³" },
  { brandSlug: "hyundai", series: "HGD63N" },
];

const MCCB_LINES: { brandSlug: string; series: string }[] = [
  { brandSlug: "schneider-electric", series: "EasyPact EZC" },
  { brandSlug: "abb", series: "Tmax XT" },
  { brandSlug: "chint", series: "NM8" },
];

const CONTACTOR_LINES: { brandSlug: string; series: string; ratedCurrent: string }[] = [
  { brandSlug: "schneider-electric", series: "TeSys D", ratedCurrent: "9A" },
  { brandSlug: "abb", series: "AF Series", ratedCurrent: "12A" },
  { brandSlug: "chint", series: "NC1", ratedCurrent: "9A" },
  { brandSlug: "legrand", series: "CTX³", ratedCurrent: "11A" },
];

const POLE_RATINGS: Record<"SP" | "DP" | "TP", { ratedCurrent: string; breakingCapacity: string }> = {
  SP: { ratedCurrent: "16A", breakingCapacity: "6kA" },
  DP: { ratedCurrent: "32A", breakingCapacity: "6kA" },
  TP: { ratedCurrent: "63A", breakingCapacity: "10kA" },
};

const MCCB_POLE_RATINGS: Record<"SP" | "DP" | "TP", { ratedCurrent: string; breakingCapacity: string }> = {
  SP: { ratedCurrent: "100A", breakingCapacity: "25kA" },
  DP: { ratedCurrent: "160A", breakingCapacity: "25kA" },
  TP: { ratedCurrent: "250A", breakingCapacity: "36kA" },
};

function buildMcbProducts(): CircuitBreakerProduct[] {
  const poles: Array<"SP" | "DP" | "TP"> = ["SP", "DP", "TP"];
  return MCB_LINES.flatMap(({ brandSlug, series }) =>
    poles.map((pole) => {
      const { ratedCurrent, breakingCapacity } = POLE_RATINGS[pole];
      return {
        id: `mcb-${brandSlug}-${pole.toLowerCase()}`,
        categorySlug: "mcb",
        brandSlug,
        pole,
        name: series,
        series,
        ratedCurrent,
        curveType: "C Curve",
        breakingCapacity,
        voltage: "230/400V",
        image: mcbImage(pole.toLowerCase() as "sp" | "dp" | "tp"),
      };
    }),
  );
}

function buildMccbProducts(): CircuitBreakerProduct[] {
  const poles: Array<"SP" | "DP" | "TP"> = ["SP", "DP", "TP"];
  return MCCB_LINES.flatMap(({ brandSlug, series }) =>
    poles.map((pole) => {
      const { ratedCurrent, breakingCapacity } = MCCB_POLE_RATINGS[pole];
      return {
        id: `mccb-${brandSlug}-${pole.toLowerCase()}`,
        categorySlug: "mccb",
        brandSlug,
        pole,
        name: series,
        series,
        ratedCurrent,
        curveType: "Thermal-Magnetic",
        breakingCapacity,
        voltage: "415V",
        image: mccbImage(pole.toLowerCase() as "sp" | "dp" | "tp"),
      };
    }),
  );
}

function buildContactorProducts(): CircuitBreakerProduct[] {
  return CONTACTOR_LINES.map(({ brandSlug, series, ratedCurrent }) => ({
    id: `magnetic-contactor-${brandSlug}`,
    categorySlug: "magnetic-contactor",
    brandSlug,
    name: series,
    series,
    ratedCurrent,
    voltage: "230/400V coil",
    image: contactorImage,
  }));
}

export const circuitBreakerProducts: CircuitBreakerProduct[] = [
  ...buildMcbProducts(),
  ...buildMccbProducts(),
  ...buildContactorProducts(),
];
