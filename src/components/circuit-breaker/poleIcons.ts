import type { CircuitBreakerPole } from "@/data/types";

export const POLE_ICONS: Record<CircuitBreakerPole, string> = {
  SP: "/images/products/circuit-breaker/Pole icons/SP/sp-icon.png",
  DP: "/images/products/circuit-breaker/Pole icons/DP/dp-icon.png",
  TP: "/images/products/circuit-breaker/Pole icons/TP/tp-icon.png",
};

export const CATEGORY_POLES: Record<string, CircuitBreakerPole> = {
  mcb: "SP",
  // MCCB is a real 3-pole-only device — TP is its actual configuration, not
  // an arbitrary stand-in, even though the category has no pole selector.
  mccb: "TP",
  "magnetic-contactor": "TP",
};
