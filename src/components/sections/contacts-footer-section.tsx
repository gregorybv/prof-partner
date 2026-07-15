"use client";

import { Reveal } from "@/components/animations/reveal";
import { YandexMap } from "@/components/integrations/yandex-map";
import { SectionShell } from "@/components/ui/section-shell";
import { COMPANY, LEGAL_LINKS } from "@/lib/site-content";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";
import { formatPhoneHref } from "@/lib/utils";

export function ContactsFooterSection() {
  return (
    <SectionShell id="footer" muted className="border-t border-(--border-subtle) pb-24 md:pb-(--space-section-y)">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl text-(--text-primary)">
              Контактная информация
            </h2>
            <div className="mt-6 space-y-4 text-sm text-(--text-secondary)">
              <div>
                <p className="text-xs uppercase tracking-wide text-(--text-muted)">Тверь</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-(--text-muted)">Москва</p>
              </div>
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
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-(--border-subtle) bg-(--surface-0) p-6 shadow-(--shadow-sm)">
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
            <YandexMap />
          </div>
        </div>

        <div className="mt-10 border-t border-(--border-subtle) pt-6 text-xs leading-relaxed text-(--text-muted)">
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
          </p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
