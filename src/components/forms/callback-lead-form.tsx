"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { LEGACY_API, legacyPost } from "@/lib/api";
import { METRIKA_GOALS, reachGoal } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const callbackSchema = z.object({
  phone: z
    .string()
    .min(16, "Введите полный номер телефона")
    .regex(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/, "Некорректный формат телефона"),
  time: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "Необходимо дать согласие на обработку персональных данных",
  }),
});

type CallbackValues = z.infer<typeof callbackSchema>;

type CallbackFormName = "ВРЕМЯ" | "РАСЧЕТ" | "КОМПАНИЯ";

const GOAL_BY_FORM: Record<
  CallbackFormName,
  { goal: (typeof METRIKA_GOALS)[keyof typeof METRIKA_GOALS]; paramsKey: string }
> = {
  ВРЕМЯ: { goal: METRIKA_GOALS.FORM_TIME, paramsKey: "formaVremya" },
  РАСЧЕТ: { goal: METRIKA_GOALS.FORM_CALCULATION, paramsKey: "formaRaschyot" },
  КОМПАНИЯ: { goal: METRIKA_GOALS.FORM_COMPANY, paramsKey: "formaCompaniya" },
};

type CallbackLeadFormProps = {
  formName?: CallbackFormName;
  className?: string;
  onSuccess?: () => void;
};

export function CallbackLeadForm({
  formName = "ВРЕМЯ",
  className,
  onSuccess,
}: CallbackLeadFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CallbackValues>({
    resolver: zodResolver(callbackSchema),
  });

  const consentLabel = (
    <>
      Оставляя отметку, я даю{" "}
      <a href="/soglasie.pdf" target="_blank" rel="noopener noreferrer" className="text-(--accent-500) hover:underline">
        согласие
      </a>{" "}
      на обработку моих персональных данных на условиях{" "}
      <a href="/pk.pdf" target="_blank" rel="noopener noreferrer" className="text-(--accent-500) hover:underline">
        Политики конфиденциальности
      </a>{" "}
      сайта.
    </>
  );

  const onSubmit = async (values: CallbackValues) => {
    setSubmitError(null);

    const { goal, paramsKey } = GOAL_BY_FORM[formName];
    reachGoal(goal, {
      [paramsKey]: {
        phone: values.phone,
        time: values.time ?? "",
      },
    });

    try {
      const response = await legacyPost(LEGACY_API.callback, {
        FormName: formName,
        Phone: values.phone,
        Time: values.time ?? "",
      });

      if (response.status === 403) {
        setSubmitError("Возникла ошибка! Попробуйте позже.");
        return;
      }

      const result = (await response.json()) as { result?: boolean };
      if (result.result) {
        setIsSuccess(true);
        reset();
        onSuccess?.();
      } else {
        setSubmitError("Не удалось отправить заявку. Попробуйте позже.");
      }
    } catch {
      setSubmitError("Ошибка соединения с сервером.");
    }
  };

  if (isSuccess) {
    return (
      <div className={cn("rounded-2xl border border-(--success)/20 bg-(--success)/5 p-6 text-center", className)}>
        <p className="font-semibold text-(--text-primary)">ЗАЯВКА НА ЗВОНОК ПОЛУЧЕНА!</p>
        <p className="mt-2 text-sm text-(--text-secondary)">
          Скоро с Вами свяжется один из наших специалистов.
        </p>
        <Button type="button" className="mt-4" onClick={() => setIsSuccess(false)}>
          Ок
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-4", className)} name={formName}>
      <Checkbox label={consentLabel} {...register("consent")} />
      {errors.consent && (
        <p className="text-xs text-(--error)">{errors.consent.message}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
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

        <Input
          label="Удобное время для звонка"
          error={errors.time?.message}
          {...register("time")}
        />
      </div>

      {submitError && (
        <p className="text-sm text-(--error)" role="alert">
          {submitError}
        </p>
      )}

      <Button type="submit" loading={isSubmitting} className="w-full sm:w-auto">
        Позвоните мне
      </Button>
    </form>
  );
}
