import { cn } from "@/lib/utils";
import { SiteContainer } from "./site-container";

type SectionShellProps = React.ComponentProps<"section"> & {
  id?: string;
  containerClassName?: string;
  wide?: boolean;
  muted?: boolean;
};

export function SectionShell({
  id,
  className,
  containerClassName,
  wide,
  muted,
  children,
  ...props
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-[var(--space-section-y)]",
        muted && "bg-[var(--surface-2)]",
        className,
      )}
      {...props}
    >
      <SiteContainer wide={wide} className={containerClassName}>
        {children}
      </SiteContainer>
    </section>
  );
}
