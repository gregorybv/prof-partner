"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { FormErrorHint } from "@/components/ui/form-error-hint";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, checked, defaultChecked, onChange, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;
    const isControlled = checked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(
      () => defaultChecked ?? false,
    );
    const resolvedChecked = isControlled ? !!checked : uncontrolledChecked;

    const errorId = error ? `${checkboxId}-error` : undefined;

    return (
      <div className="relative w-full">
        <label
          htmlFor={checkboxId}
          className={cn(
            "flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-(--text-secondary)",
            className,
          )}
        >
          <span
            className={cn(
              "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
              resolvedChecked
                ? "border-(--cta-700) bg-cta-gradient shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                : error
                  ? "border-(--error) bg-(--surface-0)"
                  : "border-(--border-strong) bg-(--surface-0)",
            )}
          >
            {resolvedChecked && <Check className="h-3 w-3 text-white" />}
          </span>
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            className="sr-only"
            aria-invalid={!!error}
            aria-describedby={errorId}
            {...props}
            {...(isControlled
              ? { checked: resolvedChecked }
              : { defaultChecked: defaultChecked ?? false })}
            onChange={(e) => {
              if (!isControlled) {
                setUncontrolledChecked(e.target.checked);
              }
              onChange?.(e);
            }}
          />
          <span>{label}</span>
        </label>
        <FormErrorHint id={errorId} message={error} />
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
