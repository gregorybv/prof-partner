"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneInput } from "@/components/ui/phone-input";
import { useModals } from "@/components/modals/modal-provider";
import { LEGACY_API, legacyPost } from "@/lib/api";
import {
  buildSendModalTablePayload,
} from "@/lib/legacy-table";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";

const schema = z.object({
  phone: z
    .string()
    .min(16, "Введите полный номер телефона")
    .regex(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/),
  time: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "Необходимо дать согласие",
  }),
});

type FormValues = z.infer<typeof schema>;

function formatPercent(value: string) {
  if (!value || value === "0") return "Индивидуально";
  if (value === "Закрыто") return value;
  return `${value} %`;
}

function formatPrice(value: string) {
  if (!value || value === "0") return "Индивидуально";
  if (value === "Закрыто") return value;
  return `${value} ₽`;
}

export function BankTableRequestModal() {
  const { bankRequestOpen, bankRequestData, closeBankRequest, openSuccess } = useModals();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onClose = () => {
    closeBankRequest();
    setError(null);
    reset();
  };

  const onSubmit = async (values: FormValues) => {
    if (!bankRequestData) return;
    setError(null);

    const payload = buildSendModalTablePayload(
      bankRequestData,
      values.phone,
      values.time ?? "",
    );

    try {
      const response = await legacyPost(LEGACY_API.sendModalTable, payload);
      const result = (await response.json()) as { result?: boolean };

      if (result.result) {
        const goal =
          bankRequestData.source === "calculator"
            ? METRIKA_GOALS.FORM_CALCULATOR
            : METRIKA_GOALS.FORM_AUTO;
        reachGoal(goal);
        openSuccess({ message: "Скоро с Вами свяжется один из наших специалистов." });
        onClose();
      } else {
        setError("Не удалось отправить заявку.");
      }
    } catch {
      setError("Ошибка соединения с сервером.");
    }
  };

  return (
    <Dialog
      open={bankRequestOpen}
      onClose={onClose}
      title={`Отправка заявки по банку: ${bankRequestData?.bankName ?? ""}`}
      className="max-w-lg"
    >
      {bankRequestData && (
        <div className="mb-4 space-y-1 text-sm text-(--text-secondary)">
          <p>
            Закон/Вид гарантии: <span className="font-medium">{bankRequestData.context.fz}</span>
          </p>
          <p>
            Тип обеспечения: <span className="font-medium">{bankRequestData.context.typeBg}</span>
          </p>
          <p>
            Ставка: <span className="font-medium">{formatPercent(bankRequestData.percent)}</span>
          </p>
          <p>
            Цена: <span className="font-medium">{formatPrice(bankRequestData.price)}</span>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              label="Телефон"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              error={errors.phone?.message}
            />
          )}
        />

        <Input label="Удобное время для звонка" error={errors.time?.message} {...register("time")} />

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
          {...register("consent")}
        />
        {errors.consent && (
          <p className="text-xs text-(--error)">{errors.consent.message}</p>
        )}

        {error && <p className="text-sm text-(--error)">{error}</p>}

        <Button type="submit" loading={isSubmitting}>
          Отправить
        </Button>
      </form>
    </Dialog>
  );
}
