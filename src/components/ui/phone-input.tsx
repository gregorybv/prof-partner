"use client";

import * as React from "react";
import { useIMask } from "react-imask";
import { FormErrorHint } from "@/components/ui/form-error-hint";
import { cn } from "@/lib/utils";

export const PHONE_MASK = "+{7}(000)000-00-00";

const MASK_OPTS = { mask: PHONE_MASK };

export type PhoneInputProps = {
  label?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
};

function assignRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (!ref) return;
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  (ref as React.MutableRefObject<T>).current = value;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    { className, label, error, id, value = "", onChange, onBlur, disabled, name },
    forwardedRef,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const onAccept = React.useEffectEvent((maskedValue: string) => {
      onChange?.(maskedValue);
    });

    const { ref: maskRef, setValue: setMaskValue, value: maskValue } = useIMask(
      MASK_OPTS,
      {
        onAccept,
        defaultValue: value,
      },
    );

    React.useEffect(() => {
      if (value !== maskValue) {
        setMaskValue(value);
      }
    }, [value, maskValue, setMaskValue]);

    return (
      <div className="w-full">
        <div className="relative">
          <input
            type="tel"
            id={inputId}
            name={name}
            disabled={disabled}
            onBlur={onBlur}
            placeholder={label ?? " "}
            ref={(element) => {
              maskRef.current = element;
              assignRef(forwardedRef, element);
            }}
            className={cn(
              "peer h-12 w-full rounded-xl border border-(--border-default) bg-(--surface-0) px-4 pt-5 pb-1 text-sm text-(--text-primary) transition-colors",
              "placeholder-transparent focus:border-(--accent-500) focus:outline-none focus:ring-2 focus:ring-(--accent-500)/20",
              error && "border-(--error) focus:border-(--error) focus:ring-(--error)/20",
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
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
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
