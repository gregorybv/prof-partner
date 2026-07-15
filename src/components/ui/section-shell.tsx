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
};

export function SectionShell({
  id,
  className,
  containerClassName,
  wide,
  muted,
  background,
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
      <SiteContainer wide={wide} className={cn("relative", containerClassName)}>
        {children}
      </SiteContainer>
    </section>
  );
}
