import * as React from "react";
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
              "peer h-12 w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-0)] px-4 pt-5 pb-1 text-sm text-[var(--text-primary)] transition-colors",
              "placeholder-transparent focus:border-[var(--accent-500)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-500)]/20",
              error && "border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]/20",
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
                "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)] transition-all",
                "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-[var(--accent-500)]",
                "peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs",
              )}
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-xs text-[var(--error)]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
