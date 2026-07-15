"use client";

import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-white border-t-transparent",
        className,
      )}
      aria-hidden
    />
  );
}

type LightboxProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: string;
};

export function Lightbox({ open, onClose, src, alt, caption }: LightboxProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const imageLoaded = open && loadedSrc === src;

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
        <motion.div
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={caption ?? alt}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Закрыть"
          />
          <motion.div
            className="relative z-10 w-fit max-w-[min(90vw,100%)] overflow-hidden rounded-2xl bg-[var(--surface-0)] p-2 shadow-[var(--shadow-lg)]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              aria-label="Закрыть"
            >
              <X className="h-4 w-4" />
            </button>
            <div
              className={cn(
                "relative",
                !imageLoaded && "flex h-40 w-32 items-center justify-center",
              )}
            >
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <LoadingSpinner className="h-10 w-10 border-[var(--brand-600)] border-t-transparent" />
                </div>
              )}
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={1600}
                className={cn(
                  "block h-auto max-h-[85vh] w-auto max-w-[85vw] rounded-xl object-contain transition-opacity duration-200",
                  imageLoaded ? "opacity-100" : "opacity-0",
                )}
                sizes="(max-width: 1280px) 90vw, 1200px"
                onLoad={() => setLoadedSrc(src)}
              />
            </div>
            {caption && (
              <p className="px-4 py-3 text-center text-sm font-medium text-[var(--text-secondary)]">
                {caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type CertificateCardProps = {
  bank: string;
  thumb: string;
  full: string;
  onOpen: () => void;
  loading?: boolean;
  className?: string;
};

export function CertificateCard({
  bank,
  thumb,
  onOpen,
  loading = false,
  className,
}: CertificateCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={loading}
      aria-busy={loading}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-0)] text-left shadow-[var(--shadow-xs)] transition-all duration-[var(--duration-base)]",
        "hover:-translate-y-1 hover:border-[var(--accent-500)]/30 hover:shadow-[var(--shadow-card)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        "disabled:pointer-events-none disabled:opacity-90",
        className,
      )}
    >
      <div className="relative aspect-[3/4] w-full shrink-0 bg-[var(--surface-2)]">
        <div className="absolute inset-2">
          <Image
            src={thumb}
            alt={bank}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, 200px"
          />
        </div>
        {loading ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
            <LoadingSpinner className="h-8 w-8" />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/20 group-hover:opacity-100">
            <ZoomIn className="h-8 w-8 text-white drop-shadow" />
          </div>
        )}
      </div>
      <div className="flex min-h-10 shrink-0 items-center justify-center border-t border-[var(--border-subtle)] bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-700)] px-2 py-2">
        <p className="line-clamp-2 text-center text-[10px] font-semibold uppercase leading-tight tracking-wide text-white sm:text-xs">
          {bank}
        </p>
      </div>
    </button>
  );
}
