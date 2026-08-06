"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const EASE_SIGNATURE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Fades/lifts between routes on client-side navigation. `initial={false}`
 * skips animating the very first page — that moment is already owned by
 * the Loader's own reveal, so this only kicks in on subsequent navigations.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: EASE_SIGNATURE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
