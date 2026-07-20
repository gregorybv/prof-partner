"use client";

import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useModals } from "@/components/modals/modal-provider";
import { LEGACY_API, legacyPost } from "@/lib/api";
import { base85XDecode } from "@/lib/legacy-decode";
import { hasActiveAntibotToken } from "@/lib/cookies";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";
import { maskLegacyTableHtml, unmaskLegacyTableHtml } from "@/lib/legacy-table";

const TYPE_OPTIONS = [
  { value: "participation", label: "Участие в закупке" },
  { value: "execution", label: "Исполнение контракта" },
  { value: "warrantyObligations", label: "Гарантийные обязательства" },
  { value: "avansReturn", label: "Возврат аванса" },
] as const;

const schema = z.object({
  TypeBg: z.enum(["participation", "execution", "warrantyObligations", "avansReturn"]),
  Summ: z.string().min(1, "Укажите сумму обеспечения"),
  inn: z
    .string()
    .min(10, "ИНН должен содержать от 10 до 12 цифр")
    .max(12, "ИНН должен содержать от 10 до 12 цифр")
    .regex(/^\d+$/, "ИНН должен содержать только цифры"),
  StartDate: z.string().min(1, "Укажите дату начала"),
  EndDate: z.string().min(1, "Укажите дату окончания"),
  consent: z.boolean().refine((v) => v === true, {
    message: "Необходимо дать согласие",
  }),
});

type FormValues = z.infer<typeof schema>;

type CommerceAutoModalProps = {
  onResult: (html: string, masked: boolean) => void;
};

export function CommerceAutoModal({ onResult }: CommerceAutoModalProps) {
  const { commerceOpen, closeCommerce, openAntibot, openLimit } = useModals();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const rawHtmlRef = useRef<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { TypeBg: "execution", consent: false },
  });

  const onClose = () => {
    closeCommerce();
    setError(null);
    reset();
    rawHtmlRef.current = null;
  };

  const publishResult = (decoded: string, masked: boolean) => {
    rawHtmlRef.current = decoded;
    onResult(masked ? maskLegacyTableHtml(decoded) : decoded, masked);
  };

  const onSubmit = async (values: FormValues) => {
    reachGoal(METRIKA_GOALS.AUTO_SELECT_BTN);

    const payload: Record<string, string> = {
      Fz: "Commercial",
      TypeBg: values.TypeBg,
      Summ: values.Summ.replace(/\s/g, ""),
      inn: values.inn,
      StartDate: values.StartDate,
      EndDate: values.EndDate,
      InstallmentPay: "on",
    };

    if (!hasActiveAntibotToken()) {
      openAntibot({
        context: "commerce",
        payload,
        onVerified: () => {
          if (rawHtmlRef.current) {
            onResult(unmaskLegacyTableHtml(rawHtmlRef.current), false);
          }
        },
      });
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await legacyPost(LEGACY_API.calcVar, payload);

      if (response.status === 403) {
        openLimit();
        reachGoal(METRIKA_GOALS.CALCULATOR_LIMIT);
        return;
      }

      const resultText = await response.text();
      let result: { result?: string } = {};
      try {
        result = JSON.parse(resultText) as { result?: string };
      } catch {
        setError("Некорректный ответ сервера.");
        return;
      }

      if (!result.result) {
        setError("Не удалось получить результат подбора.");
        return;
      }

      const decoded = base85XDecode(result.result);
      const masked = !hasActiveAntibotToken();
      publishResult(decoded, masked);
      reachGoal(METRIKA_GOALS.AUTO_SELECT);
      onClose();
    } catch {
      setError("Ошибка соединения с сервером.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={commerceOpen} onClose={onClose} title="Онлайн-автоподбор банка" className="max-w-lg">
      <p className="mb-4 text-sm text-(--text-secondary)">
        Заполните пожалуйста поля для запуска подбора.
      </p>

      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
        className="flex flex-col gap-4"
      >
        <div>
          <p className="mb-2 text-sm font-bold">Укажите вид требуемого обеспечения:</p>
          <Controller
            name="TypeBg"
            control={control}
            render={({ field }) => (
              <SegmentedControl
                options={[...TYPE_OPTIONS]}
                value={field.value}
                onChange={field.onChange}
                className="flex-wrap"
              />
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Сумма обеспечения" inputMode="numeric" error={errors.Summ?.message} {...register("Summ")} />
          <Input label="ИНН" inputMode="numeric" error={errors.inn?.message} {...register("inn")} />
        </div>

        <div>
          <p className="mb-2 text-sm font-bold">Укажите сроки обеспечения:</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Начало" placeholder="ДД.ММ.ГГГГ" error={errors.StartDate?.message} {...register("StartDate")} />
            <Input label="Окончание" placeholder="ДД.ММ.ГГГГ" error={errors.EndDate?.message} {...register("EndDate")} />
          </div>
        </div>

        <Checkbox
          label={
            <>
              Оставляя отметку, я даю{" "}
              <a href="/soglasie.pdf" target="_blank" rel="noopener noreferrer" className="text-(--accent-500) hover:underline">
                согласие
              </a>{" "}
              на обработку персональных данных.
            </>
          }
          error={errors.consent?.message}
          {...register("consent")}
        />

        {error && <p className="text-sm text-(--error)">{error}</p>}

        <Button type="submit" loading={isLoading}>
          ПОДОБРАТЬ БАНК
        </Button>
      </form>
    </Dialog>
  );
}
