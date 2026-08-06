"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const EASE_SIGNATURE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Fades between routes on client-side navigation. `initial={false}` skips
 * animating the very first page — that moment is already owned by the
 * Loader's own reveal, so this only kicks in on subsequent navigations.
 *
 * Opacity-only on purpose: an earlier version also animated a `y` offset,
 * but Framer Motion leaves the resting `transform: translateY(0px)` style
 * applied after the animation settles, which keeps this wrapper (and every
 * page's content inside it) GPU-layer-promoted indefinitely. On displays
 * with non-100% OS scaling that showed up as persistently soft/blurry text
 * site-wide, not just during the transition. Dropping the `y` transform
 * avoids the lingering layer promotion entirely.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE_SIGNATURE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
