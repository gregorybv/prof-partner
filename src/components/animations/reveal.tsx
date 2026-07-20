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
  variant?: "fade" | "blur" | "scale" | "mask" | "tilt";
  amount?: number;
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
  variant = "fade",
  amount = 0.15,
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
    rotate: 0,
    scale: 1,
  };

  if (blur || variant === "blur") {
    hidden.filter = "blur(8px)";
    visible.filter = "blur(0px)";
  }

  if (scale || variant === "scale") {
    hidden.scale = 0.965;
  }

  if (variant === "mask") {
    hidden.clipPath = "inset(0% 0% 100% 0% round 16px)";
    hidden.y = 24;
    visible.clipPath = "inset(0% 0% 0% 0% round 0px)";
  }

  if (variant === "tilt") {
    hidden.rotate = direction === "left" ? 1.5 : -1.5;
    hidden.scale = 0.975;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, amount, margin: "0px 0px 10% 0px" }}
      transition={{
        duration: variant === "mask" ? 0.8 : 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
