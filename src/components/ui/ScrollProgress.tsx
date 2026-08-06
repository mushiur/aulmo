"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 z-[220] h-[2px] origin-left bg-gradient-to-r from-signal-red to-signal-yellow"
      aria-hidden="true"
    />
  );
}
