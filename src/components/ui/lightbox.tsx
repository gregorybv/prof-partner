"use client";

import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

type LightboxProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: string;
};

export function Lightbox({ open, onClose, src, alt, caption }: LightboxProps) {
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
            className="relative z-10 max-h-[90vh] max-w-5xl overflow-auto rounded-2xl bg-[var(--surface-0)] p-2 shadow-[var(--shadow-lg)]"
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
            <div className="relative">
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={1600}
                className="h-auto max-h-[80vh] w-auto rounded-xl object-contain"
                sizes="(max-width: 1280px) 90vw, 1200px"
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
  className?: string;
};

export function CertificateCard({
  bank,
  thumb,
  onOpen,
  className,
}: CertificateCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-0)] text-left shadow-[var(--shadow-xs)] transition-all duration-[var(--duration-base)]",
        "hover:-translate-y-1 hover:border-[var(--accent-500)]/30 hover:shadow-[var(--shadow-card)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-2)]">
        <Image
          src={thumb}
          alt={bank}
          fill
          className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 200px"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/20 group-hover:opacity-100">
          <ZoomIn className="h-8 w-8 text-white drop-shadow" />
        </div>
      </div>
      <div className="border-t border-[var(--border-subtle)] bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-700)] px-3 py-2">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-white">
          {bank}
        </p>
      </div>
    </button>
  );
}
