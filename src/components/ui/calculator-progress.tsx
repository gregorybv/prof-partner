"use client";

import { cn } from "@/lib/utils";

const STEPS = ["Опрашиваем банки", "Сортируем по цене", "Готово"] as const;

type CalculatorProgressProps = {
  active?: boolean;
  step?: number;
  className?: string;
};

export function CalculatorProgress({
  active = false,
  step = 1,
  className,
}: CalculatorProgressProps) {
  if (!active) return null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-(--border-subtle) bg-(--surface-0) px-6 py-5 shadow-(--shadow-xs)",
        className,
      )}
      aria-live="polite"
    >
      <ul className="flex items-center justify-between gap-4">
        {STEPS.map((label, index) => {
          const stepNumber = index + 1;
          const isDone = stepNumber < step;
          const isActive = stepNumber === step;

          return (
            <li
              key={label}
              className={cn(
                "relative flex-1 text-center text-xs font-medium uppercase tracking-wide",
                isDone && "text-(--success)",
                isActive && "text-(--cta-700)",
                !isDone && !isActive && "text-(--text-muted)",
              )}
            >
              <span
                className={cn(
                  "mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold",
                  isDone && "border-(--success) bg-(--success) text-white",
                  isActive && "cta-surface-static border-transparent",
                  !isDone && !isActive && "border-(--border-default) bg-(--surface-2)",
                )}
              >
                {stepNumber}
              </span>
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
