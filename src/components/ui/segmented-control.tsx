"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  name?: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  name,
}: SegmentedControlProps<T>) {
  const prefersReducedMotion = useReducedMotion();
  const generatedName = useId();
  const controlName = name ?? generatedName;

  return (
    <div
      className={cn(
        "inline-flex rounded-xl border border-(--border-default) bg-(--surface-2) p-1",
        className,
      )}
      role="tablist"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          name={controlName}
          onClick={() => onChange(option.value)}
          className={cn(
            "relative rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-(--duration-base)",
            value === option.value
              ? "text-(--text-primary)"
              : "text-(--text-muted) hover:text-(--text-secondary)",
          )}
        >
          {value === option.value && (
            <motion.span
              layoutId={`segmented-active-${controlName}`}
              className="absolute inset-0 rounded-lg bg-(--surface-0) shadow-(--shadow-xs)"
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 420, damping: 34 }
              }
              aria-hidden
            />
          )}
          <span className="relative z-10">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
