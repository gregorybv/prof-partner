import * as React from "react";
import { FormErrorHint } from "@/components/ui/form-error-hint";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="w-full">
        <div className="relative">
          <input
            type={type}
            id={inputId}
            className={cn(
              "peer h-12 w-full rounded-xl border border-(--border-default) bg-(--surface-0) px-4 pt-5 pb-1 text-sm text-(--text-primary) shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] transition-[border-color,box-shadow,background-color] duration-(--duration-base)",
              "placeholder-transparent hover:border-(--border-strong) focus:border-(--accent-500) focus:bg-white focus:outline-none focus:ring-2 focus:ring-(--accent-500)/20 focus:shadow-[0_8px_24px_rgba(59,111,212,0.08)]",
              error && "border-(--error) focus:border-(--error) focus:ring-(--error)/20",
              className,
            )}
            placeholder={label ?? " "}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-(--text-muted) transition-all",
                "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-(--accent-500)",
                "peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs",
              )}
            >
              {label}
            </label>
          )}
          <FormErrorHint id={`${inputId}-error`} message={error} />
        </div>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
