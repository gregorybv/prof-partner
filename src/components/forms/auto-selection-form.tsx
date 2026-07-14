"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { CommerceAutoModal } from "@/components/modals/commerce-auto-modal";
import { LegacyResultsTable } from "@/components/forms/legacy-results-table";
import { MaskedResultsBanner } from "@/components/forms/masked-results-banner";
import { useModals } from "@/components/modals/modal-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";
import { hasActiveAntibotToken } from "@/lib/cookies";
import { LEGACY_API, legacyPost } from "@/lib/api";
import {
  maskLegacyTableHtml,
  unmaskLegacyTableHtml,
  type CalcResultContext,
} from "@/lib/legacy-table";
import { cn } from "@/lib/utils";

const autoSelectSchema = z.object({
  innAuto: z
    .string()
    .min(10, "ИНН должен содержать от 10 до 12 цифр")
    .max(12, "ИНН должен содержать от 10 до 12 цифр")
    .regex(/^\d+$/, "ИНН должен содержать только цифры"),
  numAuto: z
    .string()
    .min(11, "РНА должен содержать от 11 до 19 цифр")
    .max(19, "РНА должен содержать от 11 до 19 цифр")
    .regex(/^\d+$/, "РНА должен содержать только цифры"),
  consent: z.boolean().refine((v) => v === true, {
    message: "Необходимо дать согласие на обработку персональных данных",
  }),
});

type AutoSelectValues = z.infer<typeof autoSelectSchema>;
type PurchaseType = "gostorgi" | "commerce";

type CalcAutoResponse = {
  result?: string;
  resultApi?: {
    incorrectInnOrReestr?: boolean;
  };
};

type AutoSelectionFormProps = {
  formId?: string;
  className?: string;
};

function buildAutoContext(values: AutoSelectValues): CalcResultContext {
  return {
    fz: "Госторги",
    typeBg: "Исполнение",
    summ: "",
    startDate: "",
    endDate: "",
    inn: values.innAuto,
    regnum: values.numAuto,
    flags: {
      hasAvans: false,
      netLossLastYear: false,
      noExperience: false,
      blockBankAccount: false,
      arbitration: false,
      closedTender: false,
      customerForm: false,
      courierDelivery: false,
      installmentPay: true,
      d1: false,
      d2: false,
      d3: false,
      d4: false,
    },
  };
}

export function AutoSelectionForm({
  formId = "1",
  className,
}: AutoSelectionFormProps) {
  const { openAntibot, openCommerce, openLimit } = useModals();
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("gostorgi");
  const [tableHtml, setTableHtml] = useState<string | null>(null);
  const [rawTableHtml, setRawTableHtml] = useState<string | null>(null);
  const [isMasked, setIsMasked] = useState(false);
  const [calcContext, setCalcContext] = useState<CalcResultContext | null>(null);
  const [autoPayload, setAutoPayload] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AutoSelectValues>({
    resolver: zodResolver(autoSelectSchema),
    defaultValues: { consent: undefined },
  });

  const unmaskResults = () => {
    if (rawTableHtml) {
      setTableHtml(unmaskLegacyTableHtml(rawTableHtml));
      setIsMasked(false);
    }
  };

  const runAutoCalc = async (values: AutoSelectValues) => {
    setIsLoading(true);
    setErrorMessage(null);
    setShowPlaceholder(false);
    setTableHtml(null);
    setRawTableHtml(null);

    const payload = new URLSearchParams({
      innAuto: values.innAuto,
      numAuto: values.numAuto,
      InstallmentPay: "on",
    });

    const payloadRecord: Record<string, string> = {
      innAuto: values.innAuto,
      numAuto: values.numAuto,
      InstallmentPay: "on",
    };

    const needsAntibot = !hasActiveAntibotToken();
    if (needsAntibot) {
      reachGoal(METRIKA_GOALS.ANTIBOT);
      openAntibot({
        context: "auto",
        payload: payloadRecord,
        onVerified: unmaskResults,
        onCancel: () => {
          setTableHtml(null);
          setRawTableHtml(null);
          setIsMasked(false);
          setShowPlaceholder(true);
        },
      });
    }

    setAutoPayload(payloadRecord);

    try {
      await legacyPost(LEGACY_API.calcAutoBtn, payload);

      const response = await legacyPost(LEGACY_API.calcAuto, payload);

      if (response.status === 403) {
        openLimit();
        reachGoal(METRIKA_GOALS.CALCULATOR_LIMIT);
        return;
      }

      const result = (await response.json()) as CalcAutoResponse;

      if (result.resultApi?.incorrectInnOrReestr) {
        setErrorMessage(
          "ДАННЫЕ НЕ ИДЕНТИФИЦИРОВАНЫ, ПРОВЕРЬТЕ КОРРЕКТНОСТЬ ВВЕДЕННЫХ ИНН И РЕЕСТРОВОГО НОМЕРА.",
        );
        return;
      }

      if (result.result) {
        setRawTableHtml(result.result);
        const displayHtml = needsAntibot ? maskLegacyTableHtml(result.result) : result.result;
        setTableHtml(displayHtml);
        setIsMasked(needsAntibot);
        setCalcContext(buildAutoContext(values));
        reachGoal(METRIKA_GOALS.AUTO_SELECT, {
          avtopodbor: { inn: values.innAuto, rna: values.numAuto },
        });
      } else {
        setErrorMessage("Не удалось получить результат подбора. Попробуйте позже.");
      }
    } catch {
      setErrorMessage("Ошибка соединения с сервером. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: AutoSelectValues) => {
    if (purchaseType === "commerce") {
      reachGoal(METRIKA_GOALS.AUTO_SELECT_BTN);
      openCommerce();
      return;
    }

    reachGoal(METRIKA_GOALS.AUTO_SELECT_BTN);
    await runAutoCalc(values);
  };

  const onCommerceResult = (html: string, masked: boolean) => {
    setShowPlaceholder(false);
    setTableHtml(html);
    setRawTableHtml(masked ? unmaskLegacyTableHtml(html) : html);
    setIsMasked(masked);
    setCalcContext(buildAutoContext(getValues()));
  };

  const consentLabel = (
    <>
      Оставляя отметку, я даю{" "}
      <a
        href="/soglasie.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--accent-500)] hover:underline"
      >
        согласие
      </a>{" "}
      на обработку моих персональных данных на условиях{" "}
      <a
        href="/pk.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--accent-500)] hover:underline"
      >
        Политики конфиденциальности
      </a>{" "}
      сайта.
    </>
  );

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-0)] p-6 shadow-[var(--shadow-card)] md:p-10"
        data-id={formId}
      >
        <h3 className="text-lg font-semibold uppercase tracking-wide text-[var(--text-primary)]">
          ФОРМА ДЛЯ ЗАПУСКА РАСЧЁТА
        </h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Введите ИНН и РНА для запуска подбора банков
        </p>

        <div className="mt-6 flex flex-col gap-6">
          <SegmentedControl
            options={[
              { value: "gostorgi", label: "Госторги" },
              { value: "commerce", label: "Коммерция" },
            ]}
            value={purchaseType}
            onChange={setPurchaseType}
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
            <Input
              label="ИНН Вашей компании"
              inputMode="numeric"
              autoComplete="off"
              error={errors.innAuto?.message}
              {...register("innAuto")}
            />
            <Input
              label="Реестровый номер закупки"
              inputMode="numeric"
              autoComplete="off"
              error={errors.numAuto?.message}
              {...register("numAuto")}
            />
            <Button type="submit" loading={isLoading} className="w-full lg:w-auto">
              ПОДОБРАТЬ БАНК
            </Button>
          </div>

          <Checkbox label={consentLabel} {...register("consent")} />
          {errors.consent && (
            <p className="text-xs text-[var(--error)]">{errors.consent.message}</p>
          )}
        </div>
      </form>

      <CommerceAutoModal onResult={onCommerceResult} />

      <Reveal>
        <p className="text-center text-sm leading-relaxed text-[var(--text-secondary)]">
          Согласуем для Вас <strong>нашу цену</strong> в любом из этих банков. Оплата{" "}
          <strong>напрямую</strong> в банк. <strong>Наша комиссия 0%</strong>. Вы нам
          ничего <strong>не платите</strong>.
        </p>
      </Reveal>

      {isLoading && (
        <div className="flex justify-center py-12" aria-live="polite">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--brand-600)] border-t-transparent" />
        </div>
      )}

      {errorMessage && !isLoading && (
        <p
          className="rounded-xl border border-[var(--error)]/20 bg-[var(--error)]/5 px-4 py-3 text-sm text-[var(--error)]"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {showPlaceholder && !tableHtml && !isLoading && !errorMessage && (
        <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)]">
          <Image
            src="/prof-p/table-example.png"
            alt="faketableauto"
            width={1180}
            height={333}
            className="h-auto w-full"
          />
        </div>
      )}

      {isMasked && Object.keys(autoPayload).length > 0 && (
        <MaskedResultsBanner
          payload={autoPayload}
          source="auto"
          onClear={() => {
            setTableHtml(null);
            setRawTableHtml(null);
            setIsMasked(false);
            setShowPlaceholder(true);
          }}
        />
      )}

      {tableHtml && calcContext && !isLoading && (
        <LegacyResultsTable
          html={tableHtml}
          masked={isMasked}
          source="auto"
          context={calcContext}
        />
      )}
    </div>
  );
}
