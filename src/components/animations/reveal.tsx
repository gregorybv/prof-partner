"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "motion/react";
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
  up: { y: 16 },
  down: { y: -16 },
  left: { x: 16 },
  right: { x: -16 },
  none: {},
} as const;

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  blur = false,
  scale = false,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const hidden: TargetAndTransition = {
    opacity: 0,
    ...directionOffset[direction],
  };
  const visible: TargetAndTransition = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  if (blur) {
    hidden.filter = "blur(8px)";
    visible.filter = "blur(0px)";
  }

  if (scale) {
    hidden.scale = 0.98;
    visible.scale = 1;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px 12% 0px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
