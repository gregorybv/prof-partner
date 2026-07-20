"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { MagneticWrap } from "@/components/animations/magnetic-wrap";
import { buttonVariants } from "@/components/ui/button";
import { SiteContainer } from "@/components/ui/site-container";
import { CertsHeaderVisual } from "@/components/sections/certs-header-visual";
import { HERO_FEATURES, HERO_STATS, YANDEX_REVIEWS } from "@/lib/site-content";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const orbX = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const orbY = useTransform(springY, [-0.5, 0.5], [-16, 16]);
  const inverseOrbX = useTransform(springX, [-0.5, 0.5], [16, -16]);
  const visualRotateY = useTransform(springX, [-0.5, 0.5], [-1.2, 1.2]);
  const visualRotateX = useTransform(springY, [-0.5, 0.5], [1, -1]);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 42]);

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={sectionRef}
      className="hero-experience relative isolate min-h-[calc(100svh-var(--header-height)-6rem)] overflow-hidden pb-(--space-section-y) pt-8"
      onMouseMove={(e) => {
        if (prefersReducedMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
    >
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : backgroundY }}
        className="pointer-events-none absolute -inset-y-[8%] inset-x-0"
      >
        <Image
          src="/prof-p/background-first-screen.jpg"
          alt=""
          fill
          priority
          className="hero-background-image object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(223,231,242,0.72)]" />
        <motion.div
          style={{ x: prefersReducedMotion ? 0 : orbX, y: prefersReducedMotion ? 0 : orbY }}
          className="hero-orb hero-orb--primary absolute -top-24 right-[10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(59,111,212,0.18)_0%,transparent_70%)] blur-3xl"
        />
        <motion.div
          style={{ x: prefersReducedMotion ? 0 : inverseOrbX }}
          className="hero-orb hero-orb--secondary absolute bottom-0 left-[5%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(49,83,121,0.12)_0%,transparent_70%)] blur-3xl"
        />
        <div className="hero-lines absolute inset-0 opacity-35" />
      </motion.div>

      <motion.div style={{ y: prefersReducedMotion ? 0 : contentY }}>
      <SiteContainer className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-8">
            <Reveal variant="blur">
              <p className="text-sm font-bold uppercase tracking-wider text-(--cta-700)">
                СОГЛАСУЕМ В БАНКЕ ЛУЧШИЕ УСЛОВИЯ. РАБОТАЕМ БЕЗ КОМИССИИ.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] font-extrabold uppercase tracking-[0.012em] text-(--brand-900)">
                Независимая (банковская) гарантия
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="max-w-xl text-lg leading-relaxed text-(--text-secondary)">
                Дистанционно оформляем гарантии 24/7.
                <br />
                Наши услуги бесплатны. Работаем с 2006 года.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div ref={statsRef} className="grid grid-cols-3 gap-4">
                {HERO_STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="premium-card group rounded-2xl border border-white/80 bg-white/90 p-4 shadow-(--shadow-card) backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-(--duration-slow) ease-(--ease-premium) hover:-translate-y-1 hover:border-white hover:shadow-(--shadow-md)"
                  >
                    <p className="font-display text-2xl font-extrabold text-(--brand-900) md:text-3xl">
                      {prefersReducedMotion ? (
                        stat.value
                      ) : statsInView ? (
                        <CountUp end={stat.value} duration={2} delay={i * 0.15} separator=" " />
                      ) : (
                        "0"
                      )}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-(--text-muted)">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.4} className="flex flex-wrap gap-3">
              <MagneticWrap>
                <a
                  href="#avto-podbor"
                  onClick={() => reachGoal(METRIKA_GOALS.AUTO_SELECT_BTN)}
                  className={buttonVariants({
                    size: "lg",
                    className: "min-w-55 uppercase tracking-wide",
                  })}
                >
                  <Image
                    src="/prof-p/discount_header.png"
                    alt=""
                    width={22}
                    height={22}
                    className="h-5.5 w-5.5 shrink-0"
                    aria-hidden
                  />
                  Автоподбор банка
                </a>
              </MagneticWrap>
              <MagneticWrap>
                <a
                  href="#kalkulyator"
                  onClick={() => reachGoal(METRIKA_GOALS.CALCULATOR_BTN)}
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                    className: "uppercase tracking-wide",
                  })}
                >
                  Калькулятор гарантии
                </a>
              </MagneticWrap>
            </Reveal>
          </div>

          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : { rotateX: visualRotateX, rotateY: visualRotateY, transformPerspective: 1200 }
            }
          >
          <Reveal delay={0.2} direction="left" variant="tilt" className="flex flex-col gap-6">
            <div className="premium-card glass rounded-3xl p-6 shadow-(--shadow-card) transition-[transform,box-shadow] duration-(--duration-slow) hover:-translate-y-1 hover:shadow-(--shadow-lg)">
              <Link
                href="#avto-podbor"
                onClick={() => reachGoal(METRIKA_GOALS.AUTO_SELECT_BTN)}
                className="mb-4 inline-flex items-center gap-2 text-base font-bold uppercase tracking-wide text-(--cta-700) transition-colors hover:text-(--cta-500)"
              >
                <Image
                  src="/prof-p/discount_header.png"
                  alt=""
                  width={30}
                  height={30}
                  className="h-7.5 w-7.5 shrink-0"
                />
                Автоподбор банка
              </Link>

              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-3xl font-extrabold text-(--brand-900)">
                  {YANDEX_REVIEWS.rating.toFixed(1)}
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-(--text-muted)">
                  {YANDEX_REVIEWS.reviewsCount} отзывов • {YANDEX_REVIEWS.ratingsCount} оценок
                </span>
              </div>

              <a
                href={YANDEX_REVIEWS.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => reachGoal(METRIKA_GOALS.YANDEX_REVIEWS)}
                className="mt-3 inline-block text-sm font-semibold text-(--accent-500) hover:underline"
              >
                Читать отзывы на Яндекс Картах
              </a>
            </div>

            <div className="premium-card glass rounded-3xl p-6 shadow-(--shadow-card) transition-[transform,box-shadow] duration-(--duration-slow) hover:-translate-y-1 hover:shadow-(--shadow-lg)">
              <CertsHeaderVisual />
              <p className="text-sm font-medium text-(--text-secondary)">
                Являемся официальными
                <br />
                представителями банков
              </p>
              <a
                href="#sertifikaty"
                className="mt-3 inline-block text-sm font-semibold text-(--accent-500) hover:underline"
              >
                Смотреть сертификаты
              </a>
            </div>
          </Reveal>
          </motion.div>
        </div>

        <Reveal delay={0.5} className="mt-16">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {HERO_FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className="premium-card group rounded-2xl border border-white/80 bg-white/90 p-4 shadow-(--shadow-xs) backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-(--duration-slow) ease-(--ease-premium) hover:-translate-y-1.5 hover:border-white hover:shadow-(--shadow-md)"
              >
                <p className="text-[10px] font-bold uppercase tracking-wide text-(--cta-700)">
                  0{index + 1}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-(--brand-700)">
                  {feature.title}
                </p>
                <p className="mt-1 text-sm text-(--text-secondary)">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </SiteContainer>
      </motion.div>

      <a
        href="#avto-podbor"
        className="group absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-(--brand-700)/70 lg:flex"
        aria-label="Прокрутить к автоподбору банка"
      >
        <span className="transition-colors group-hover:text-(--brand-900)">Листайте</span>
        <span className="relative h-9 w-px overflow-hidden bg-(--brand-700)/20">
          <span className="hero-scroll-indicator absolute inset-x-0 top-0 h-1/2 bg-(--brand-700)" />
        </span>
      </a>
    </section>
  );
}
