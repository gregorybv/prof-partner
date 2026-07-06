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
      <h2 className="font-display max-w-3xl text-balance text-[var(--text-4xl)] leading-[var(--leading-tight)] text-[var(--text-primary)] md:text-[var(--text-5xl)]">
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
