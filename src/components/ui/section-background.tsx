import Image from "next/image";
import { cn } from "@/lib/utils";

export type SectionBackgroundOverlay = "none" | "light" | "blue" | "medium" | "brand";

export type SectionBackgroundProps = {
  src: string;
  overlay?: SectionBackgroundOverlay;
  position?: "center" | "bottom";
  size?: "cover" | "contain";
  sizes?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

const OVERLAY_CLASSES: Record<Exclude<SectionBackgroundOverlay, "none">, string> = {
  light: "bg-white/80",
  blue: "bg-[rgba(223,231,242,0.7)]",
  medium: "bg-white/65",
  brand:
    "bg-gradient-to-br from-[var(--brand-700)]/90 via-[var(--brand-800)]/85 to-[var(--brand-900)]/92",
};

export function SectionBackground({
  src,
  overlay = "light",
  position = "center",
  size = "cover",
  sizes = "100vw",
  className,
  imageClassName,
  priority,
}: SectionBackgroundProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          size === "cover" ? "object-cover" : "object-contain",
          position === "bottom" ? "object-bottom" : "object-center",
          imageClassName,
        )}
      />
      {overlay !== "none" && (
        <div className={cn("absolute inset-0", OVERLAY_CLASSES[overlay])} />
      )}
    </div>
  );
}
