"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useModals } from "@/components/modals/modal-provider";
import { Button } from "@/components/ui/button";
import { SiteContainer } from "@/components/ui/site-container";
import { COMPANY, NAV_ITEMS } from "@/lib/site-content";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";
import { cn, formatPhoneHref } from "@/lib/utils";

const SCROLL_ENTER = 80;
const SCROLL_LEAVE = 20;

export function SiteHeader() {
  const { openGuarantee } = useModals();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#header");
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      let next = scrolledRef.current;

      if (!next && y > SCROLL_ENTER) next = true;
      else if (next && y < SCROLL_LEAVE) next = false;

      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <div className="hidden border-b border-(--border-subtle) bg-(--surface-0)/80 lg:block">
        <SiteContainer className="flex items-center justify-between gap-6 py-2 text-xs text-(--text-secondary)">
          <p className="max-w-xs leading-snug">
            Нашей компании 20 лет!
            <br />
            Выпустили более 380 000 гарантий!
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${COMPANY.email}`}
              onClick={() => reachGoal(METRIKA_GOALS.EMAIL_PANEL)}
              className="hover:text-(--accent-500) transition-colors"
            >
              <span className="text-(--text-muted)">Электронная почта: </span>
              {COMPANY.email}
            </a>
            <a
              href={formatPhoneHref(COMPANY.phoneTollFree)}
              onClick={() => reachGoal(METRIKA_GOALS.PHONE_TOLL_FREE)}
              className="hover:text-(--accent-500) transition-colors"
            >
              <span className="text-(--text-muted)">
                Номер для бесплатных звонков:{" "}
              </span>
              {COMPANY.phoneTollFree}
            </a>
            <Button
              size="sm"
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
        className={cn(
          "sticky top-0 z-(--z-header) border-b transition-[background-color,box-shadow,backdrop-filter] duration-(--duration-slow) ease-out",
          scrolled
            ? "border-(--surface-glass-border) bg-(--surface-glass) shadow-(--shadow-sm) backdrop-blur-[20px] backdrop-saturate-180"
            : "border-transparent bg-(--surface-0)",
        )}
      >
        <SiteContainer>
          <div className="flex items-center justify-between gap-4 py-4">
            <Link href="#header" className="flex shrink-0 items-center gap-3">
              <Image
                src="/prof-p/logo.png"
                alt="logo"
                width={45}
                height={40}
                priority
                className="h-10 w-auto"
              />
              <span className="hidden font-medium text-sm leading-tight sm:block max-w-35">
                {COMPANY.name}
              </span>
            </Link>

            <nav
              className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex"
              aria-label="Основная навигация"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors",
                    activeSection === item.href
                      ? "cta-surface-static"
                      : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--surface-2)",
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--border-default) lg:hidden"
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
            className="lg:hidden border-t border-(--border-subtle) bg-(--surface-0) px-4 py-4"
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
