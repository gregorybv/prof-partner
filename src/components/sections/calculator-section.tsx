"use client";

import { type CSSProperties } from "react";
import { Reveal } from "@/components/animations/reveal";
import { CalculatorForm } from "@/components/forms/calculator-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function CalculatorSection() {
  return (
    <SectionShell
      id="kalkulyator"
      atmosphere="tech"
      className="overflow-hidden pt-0"
      style={
        {
          "--calc-parallax-x": "0px",
          "--calc-parallax-y": "0px",
        } as CSSProperties
      }
    >
      <div
        className="calculator-parallax-bg pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 opacity-85"
        aria-hidden
      >
        <div className="calculator-parallax-bg__image absolute inset-0 bg-[url('/prof-p/background-formalization.png')] bg-cover bg-center" />
        <div className="calculator-parallax-bg__veil absolute inset-0 bg-linear-to-b from-(--surface-0)/88 via-(--surface-0)/76 to-(--surface-0)/92" />
        <div className="calculator-parallax-bg__veil calculator-parallax-bg__veil--side absolute inset-0 bg-linear-to-r from-(--surface-0)/72 via-transparent to-(--surface-0)/72" />
        <div className="calculator-parallax-bg__flare absolute -left-12 top-10 h-44 w-44 rounded-full bg-(--accent-500)/16 blur-3xl" />
        <div className="calculator-parallax-bg__flare calculator-parallax-bg__flare--secondary absolute right-0 bottom-10 h-52 w-52 rounded-full bg-(--cta-500)/14 blur-3xl" />
      </div>
      <div className="flex flex-col gap-8 md:gap-10">
        <Reveal>
          <div className="relative">
            <SectionHeading
              title="Онлайн-калькулятор Независимой Банковской Гарантии"
              subtitle="СРАВНИТЕ ТАРИФЫ ПО 54 БАНКАМ"
            />
            <div className="mx-auto mt-4 h-px w-full max-w-4xl bg-linear-to-r from-transparent via-(--accent-500)/45 to-transparent" />
          </div>
        </Reveal>
        <Reveal delay={0.1} variant="scale">
          <CalculatorForm />
        </Reveal>
      </div>
    </SectionShell>
  );
}
