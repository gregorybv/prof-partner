"use client";

import { useState } from "react";
import { useCookieConsent } from "@/components/integrations/cookie-consent-provider";
import { Reveal } from "@/components/animations/reveal";
import { YandexMap } from "@/components/integrations/yandex-map";
import { SectionShell } from "@/components/ui/section-shell";
import { COMPANY, LEGAL_LINKS, YANDEX_MAP_CITIES } from "@/lib/site-content";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";
import { formatPhoneHref } from "@/lib/utils";

export function ContactsFooterSection() {
  type YandexMapCityKey = keyof typeof YANDEX_MAP_CITIES;
  const [activeCity, setActiveCity] = useState<YandexMapCityKey>("tver");
  const { openSettings } = useCookieConsent();

  return (
    <SectionShell id="footer" muted className="border-t border-(--border-subtle) pb-24 md:pb-8">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-start">
          <div>
            <h2 className="font-display text-3xl text-(--text-primary)">
              Контактная информация
            </h2>
            <div className="mt-6 space-y-4 text-sm text-(--text-secondary)">
              <div>
                <h3 className="font-semibold text-(--text-primary)">
                  {COMPANY.legalName}
                </h3>
                <ul className="mt-2 space-y-1">
                  <li>ИНН: {COMPANY.inn}</li>
                  <li>ОГРН: {COMPANY.ogrn}</li>
                  <li>Дата регистрации: {COMPANY.registrationDate}</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-(--text-primary)">График работы:</p>
                <p className="whitespace-pre-line">{COMPANY.schedule}</p>
              </div>
              <div>
                <p className="font-medium text-(--text-primary)">Адрес:</p>
                <p>{COMPANY.address}</p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-(--border-subtle) bg-(--surface-0) p-6 shadow-(--shadow-sm)">
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-(--text-muted)">Телефоны</p>
                  <a
                    href={formatPhoneHref(COMPANY.phoneTollFree)}
                    onClick={() => reachGoal(METRIKA_GOALS.PHONE_TOLL_FREE)}
                    className="mt-1 block text-lg font-semibold text-(--text-primary) hover:text-(--accent-500)"
                  >
                    {COMPANY.phoneTollFree}
                  </a>
                  <a
                    href={formatPhoneHref(COMPANY.phoneMoscow)}
                    onClick={() => reachGoal(METRIKA_GOALS.PHONE_MOSCOW)}
                    className="mt-1 block text-sm text-(--text-secondary) hover:text-(--accent-500)"
                  >
                    {COMPANY.phoneMoscow}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-(--text-muted)">Эл. Почта</p>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    onClick={() => reachGoal(METRIKA_GOALS.EMAIL_CONTACTS)}
                    className="mt-1 block font-medium text-(--accent-500) hover:underline"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-center lg:justify-end">
              <div
                className="inline-flex rounded-xl border border-(--border-subtle) bg-white/70 p-1 shadow-[0_10px_24px_rgba(9,34,53,0.08)] backdrop-blur"
                role="tablist"
                aria-label="Переключение карты по городам"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCity === "tver"}
                  className={
                    activeCity === "tver"
                      ? "h-8 rounded-lg border border-[rgba(59,111,212,0.22)] bg-white/95 px-4 text-xs font-bold uppercase tracking-wide text-(--brand-900) shadow-[0_10px_24px_rgba(9,34,53,0.12)]"
                      : "h-8 rounded-lg px-4 text-xs font-semibold uppercase tracking-wide text-(--text-muted) hover:text-(--text-primary)"
                  }
                  onClick={() => setActiveCity("tver")}
                >
                  {YANDEX_MAP_CITIES.tver.label}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCity === "moscow"}
                  className={
                    activeCity === "moscow"
                      ? "h-8 rounded-lg border border-[rgba(59,111,212,0.22)] bg-white/95 px-4 text-xs font-bold uppercase tracking-wide text-(--brand-900) shadow-[0_10px_24px_rgba(9,34,53,0.12)]"
                      : "h-8 rounded-lg px-4 text-xs font-semibold uppercase tracking-wide text-(--text-muted) hover:text-(--text-primary)"
                  }
                  onClick={() => setActiveCity("moscow")}
                >
                  {YANDEX_MAP_CITIES.moscow.label}
                </button>
              </div>
            </div>

            <YandexMap city={activeCity} />
          </div>
        </div>

        <div className="mt-8 border-t border-(--border-subtle) pt-5 text-xs leading-relaxed text-(--text-muted)">
          <p>
            {COMPANY.copyright} Сайт кредитно-брокерского агентства «{COMPANY.name}».
          </p>
          <p className="mt-2">{COMPANY.disclaimer}</p>
          <p className="mt-3 flex flex-wrap gap-4">
            <a href={LEGAL_LINKS.privacy} className="hover:text-(--accent-500)">
              Политика конфиденциальности
            </a>
            <span>|</span>
            <a href={LEGAL_LINKS.consent} className="hover:text-(--accent-500)">
              Согласие на обработку персональных данных
            </a>
            <span>|</span>
            <button
              type="button"
              onClick={openSettings}
              className="hover:text-(--accent-500)"
            >
              Настройки cookie
            </button>
          </p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
