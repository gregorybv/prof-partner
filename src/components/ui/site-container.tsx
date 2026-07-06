import { cn } from "@/lib/utils";

type SiteContainerProps = React.ComponentProps<"div"> & {
  wide?: boolean;
};

export function SiteContainer({
  className,
  wide = false,
  ...props
}: SiteContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--space-container-x)]",
        wide ? "max-w-[var(--container-wide)]" : "max-w-[var(--container-max)]",
        className,
      )}
      {...props}
    />
  );
}
