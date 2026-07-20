"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import {
  PROCESS_FOOTNOTE,
  PROCESS_STEPS,
} from "@/lib/site-content";
import { cn } from "@/lib/utils";

const TIME_BLOCK_STYLES = [
  { bg: "#93b92a", color: "#ffffff", zIndex: 20 },
  { bg: "#5e800b", color: "#ffffff", zIndex: 19 },
  { bg: "#326c9b", color: "#ffffff", zIndex: 18 },
  { bg: "#255384", color: "#ffffff", zIndex: 17 },
  { bg: "#a1acc2", color: "#ffffff", zIndex: 16 },
  { bg: "#cedded", color: "#87a1c0", zIndex: 15 },
  { bg: "#f2f4f8", color: "#87a1c0", zIndex: 14 },
] as const;

/** Desktop coordinates copied from prof-p.ru */
const STEP_LAYOUT = [
  { columnOffset: 0, iconW: 52, iconH: 45, iconLeft: 8, iconTop: 7, titleIndent: 7 },
  { columnOffset: -2, iconW: 44, iconH: 44, iconLeft: 8, iconTop: 8, titleIndent: 0 },
  { columnOffset: -12, iconW: 44, iconH: 44, iconLeft: 8, iconTop: 10, titleIndent: 0 },
  { columnOffset: 13, iconW: 44, iconH: 50, iconLeft: 8, iconTop: 4, titleIndent: 0 },
  { columnOffset: 26, iconW: 44, iconH: 44, iconLeft: 8, iconTop: 10, titleIndent: 0 },
  { columnOffset: 20, iconW: 52, iconH: 52, iconLeft: 8, iconTop: 7, titleIndent: 0 },
  { columnOffset: 50, iconW: 44, iconH: 50, iconLeft: 8, iconTop: 4, titleIndent: 0 },
] as const;

type ProcessStepCardProps = {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
  position: "top" | "bottom";
  animated: boolean;
  inView: boolean;
  activeStep: number | null;
  onActivate: (step: number) => void;
};

function ProcessStepCard({
  step,
  index,
  position,
  animated,
  inView,
  activeStep,
  onActivate,
}: ProcessStepCardProps) {
  const isTop = position === "top";
  const delay = 0.35 + index * 0.12;
  const layout = STEP_LAYOUT[index];
  const isActive = activeStep === step.step;
  const hasActiveStep = activeStep !== null;
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const revealTransition = { duration: 0.55, delay, ease };
  const interactiveTransition = {
    type: "spring" as const,
    stiffness: 190,
    damping: 24,
    mass: 0.8,
  };

  return (
    <motion.div
      className={cn(
        "process-scheme__step group",
        isTop ? "process-scheme__step--top" : "process-scheme__step--bottom",
        isActive && "process-scheme__step--active",
        hasActiveStep && !isActive && "process-scheme__step--inactive",
      )}
      style={{ right: layout.columnOffset }}
      onMouseEnter={() => onActivate(step.step)}
      onFocus={() => onActivate(step.step)}
      initial={animated ? { opacity: 0, y: isTop ? -20 : 20 } : false}
      animate={
        animated && inView
          ? {
              opacity: hasActiveStep && !isActive ? 0.72 : 1,
              y: 0,
              scale: isActive ? 1.015 : 1,
            }
          : animated
            ? { opacity: 0, y: isTop ? -20 : 20 }
            : undefined
      }
      transition={hasActiveStep ? interactiveTransition : revealTransition}
    >
      <div className="process-scheme__step-head">
        <span className="process-scheme__step-number">
          {step.step}
          <span
            className="process-scheme__step-icon"
            style={{
              width: layout.iconW,
              height: layout.iconH,
              left: `calc(100% + ${layout.iconLeft}px)`,
              top: layout.iconTop,
              backgroundImage: `url("/prof-p/time-ico${step.step}.png")`,
            }}
            aria-hidden
          />
        </span>
      </div>
      <p
        className="process-scheme__step-title"
        style={layout.titleIndent ? { marginLeft: layout.titleIndent } : undefined}
      >
        {step.titleLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    </motion.div>
  );
}

type ProcessTimelineProps = {
  animated: boolean;
};

function ProcessTimeline({ animated }: ProcessTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div
      ref={ref}
      className={cn(
        "process-scheme relative pb-28",
        animated && "process-scheme--animated",
        inView && animated && "process-scheme--in-view",
      )}
      onMouseLeave={() => setActiveStep(null)}
    >
      <div className="process-scheme__timing">
        {PROCESS_STEPS.map((step, index) => {
          const style = TIME_BLOCK_STYLES[index];
          const isUp = index % 2 === 0;
          const delay = 0.15 + index * 0.1;
          const isActive = activeStep === step.step;
          const hasActiveStep = activeStep !== null;
          const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
          const revealTransition = { duration: 0.45, delay, ease };
          const interactiveTransition = {
            type: "spring" as const,
            stiffness: 200,
            damping: 24,
            mass: 0.8,
          };

          return (
            <motion.div
              key={`time-${step.step}`}
              className={cn(
                "process-scheme__time-block",
                isUp ? "process-scheme__time-block--up" : "process-scheme__time-block--down",
                isActive && "process-scheme__time-block--active",
                hasActiveStep && !isActive && "process-scheme__time-block--inactive",
              )}
              style={{
                backgroundColor: style.bg,
                color: style.color,
                zIndex: style.zIndex,
              }}
              onMouseEnter={() => setActiveStep(step.step)}
              initial={animated ? { opacity: 0, y: 12 } : false}
              animate={
                animated && inView
                  ? {
                      opacity: hasActiveStep && !isActive ? 0.62 : 1,
                      y: 0,
                      scale: isActive ? 1.015 : 1,
                    }
                  : animated
                    ? { opacity: 0, y: 12 }
                    : undefined
              }
              transition={hasActiveStep ? interactiveTransition : revealTransition}
            >
              {step.durationValue}
              <span>{step.durationUnit}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="process-scheme__steps">
        {PROCESS_STEPS.map((step, index) => (
          <ProcessStepCard
            key={`desc-${step.step}`}
            step={step}
            index={index}
            position={index % 2 === 0 ? "top" : "bottom"}
            animated={animated}
            inView={inView}
            activeStep={activeStep}
            onActivate={setActiveStep}
          />
        ))}
      </div>
    </div>
  );
}

function ProcessMobileCards() {
  return (
    <div className="flex flex-col gap-3">
      {PROCESS_STEPS.map((step, index) => {
        const style = TIME_BLOCK_STYLES[index];
        const layout = STEP_LAYOUT[index];

        return (
          <Reveal key={step.step} delay={index * 0.05}>
            <article className="flex items-stretch overflow-hidden rounded-2xl border border-(--border-subtle) bg-(--surface-0) shadow-(--shadow-xs)">
              <div
                className="flex w-24 shrink-0 flex-col items-center justify-center px-2 py-4 font-display text-white"
                style={{ backgroundColor: style.bg, color: style.color }}
              >
                <span className="text-3xl leading-none">{step.durationValue}</span>
                <span className="text-xs uppercase tracking-wide">{step.durationUnit}</span>
              </div>
              <div className="flex flex-1 items-center gap-3 p-4">
                <div
                  className="flex shrink-0 items-end gap-2"
                >
                  <span className="font-display text-4xl font-bold leading-none text-[#87a1c0]">
                    {step.step}
                  </span>
                  <Image
                    src={`/prof-p/time-ico${step.step}.png`}
                    alt=""
                    width={layout.iconW}
                    height={layout.iconH}
                    className="object-contain"
                    style={{ width: layout.iconW * 0.75, height: layout.iconH * 0.75 }}
                    aria-hidden
                  />
                </div>
                <p className="text-sm font-bold leading-snug text-(--text-primary)">
                  {step.titleLines.map((line, lineIndex) => (
                    <span key={line}>
                      {line}
                      {lineIndex < step.titleLines.length - 1 ? " " : ""}
                    </span>
                  ))}
                </p>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

export function ProcessSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionShell id="shema" className="bg-(--surface-0)">
      <div className="flex flex-col">
        <Reveal>
          <SectionHeading
            title="Схема работы"
            subtitle="Как мы работаем на каждом этапе"
          />
        </Reveal>

        <div className="hidden xl:block">
          <div className="-mx-(--space-container-x) px-(--space-container-x) pb-2">
            <div className="overflow-visible">
              <ProcessTimeline animated={!prefersReducedMotion} />
            </div>
          </div>
        </div>

        <div className="xl:hidden">
          <ProcessMobileCards />
        </div>

        <Reveal>
          <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed text-(--text-muted)">
            {PROCESS_FOOTNOTE}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            className="relative mx-auto w-fit max-w-full overflow-hidden rounded-3xl border border-(--warning)/30 bg-linear-to-r from-(--warning)/10 via-(--warning)/6 to-transparent p-px shadow-(--shadow-sm)"
            initial={!prefersReducedMotion ? { opacity: 0, y: 12 } : false}
            whileInView={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {!prefersReducedMotion ? (
              <motion.div
                className="pointer-events-none absolute inset-y-0 left-[-35%] w-1/3 bg-linear-to-r from-transparent via-white/50 to-transparent blur-xl"
                animate={{ x: ["0%", "320%"] }}
                transition={{ duration: 5.2, ease: "linear", repeat: Infinity, repeatDelay: 1.5 }}
                aria-hidden
              />
            ) : null}

            <div className="relative inline-flex max-w-full items-center justify-center gap-3 rounded-[calc(var(--radius-2xl)-2px)] bg-(--surface-0) px-4 py-4 sm:px-5">
              <motion.div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-(--warning)/35 bg-(--warning)/12 shadow-(--shadow-xs)"
                animate={!prefersReducedMotion ? { y: [0, -2, 0], scale: [1, 1.03, 1] } : undefined}
                transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
                aria-hidden
              >
                <Image
                  src="/prof-p/warning.png"
                  alt=""
                  width={26}
                  height={26}
                  className="shrink-0 object-contain"
                />
              </motion.div>

              <p className="text-sm leading-relaxed text-(--text-secondary) sm:text-[15px]">
                Выдадим гарантию за{" "}
                <strong className="font-semibold text-(--text-primary)">45 минут</strong>
                {" "}при соблюдении всех условий и требований.
              </p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
