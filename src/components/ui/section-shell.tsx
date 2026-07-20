import { cn } from "@/lib/utils";
import {
  SectionBackground,
  type SectionBackgroundProps,
} from "./section-background";
import { SiteContainer } from "./site-container";

type SectionShellProps = React.ComponentProps<"section"> & {
  id?: string;
  containerClassName?: string;
  wide?: boolean;
  muted?: boolean;
  background?: SectionBackgroundProps;
  atmosphere?: "none" | "calm" | "tech" | "warm";
};

export function SectionShell({
  id,
  className,
  containerClassName,
  wide,
  muted,
  background,
  atmosphere = "none",
  children,
  ...props
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-(--space-section-y)",
        muted && !background && "bg-(--surface-2)",
        className,
      )}
      {...props}
    >
      {background && <SectionBackground {...background} />}
      {atmosphere !== "none" && (
        <div
          className={`section-atmosphere section-atmosphere--${atmosphere}`}
          aria-hidden
        >
          <span className="section-atmosphere__orb section-atmosphere__orb--primary" />
          <span className="section-atmosphere__orb section-atmosphere__orb--secondary" />
          <span className="section-atmosphere__grid" />
        </div>
      )}
      <SiteContainer wide={wide} className={cn("relative", containerClassName)}>
        {children}
      </SiteContainer>
    </section>
  );
}
