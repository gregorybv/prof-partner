"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { SiteContainer } from "@/components/ui/site-container";
import { COMPANY, NAV_ITEMS } from "@/lib/site-content";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";
import { cn, formatPhoneHref } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#header");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      id="header"
      className={cn(
        "sticky top-0 z-[var(--z-header)] transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)]",
        scrolled ? "glass shadow-[var(--shadow-sm)]" : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "hidden border-b border-[var(--border-subtle)] bg-[var(--surface-0)]/80 lg:block transition-[height] duration-[var(--duration-slow)]",
          scrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100",
        )}
      >
        <SiteContainer className="flex items-center justify-between gap-6 py-2 text-xs text-[var(--text-secondary)]">
          <p className="max-w-xs leading-snug">
            Нашей компании 20 лет!
            <br />
            Выпустили более 380 000 гарантий!
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`mailto:${COMPANY.email}`}
              onClick={() => reachGoal(METRIKA_GOALS.EMAIL_PANEL)}
              className="hover:text-[var(--accent-500)] transition-colors"
            >
              <span className="text-[var(--text-muted)]">Электронная почта: </span>
              {COMPANY.email}
            </a>
            <a
              href={formatPhoneHref(COMPANY.phoneTollFree)}
              onClick={() => reachGoal(METRIKA_GOALS.PHONE_TOLL_FREE)}
              className="hover:text-[var(--accent-500)] transition-colors"
            >
              <span className="text-[var(--text-muted)]">
                Номер для бесплатных звонков:{" "}
              </span>
              {COMPANY.phoneTollFree}
            </a>
          </div>
        </SiteContainer>
      </div>

      <SiteContainer>
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-[padding] duration-[var(--duration-slow)]",
            scrolled ? "py-3" : "py-4",
          )}
        >
          <Link href="#header" className="flex items-center gap-3 shrink-0">
            <Image
              src="/prof-p/logo.png"
              alt="logo"
              width={45}
              height={40}
              priority
              className="h-10 w-auto"
            />
            <span className="hidden font-medium text-sm leading-tight sm:block max-w-[140px]">
              {COMPANY.name}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Основная навигация">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors",
                  activeSection === item.href
                    ? "bg-[var(--brand-600)] text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={formatPhoneHref(COMPANY.phoneTollFree)}
              onClick={() => reachGoal(METRIKA_GOALS.PHONE_TOLL_FREE)}
              className="hidden md:flex"
            >
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4" />
                {COMPANY.phoneTollFree}
              </Button>
            </a>
            <button
              type="button"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </SiteContainer>

      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t border-[var(--border-subtle)] bg-[var(--surface-0)] px-4 py-4"
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
                    ? "bg-[var(--brand-600)] text-white"
                    : "hover:bg-[var(--surface-2)]",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </header>
  );
}
