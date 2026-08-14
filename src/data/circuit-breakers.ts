import type { CircuitBreakerCategory } from "./types";

/**
 * Circuit Breaker — distributed third-party brands sold alongside AULMO's
 * own switch/socket manufacturing, not part of that hierarchy (see
 * product-hierarchy.json). Category structure only — brands, breakers/specs,
 * brand logos and nav icons all live in circuit-breaker-catalog.json (see
 * src/lib/circuit-breakers.ts, which merges the two), so that content can be
 * hand-edited without touching this file.
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
