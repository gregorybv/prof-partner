"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useModals } from "@/components/modals/modal-provider";
import { Button } from "@/components/ui/button";
import { SiteContainer } from "@/components/ui/site-container";
import { COMPANY, NAV_ITEMS } from "@/lib/site-content";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";
import { cn, formatPhoneHref } from "@/lib/utils";

export function SiteHeader() {
  const { openGuarantee } = useModals();
  const [activeSection, setActiveSection] = useState("#header");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const elements = NAV_ITEMS.map((item) =>
      document.getElementById(item.href.replace("#", "")),
    ).filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="header-top-strip hidden lg:block">
        <SiteContainer className="flex items-center justify-between gap-6 py-2.5 text-xs text-(--text-secondary)">
          <p className="max-w-xs leading-snug">
            Нашей компании 20 лет!
            <br />
            Выпустили более 380 000 гарантий!
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${COMPANY.email}`}
              onClick={() => reachGoal(METRIKA_GOALS.EMAIL_PANEL)}
              className="header-top-link"
            >
              <span className="text-(--text-muted)">Электронная почта: </span>
              {COMPANY.email}
            </a>
            <a
              href={formatPhoneHref(COMPANY.phoneTollFree)}
              onClick={() => reachGoal(METRIKA_GOALS.PHONE_TOLL_FREE)}
              className="header-top-link"
            >
              <span className="text-(--text-muted)">
                Номер для бесплатных звонков:{" "}
              </span>
              {COMPANY.phoneTollFree}
            </a>
            <Button
              size="sm"
              className="min-w-[12.75rem] tracking-wide"
              type="button"
              onClick={() =>
                openGuarantee({
                  fz: "",
                  fzLabel: "ЗАЯВКА НА ВЫПУСК ГАРАНТИИ",
                })
              }
            >
              Получить лучшие условия
            </Button>
          </div>
        </SiteContainer>
      </div>

      <header
        id="header"
        className="sticky top-0 z-(--z-header) border-b border-(--surface-glass-border) bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.96)_100%)] shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
      >
        <SiteContainer>
          <div
            className="flex items-center justify-between gap-4 py-3.5"
          >
            <Link href="#header" className="group flex shrink-0 items-center gap-3">
              <Image
                src="/prof-p/logo.png"
                alt="logo"
                width={45}
                height={40}
                priority
                className={cn(
                  "w-auto transition-[height,transform] duration-(--duration-slow) ease-(--ease-premium) group-hover:scale-[1.03]",
                  "h-10",
                )}
              />
              <span className="hidden max-w-35 text-sm leading-tight font-medium tracking-[0.01em] sm:block">
                {COMPANY.name}
              </span>
            </Link>

            <nav
              className="header-nav-shell hidden min-w-0 flex-1 items-center justify-center gap-1.5 lg:flex"
              aria-label="Основная навигация"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-active={activeSection === item.href}
                  className={cn(
                    "header-nav-link group relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[11px] font-semibold uppercase transition-[color,background-color,box-shadow,transform] duration-(--duration-base)",
                    activeSection === item.href
                      ? "text-white"
                      : "text-(--text-secondary) hover:text-(--text-primary)",
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeSection === item.href && (
                    <span
                      className="cta-surface-static absolute inset-0 z-0 rounded-full"
                      aria-hidden
                    />
                  )}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--border-default) bg-(--surface-0)/90 text-(--text-primary) shadow-[0_2px_8px_rgba(15,23,42,0.08)] transition-[border-color,box-shadow,background-color] duration-(--duration-base) hover:border-(--border-strong) hover:bg-(--surface-0) hover:shadow-[0_6px_16px_rgba(15,23,42,0.1)] lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </SiteContainer>

        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden border-t border-(--border-subtle) bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,251,252,0.96)_100%)] px-4 py-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)] backdrop-blur-[14px]"
            aria-label="Мобильная навигация"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    activeSection === item.href
                      ? "cta-surface-static"
                      : "hover:bg-(--surface-2)",
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </header>
    </>
  );
}
