import { cn } from "@/lib/utils";

type FormErrorHintProps = {
  id?: string;
  message?: string;
  className?: string;
};

export function FormErrorHint({ id, message, className }: FormErrorHintProps) {
  if (!message) return null;

  return (
    <div
      id={id}
      role="alert"
      className={cn(
        "pointer-events-none absolute top-full left-0 z-30 mt-1.5 max-w-[min(100%,20rem)]",
        className,
      )}
    >
      <div className="error-hint-surface relative rounded-lg px-2.5 py-1.5 text-xs leading-snug font-medium text-white">
        <span className="error-hint-arrow absolute -top-1 left-4 h-2 w-2 rotate-45" aria-hidden />
        {message}
      </div>
    </div>
  );
}
