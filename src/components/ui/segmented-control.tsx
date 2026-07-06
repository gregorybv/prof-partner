"use client";

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
  name = "segmented",
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] p-1",
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
          name={name}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-[var(--duration-base)]",
            value === option.value
              ? "bg-[var(--surface-0)] text-[var(--text-primary)] shadow-[var(--shadow-xs)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
