"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { MagneticWrap } from "@/components/animations/magnetic-wrap";
import { Button } from "@/components/ui/button";
import { SiteContainer } from "@/components/ui/site-container";
import { CertsHeaderVisual } from "@/components/sections/certs-header-visual";
import { HERO_FEATURES, HERO_STATS, YANDEX_REVIEWS } from "@/lib/site-content";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const orbX = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const orbY = useTransform(springY, [-0.5, 0.5], [-16, 16]);

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      className="relative overflow-hidden pb-[var(--space-section-y)] pt-8"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/prof-p/background-first-screen.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(223,231,242,0.7)]" />
        <motion.div
          style={{ x: orbX, y: orbY }}
          className="absolute -top-24 right-[10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(59,111,212,0.18)_0%,transparent_70%)] blur-3xl"
        />
        <motion.div
          style={{ x: useTransform(springX, [-0.5, 0.5], [16, -16]) }}
          className="absolute bottom-0 left-[5%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(49,83,121,0.12)_0%,transparent_70%)] blur-3xl"
        />
      </div>

      <SiteContainer className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-8">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[var(--tracking-wider)] text-[var(--accent-500)]">
                СОГЛАСУЕМ В БАНКЕ ЛУЧШИЕ УСЛОВИЯ. РАБОТАЕМ БЕЗ КОМИССИИ.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-[clamp(1.95rem,4.8vw,3.4rem)] leading-[1.1] font-extrabold uppercase tracking-[0.012em] text-[var(--brand-900)]">
                Независимая (банковская) гарантия
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
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
                    className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-0)]/80 p-4 shadow-[var(--shadow-xs)] backdrop-blur-sm"
                  >
                    <p className="font-display text-2xl text-[var(--brand-600)] md:text-3xl">
                      {statsInView ? (
                        <CountUp end={stat.value} duration={2} delay={i * 0.15} separator=" " />
                      ) : (
                        "0"
                      )}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-[var(--text-muted)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.4} className="flex flex-wrap gap-3">
              <MagneticWrap>
                <a
                  href="#kalkulyator"
                  onClick={() => reachGoal(METRIKA_GOALS.CALCULATOR_BTN)}
                  className="inline-flex"
                >
                  <Button size="lg" type="button">
                    Калькулятор гарантии
                  </Button>
                </a>
              </MagneticWrap>
              <MagneticWrap>
                <a
                  href="#avto-podbor"
                  onClick={() => reachGoal(METRIKA_GOALS.AUTO_SELECT_BTN)}
                  className="inline-flex"
                >
                  <Button variant="secondary" size="lg" type="button">
                    Автоподбор банка
                  </Button>
                </a>
              </MagneticWrap>
            </Reveal>
          </div>

          <Reveal delay={0.2} direction="left" className="flex flex-col gap-6">
            <div className="glass rounded-3xl p-6 shadow-[var(--shadow-card)]">
              <Link
                href="#avto-podbor"
                onClick={() => reachGoal(METRIKA_GOALS.AUTO_SELECT_BTN)}
                className="mb-4 inline-flex items-center gap-2 text-base font-semibold uppercase tracking-wide text-[var(--brand-600)] transition-colors hover:text-[var(--accent-500)]"
              >
                <Image
                  src="/prof-p/discount_header.png"
                  alt=""
                  width={30}
                  height={30}
                  className="h-[30px] w-[30px] shrink-0"
                />
                Автоподбор банка
              </Link>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="font-semibold">{YANDEX_REVIEWS.rating}</span>
                <span className="text-sm text-[var(--text-muted)]">
                  {YANDEX_REVIEWS.reviewsCount} отзывов • {YANDEX_REVIEWS.ratingsCount} оценок
                </span>
              </div>

              <a
                href={YANDEX_REVIEWS.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => reachGoal(METRIKA_GOALS.YANDEX_REVIEWS)}
                className="mt-3 inline-block text-sm font-medium text-[var(--accent-500)] hover:underline"
              >
                Читать отзывы на Яндекс Картах
              </a>
            </div>

            <div className="glass rounded-3xl p-6 shadow-[var(--shadow-card)]">
              <CertsHeaderVisual />
              <p className="text-sm text-[var(--text-secondary)]">
                Являемся официальными
                <br />
                представителями банков
              </p>
              <a
                href="#sertifikaty"
                className="mt-3 inline-block text-sm font-medium text-[var(--accent-500)] hover:underline"
              >
                Смотреть сертификаты
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.5} className="mt-16">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {HERO_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-0)] p-4 transition-all duration-[var(--duration-base)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-600)]">
                  {feature.title}
                </p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </SiteContainer>
    </section>
  );
}
