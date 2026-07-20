"use client";

import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneInput } from "@/components/ui/phone-input";
import { useModals } from "@/components/modals/modal-provider";
import { LEGACY_API, legacyPost } from "@/lib/api";
import { endDayCookieMaxAge, setCookie } from "@/lib/cookies";
import { sendQEmailAntibot, resolveEmailVariant } from "@/lib/email-calc";
import { METRIKA_GOALS, reachGoal, setMetrikaParams } from "@/lib/analytics";

const schema = z.object({
  phone: z
    .string()
    .min(16, "Введите полный номер телефона")
    .regex(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/),
  code: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "Необходимо дать согласие",
  }),
});

const emailSchema = z.object({
  email: z.string().email("Введите корректный email"),
  emailConsent: z.boolean().refine((v) => v === true, {
    message: "Необходимо дать согласие",
  }),
});

type FormValues = z.infer<typeof schema>;
type EmailFormValues = z.infer<typeof emailSchema>;

type AntibotResponse = {
  status?: string;
  type?: string;
  mess?: string;
  token?: string;
};

export function AntibotModal() {
  const {
    antibotOpen,
    antibotSession,
    closeAntibot,
    requestAntibotClose,
    resolveAntibot,
    openEmailCalc,
    openLimit,
    openSuccess,
  } = useModals();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [attention, setAttention] = useState<string | null>(null);
  const [codeHint, setCodeHint] = useState("Проверочное слово из 4-ёх букв. Например «день».");
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [isEmailSending, setIsEmailSending] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  });

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { emailConsent: false },
  });

  const code = useWatch({ control, name: "code" }) ?? "";

  const onClose = () => {
    if (antibotSession?.onCancel) {
      requestAntibotClose();
    } else {
      reachGoal(METRIKA_GOALS.ANTIBOT_CANCEL);
      closeAntibot();
    }
    setStep("phone");
    setAttention(null);
    setError(null);
    reset();
    emailForm.reset();
  };

  const openFullEmailModal = () => {
    if (!antibotSession) return;
    reachGoal(METRIKA_GOALS.EMAIL_CALC);
    openEmailCalc({
      variant: resolveEmailVariant(antibotSession.payload),
      source: antibotSession.context === "commerce" ? "commerce" : antibotSession.context,
      payload: antibotSession.payload,
    });
  };

  const onQuickEmailSubmit = async (values: EmailFormValues) => {
    if (!antibotSession) return;
    setIsEmailSending(true);
    setError(null);
    reachGoal(METRIKA_GOALS.EMAIL_CALC_REQUEST);
    reachGoal(METRIKA_GOALS.EMAIL_CALC);

    try {
      const session = {
        variant: resolveEmailVariant(antibotSession.payload),
        source: antibotSession.context === "commerce" ? "commerce" as const : antibotSession.context,
        payload: antibotSession.payload,
      };

      const result = await sendQEmailAntibot(session, values.email);
      if (result.status === "error") {
        openLimit();
        return;
      }

      requestAntibotClose();
      openSuccess({
        title: "ЗАЯВКА НА ПОЛУЧЕНИЕ РАСЧЁТА ПОЛУЧЕНА!",
        message:
          "Ваша заявка на получение расчёта получена, мы выслали Вам письмо для подтверждения запроса на отправку расчёта.",
      });
    } catch {
      setError("Ошибка соединения с сервером.");
    } finally {
      setIsEmailSending(false);
    }
  };

  const buildPayload = (values: FormValues) => {
    const params = new URLSearchParams();
    if (antibotSession?.payload) {
      Object.entries(antibotSession.payload).forEach(([key, value]) => {
        params.set(key, value);
      });
    }
    params.set("phone", values.phone);
    if (values.code) params.set("code", values.code);
    return params;
  };

  const onRequestCode = async (values: FormValues) => {
    setError(null);
    setAttention(null);
    setIsSending(true);
    reachGoal(METRIKA_GOALS.ANTIBOT_SMS, { "telefon-sms": values.phone });

    if (antibotSession?.context === "calculator") {
      setMetrikaParams({ formaAntiBotCalculator: { phone: values.phone } });
    } else {
      setMetrikaParams({ formaAntiBotAutoselect: { phone: values.phone } });
    }

    try {
      const response = await legacyPost(LEGACY_API.antibot, buildPayload(values));
      if (response.status === 403) {
        setError("Сервис временно недоступен. Попробуйте позже.");
        return;
      }

      const json = (await response.json()) as AntibotResponse;
      if (json.status === "error") {
        setAttention(json.mess ?? "Не удалось отправить СМС.");
        return;
      }

      if (json.token) {
        setCookie("token", json.token, { secure: true, "max-age": endDayCookieMaxAge() });
      }

      setStep("code");
      setValue("code", "");
      setCodeHint("Введите проверочное слово из СМС (4 буквы).");
    } catch {
      setError("Ошибка соединения с сервером.");
    } finally {
      setIsSending(false);
    }
  };

  const onVerifyCode = async (values: FormValues) => {
    if (!values.code || values.code.length !== 4) {
      setError("Введите проверочное слово из 4 букв.");
      return;
    }

    setError(null);
    setIsVerifying(true);

    try {
      const response = await legacyPost(LEGACY_API.antibotAuth, buildPayload(values));
      if (response.status === 403) {
        setError("Неверный проверочный код.");
        setCodeHint("Неверный проверочный код. Попробуйте ещё раз.");
        return;
      }

      setCookie("tokenActive", "true", { secure: true, "max-age": endDayCookieMaxAge() });
      setCookie("tokenCode", values.code, { secure: true, "max-age": endDayCookieMaxAge() });
      setCookie("CalcActive", "true", { secure: true, "max-age": endDayCookieMaxAge() });
      reachGoal(METRIKA_GOALS.ANTIBOT);
      resolveAntibot();
      reset();
      setStep("phone");
    } catch {
      setError("Ошибка соединения с сервером.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Dialog open={antibotOpen} onClose={onClose} title="АНТИ-БОТ ЗАЩИТА" className="max-w-md">
      <p className="mb-4 text-sm text-(--text-secondary)">
        Если Вы не робот, введите проверочное слово.{" "}
        <strong>Проверочное слово можно получить по СМС.</strong>
      </p>

      <form
        onSubmit={handleSubmit(step === "phone" ? onRequestCode : onVerifyCode)}
        className="flex flex-col gap-4"
      >
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              label="Номер телефона для получения СМС"
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              disabled={step === "code"}
              error={errors.phone?.message}
            />
          )}
        />

        {step === "phone" && (
          <>
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
            <Button type="submit" loading={isSending}>
              ОТПРАВИТЬ ПРОВЕРОЧНОЕ СЛОВО
            </Button>
          </>
        )}

        {step === "code" && (
          <>
            <Input
              label="Проверочное слово из СМС"
              maxLength={4}
              autoComplete="off"
              error={errors.code?.message}
              {...register("code")}
            />
            <p className="text-xs text-(--text-muted)">{codeHint}</p>
            <p className="text-xs text-(--text-muted)">
              Осталось ввести символов: {Math.max(0, 4 - code.length)} шт.
            </p>
            <Button type="submit" loading={isVerifying} disabled={code.length !== 4}>
              ПРИМЕНИТЬ
            </Button>
          </>
        )}

        {attention && <p className="text-sm text-(--warning)">{attention}</p>}
        {error && <p className="text-sm text-(--error)">{error}</p>}
      </form>

      <div className="mt-6 border-t border-(--border-subtle) pt-6">
        <p className="mb-3 text-center text-sm text-(--text-secondary)">
          Результаты расчёта без проверки можно{" "}
          <button
            type="button"
            className="font-medium text-(--accent-500) hover:underline"
            onClick={openFullEmailModal}
          >
            получить по электронной почте
          </button>
        </p>

        <form
          onSubmit={emailForm.handleSubmit(onQuickEmailSubmit)}
          className="flex flex-col gap-3"
        >
          <Input
            label="Введите Ваш e-mail"
            type="email"
            error={emailForm.formState.errors.email?.message}
            {...emailForm.register("email")}
          />
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
            error={emailForm.formState.errors.emailConsent?.message}
            {...emailForm.register("emailConsent")}
          />
          <Button type="submit" loading={isEmailSending} variant="secondary">
            Получить расчёт
          </Button>
        </form>
      </div>
    </Dialog>
  );
}
