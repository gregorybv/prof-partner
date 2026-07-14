"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useModals } from "@/components/modals/modal-provider";
import {
  parseBankTableButton,
  type CalcResultContext,
} from "@/lib/legacy-table";

type LegacyResultsTableProps = {
  html: string;
  masked?: boolean;
  source: "calculator" | "auto";
  context: CalcResultContext;
  className?: string;
};

export function LegacyResultsTable({
  html,
  masked = false,
  source,
  context,
  className,
}: LegacyResultsTableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openBankRequest } = useModals();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const data = parseBankTableButton(target, context, source);
      if (data) {
        event.preventDefault();
        openBankRequest(data);
      }
    };

    container.addEventListener("click", onClick);
    return () => container.removeEventListener("click", onClick);
  }, [context, openBankRequest, source, html]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "calc-results overflow-x-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-0)] shadow-[var(--shadow-sm)]",
        masked && "is-masked",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
