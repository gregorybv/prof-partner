"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    mass: 0.25,
  });

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 right-0 z-[calc(var(--z-header)+1)] h-0.5 bg-transparent"
      aria-hidden
    >
      <motion.div
        className="h-full origin-left bg-linear-to-r from-(--cta-700) via-(--cta-300) to-(--cta-500)"
        style={{ scaleX: prefersReducedMotion ? scrollYProgress : scaleX }}
      />
    </div>
  );
}
