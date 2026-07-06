"use client";

import { Reveal } from "@/components/animations/reveal";
import { SectionShell } from "@/components/ui/section-shell";
import { COMPANY, LEGAL_LINKS } from "@/lib/site-content";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";
import { formatPhoneHref } from "@/lib/utils";

export function ContactsFooterSection() {
  return (
    <SectionShell id="footer" muted className="border-t border-[var(--border-subtle)]">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl text-[var(--text-primary)]">
              Контактная информация
            </h2>
            <div className="mt-6 space-y-4 text-sm text-[var(--text-secondary)]">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {COMPANY.legalName}
                </h3>
                <ul className="mt-2 space-y-1">
                  <li>ИНН: {COMPANY.inn}</li>
                  <li>ОГРН: {COMPANY.ogrn}</li>
                  <li>Дата регистрации: {COMPANY.registrationDate}</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-[var(--text-primary)]">График работы:</p>
                <p className="whitespace-pre-line">{COMPANY.schedule}</p>
              </div>
              <div>
                <p className="font-medium text-[var(--text-primary)]">Адрес:</p>
                <p>{COMPANY.address}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-0)] p-6 shadow-[var(--shadow-sm)]">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  Телефоны
                </p>
                <a
                  href={formatPhoneHref(COMPANY.phoneTollFree)}
                  onClick={() => reachGoal(METRIKA_GOALS.PHONE_TOLL_FREE)}
                  className="mt-1 block text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--accent-500)]"
                >
                  {COMPANY.phoneTollFree}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">
                  Эл. Почта
                </p>
                <a
                  href={`mailto:${COMPANY.email}`}
                  onClick={() => reachGoal(METRIKA_GOALS.EMAIL_CONTACTS)}
                  className="mt-1 block font-medium text-[var(--accent-500)] hover:underline"
                >
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border-subtle)] pt-6 text-xs leading-relaxed text-[var(--text-muted)]">
          <p>
            {COMPANY.copyright} Сайт кредитно-брокерского агентства «{COMPANY.name}».
          </p>
          <p className="mt-2">{COMPANY.disclaimer}</p>
          <p className="mt-3 flex flex-wrap gap-4">
            <a href={LEGAL_LINKS.privacy} className="hover:text-[var(--accent-500)]">
              Политика конфиденциальности
            </a>
            <span>|</span>
            <a href={LEGAL_LINKS.consent} className="hover:text-[var(--accent-500)]">
              Согласие на обработку персональных данных
            </a>
          </p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
