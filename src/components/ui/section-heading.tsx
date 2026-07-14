import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[var(--tracking-wider)] text-[var(--accent-500)]">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display max-w-4xl text-balance text-[clamp(1.65rem,3.6vw,3rem)] leading-[1.1] font-extrabold uppercase tracking-[0.015em] text-[var(--brand-900)]">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-balance text-[var(--text-lg)] leading-[var(--leading-snug)] text-[var(--text-secondary)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
