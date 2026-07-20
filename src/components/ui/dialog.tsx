"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
};

export function Dialog({ open, onClose, title, ariaLabel, children, className }: DialogProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-(--z-modal) flex items-center justify-center p-4">
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Закрыть"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "dialog-title" : undefined}
            aria-label={!title ? ariaLabel : undefined}
            data-lenis-prevent
            className={cn(
              "relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-(--surface-0) p-6 shadow-(--shadow-lg)",
              className,
            )}
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }
            }
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={cn(
                "flex items-start justify-between gap-4",
                title ? "mb-4" : "absolute right-4 top-4 z-10",
              )}
            >
              {title && (
                <h2 id="dialog-title" className="font-display text-xl text-(--text-primary)">
                  {title}
                </h2>
              )}
              <button
                type="button"
                onClick={onClose}
                className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-(--surface-2)"
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
