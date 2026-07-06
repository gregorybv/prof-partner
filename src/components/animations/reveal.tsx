"use client";

import { motion, useReducedMotion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  blur?: boolean;
  scale?: boolean;
};

const directionOffset = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 32 },
  right: { x: -32 },
  none: {},
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  blur = false,
  scale = false,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
        filter: blur ? "blur(8px)" : "blur(0px)",
        scale: scale ? 0.96 : 1,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
              scale: 1,
            }
          : undefined
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
