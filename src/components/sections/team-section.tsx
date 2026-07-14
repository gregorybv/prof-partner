"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { TEAM_MEMBERS, TEAM_STATS } from "@/lib/site-content";

export function TeamSection() {
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const featured = TEAM_MEMBERS[0];
  const rest = TEAM_MEMBERS.slice(1);

  return (
    <SectionShell id="ourTeam">
      <div className="flex flex-col gap-[var(--space-section-gap)]">
        <Reveal>
          <SectionHeading title="Наша команда" subtitle="лучшие специалисты" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative flex flex-col gap-8">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-[rgba(186,145,62,0.28)] bg-[linear-gradient(135deg,rgba(4,22,37,0.98),rgba(9,53,84,0.95)_52%,rgba(250,252,255,0.98)_160%)] px-6 pb-10 pt-8 shadow-[0_30px_80px_rgba(4,22,37,0.26)] md:px-8 lg:px-10 lg:pb-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_18%_24%,rgba(212,175,86,0.18),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(48,159,222,0.18),transparent_28%)]" />
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <span className="inline-flex rounded-full border border-[rgba(255,255,255,0.22)] bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/88 backdrop-blur">
                  Руководитель компании
                </span>
                <div className="relative mt-6 h-52 w-52 overflow-hidden rounded-[2.25rem] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08))] shadow-[0_24px_60px_rgba(4,22,37,0.4)] ring-4 ring-[rgba(255,255,255,0.08)] md:h-64 md:w-64">
                  <div className="absolute inset-3 rounded-[1.75rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))]" />
                  <Image
                    src={featured.image}
                    alt={featured.name}
                    fill
                    className="object-contain p-3"
                    sizes="(min-width: 768px) 256px, 208px"
                    priority
                  />
                </div>
                <p className="mt-6 text-[1.9rem] font-semibold tracking-[-0.02em] text-white md:text-[2.25rem]">
                  {featured.name}
                </p>
                <p className="mt-2 text-base text-white/74 md:text-lg">
                  {featured.role}
                </p>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/78 md:text-base">
                  Возглавляет команду специалистов, которые сопровождают клиента на всех этапах оформления банковских гарантий и помогают быстро доводить сделки до результата.
                </p>
              </div>
            </div>

            <div className="relative -mt-4 overflow-hidden rounded-[2rem] border border-[rgba(12,56,89,0.08)] bg-[linear-gradient(135deg,rgba(244,248,252,0.98)_0%,rgba(250,252,255,0.99)_42%,rgba(238,246,252,0.98)_100%)] p-5 shadow-[0_24px_60px_rgba(9,34,53,0.12)] md:p-6 lg:px-7">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(10,107,156,0.14),transparent_42%),radial-gradient(circle_at_right,rgba(59,111,212,0.08),transparent_32%)]" />
              <div className="relative mb-5">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-800)]">
                    Ключевые специалисты
                  </p>
                  <p className="mt-2 max-w-[560px] text-sm text-[var(--text-secondary)] md:text-base">
                  Наша команда работает так, чтобы вы получили лучшие условия финансирования без лишних сложностей. От первого обращения до одобрения и оформления сделки — мы сопровождаем каждый этап.</p>
                </div>
              </div>

              <div className="team-marquee relative overflow-hidden rounded-[1.75rem]">
                <div className="team-marquee-track flex w-max gap-4">
                  {[...rest, ...rest].map((member, index) => (
                    <div
                      key={`${member.name}-${index}`}
                      aria-hidden={index >= rest.length}
                      className="group flex min-h-[16.5rem] w-[78vw] shrink-0 flex-col rounded-[1.75rem] border border-[rgba(12,56,89,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(248,250,253,0.98))] p-5 shadow-[0_14px_24px_rgba(9,34,53,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_32px_rgba(9,34,53,0.1)] sm:w-[46vw] sm:max-w-[26rem] lg:w-[32vw] lg:max-w-[24rem]"
                    >
                      <div className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(14,86,134,0.14),rgba(255,255,255,0.98))] ring-1 ring-[rgba(12,56,89,0.1)] transition-transform duration-300 group-hover:scale-[1.04]">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-contain p-0.5"
                          sizes="128px"
                        />
                      </div>
                      <p className="mt-4 text-center font-semibold text-[var(--text-primary)]">
                        {member.name}
                      </p>
                      <p className="mt-2 text-center text-xs leading-snug text-[var(--text-secondary)]">
                        {member.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-4 rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-700)] p-6 text-white md:p-8"
          >
            {TEAM_STATS.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p className="text-xs uppercase tracking-wide text-white/70">
                  {stat.prefix}
                </p>
                <p className="font-display mt-1 text-3xl md:text-4xl">
                  {statsInView ? (
                    <CountUp end={stat.value} duration={2} delay={i * 0.15} />
                  ) : (
                    "0"
                  )}
                </p>
                <p className="mt-1 text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
