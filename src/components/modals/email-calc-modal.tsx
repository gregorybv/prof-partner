"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useModals } from "@/components/modals/modal-provider";
import {
  sendQEmailStep1,
  sendQEmailStep2,
  type EmailCalcStep,
} from "@/lib/email-calc";
import { METRIKA_GOALS, reachGoal, setMetrikaParams } from "@/lib/analytics";

const requestSchema = z.object({
  emailQEmail: z.string().email("Введите корректный email"),
  innQEmail: z.string().optional(),
  rnaQEmail: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "Необходимо дать согласие",
  }),
});

const followupSchema = z.object({
  emailQEmail: z.string().email(),
  innQEmail: z.string().optional(),
  rnaQEmail: z.string().optional(),
});

type RequestValues = z.infer<typeof requestSchema>;
type FollowupValues = z.infer<typeof followupSchema>;

const consentLabel = (
  <>
    Оставляя отметку, я даю{" "}
    <a href="/soglasie.pdf" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-500)] hover:underline">
      согласие
    </a>{" "}
    на обработку персональных данных на условиях{" "}
    <a href="/pk.pdf" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-500)] hover:underline">
      Политики конфиденциальности
    </a>{" "}
    сайта.
  </>
);

export function EmailCalcModal() {
  const {
    emailCalcOpen,
    emailCalcSession,
    closeEmailCalc,
    openLimit,
    openSuccess,
  } = useModals();

  const [step, setStep] = useState<EmailCalcStep>("request");
  const [queueTime, setQueueTime] = useState<string | null>(null);
  const [queuePosition, setQueuePosition] = useState<string | null>(null);
  const [savedEmail, setSavedEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const requestForm = useForm<RequestValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: { consent: false },
  });

  const followupForm = useForm<FollowupValues>({
    resolver: zodResolver(followupSchema),
    defaultValues: { emailQEmail: "" },
  });

  const isCommercial = emailCalcSession?.variant === "commercial";

  const resetState = () => {
    setStep("request");
    setQueueTime(null);
    setQueuePosition(null);
    setSavedEmail("");
    setError(null);
    requestForm.reset();
    followupForm.reset();
  };

  const onClose = () => {
    reachGoal(METRIKA_GOALS.EMAIL_CALC_CANCEL);
    closeEmailCalc();
    resetState();
  };

  const handleLimit = () => {
    openLimit();
    onClose();
  };

  const onRequestSubmit = async (values: RequestValues) => {
    if (!emailCalcSession) return;
    setError(null);
    reachGoal(METRIKA_GOALS.EMAIL_CALC);

    if (emailCalcSession.source === "calculator") {
      setMetrikaParams({ formaEmailRequestCalculator: { email: values.emailQEmail } });
    } else {
      setMetrikaParams({ formaEmailRequestAutoselect: { email: values.emailQEmail } });
    }

    try {
      const result = await sendQEmailStep1(emailCalcSession, {
        emailQEmail: values.emailQEmail,
        innQEmail: values.innQEmail ?? "",
        rnaQEmail: values.rnaQEmail ?? "",
        InstallmentPay: "on",
      });

      if (result.status === "error") {
        handleLimit();
        return;
      }

      setSavedEmail(values.emailQEmail);
      followupForm.setValue("emailQEmail", values.emailQEmail);

      if (result.step === "3") {
        reachGoal(METRIKA_GOALS.EMAIL_CALC_SENT_FULL);
        setStep("refined");
        return;
      }

      if (result.step === "2") {
        reachGoal(METRIKA_GOALS.EMAIL_CALC_SENT_BASIC);
        reachGoal(METRIKA_GOALS.EMAIL_CALC_ACCEPTED);
        if (result.mess_time) setQueueTime(result.mess_time);
        if (result.mess_queue) setQueuePosition(result.mess_queue);
        setStep("followup");
        return;
      }

      openSuccess({
        title: "ЗАЯВКА НА ПОЛУЧЕНИЕ РАСЧЁТА ПОЛУЧЕНА!",
        message:
          "Ваша заявка на получение расчёта получена, мы выслали Вам письмо для подтверждения запроса на отправку расчёта.",
      });
      onClose();
    } catch {
      setError("Ошибка соединения с сервером.");
    }
  };

  const onFollowupSubmit = async (values: FollowupValues) => {
    if (!emailCalcSession) return;
    setError(null);

    try {
      const result = await sendQEmailStep2(emailCalcSession, {
        emailQEmail: values.emailQEmail,
        innQEmail: values.innQEmail ?? "",
        rnaQEmail: values.rnaQEmail ?? "",
      });

      if (result.status === "error") {
        handleLimit();
        return;
      }

      if (result.step === "3") {
        reachGoal(METRIKA_GOALS.EMAIL_CALC_INN_SENT);
        setStep("refined");
        return;
      }

      if (result.mess_time) setQueueTime(result.mess_time);
      if (result.mess_queue) setQueuePosition(result.mess_queue);
    } catch {
      setError("Ошибка соединения с сервером.");
    }
  };

  const titleByStep: Record<EmailCalcStep, string> = {
    request: isCommercial ? "Отправка расчёта на электронную почту" : "ОТПРАВИТЬ РАСЧЁТ НА ПОЧТУ?",
    followup: "Заявка отправлена",
    refined: "Заявка отправлена",
    confirmation: "Заявка отправлена",
  };

  return (
    <Dialog
      open={emailCalcOpen}
      onClose={onClose}
      title={titleByStep[step]}
      className="max-w-lg"
    >
      {step === "request" && (
        <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="flex flex-col gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            {isCommercial
              ? "Для отправки текущего расчёта на почту, введите адрес электронной почты:"
              : "Отправить результат расчета на почту?"}
          </p>

          <Input
            label="Введите электронную почту"
            type="email"
            error={requestForm.formState.errors.emailQEmail?.message}
            {...requestForm.register("emailQEmail")}
          />

          <Checkbox label={consentLabel} {...requestForm.register("consent")} />
          {requestForm.formState.errors.consent && (
            <p className="text-xs text-[var(--error)]">
              {requestForm.formState.errors.consent.message}
            </p>
          )}

          <Button type="submit" loading={requestForm.formState.isSubmitting}>
            Получить расчёт
          </Button>

          <p className="text-sm text-[var(--text-muted)]">
            {isCommercial
              ? "Для получения уточненного расчёта под Вашу компанию, введите дополнительно ИНН и предмет контракта:"
              : "Для получения уточненного расчёта под Вашу компанию, введите дополнительно ИНН и РНА:"}
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              label="ИНН Вашей компании"
              {...requestForm.register("innQEmail")}
            />
            <Input
              label={isCommercial ? "Предмет контракта" : "Реестровый номер аукциона"}
              {...requestForm.register("rnaQEmail")}
            />
          </div>

          <Image
            src="/prof-p/qemail.png"
            alt=""
            width={400}
            height={120}
            className="mx-auto h-auto w-full max-w-xs opacity-80"
          />

          {error && <p className="text-sm text-[var(--error)]">{error}</p>}
        </form>
      )}

      {step === "followup" && (
        <form onSubmit={followupForm.handleSubmit(onFollowupSubmit)} className="flex flex-col gap-4">
          <p className="text-center text-sm font-semibold">
            Ваша заявка на отправку автоматического расчета принята:
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Чтобы письма с нашего сервера не попадали в спам, наш почтовый сервер отправляет
            результаты калькуляций не чаще одного раза в пять минут.
          </p>
          {queueTime && queuePosition ? (
            <>
              <p className="text-sm">ВРЕМЯ ДО ОТПРАВКИ ПИСЬМА: {queueTime}</p>
              <p className="text-sm">ВАША ПОЗИЦИЯ В ОЧЕРЕДИ: {queuePosition}</p>
            </>
          ) : (
            <p className="text-sm text-[var(--text-secondary)]">
              Автоматическая отправка как правило происходит в течение 2–3 часов. Пожалуйста,
              ожидайте письмо.
            </p>
          )}
          <p className="text-sm text-[var(--text-secondary)]">
            {isCommercial
              ? "Для быстрого получения расчета укажите ИНН и предмет контракта — расчёт подготовит менеджер."
              : "Для быстрого получения расчета укажите ИНН и РНА — расчёт подготовит менеджер."}
          </p>

          <input type="hidden" {...followupForm.register("emailQEmail")} value={savedEmail} />

          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="ИНН Вашей компании" {...followupForm.register("innQEmail")} />
            <Input
              label={isCommercial ? "Предмет контракта" : "Реестровый номер аукциона"}
              {...followupForm.register("rnaQEmail")}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Закрыть
            </Button>
            <Button type="submit" loading={followupForm.formState.isSubmitting}>
              {isCommercial ? "Отправить ИНН и предмет контракта" : "Отправить ИНН и РНА"}
            </Button>
          </div>

          {error && <p className="text-sm text-[var(--error)]">{error}</p>}
        </form>
      )}

      {step === "refined" && (
        <div className="flex flex-col gap-4">
          <p className="text-center text-sm font-semibold">
            Ваша заявка на отправку расчета принята:
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Так как Вы выбрали уточненный расчет, сообщив нам{" "}
            {isCommercial ? "ИНН и предмет контракта" : "ИНН и РНА"}, расчет подготовит и
            отправит наш менеджер.
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Пожалуйста ожидайте письмо, оно будет отправлено в самое ближайшее время.
          </p>
          <Button type="button" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      )}
    </Dialog>
  );
}
