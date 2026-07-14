"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IMaskInput } from "react-imask";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useModals } from "@/components/modals/modal-provider";
import { LEGACY_API, legacyPost } from "@/lib/api";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Введите имя"),
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

export function GuaranteeRequestModal() {
  const { guaranteeOpen, guaranteeData, closeGuarantee } = useModals();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onClose = () => {
    closeGuarantee();
    setSuccess(false);
    setError(null);
    reset();
  };

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      const response = await legacyPost(LEGACY_API.callback, {
        FormName: guaranteeData?.fzLabel ?? "ЗАЯВКА НА ВЫПУСК ГАРАНТИИ",
        Phone: values.phone,
        Time: values.time ?? values.name,
      });
      const result = (await response.json()) as { result?: boolean };
      if (result.result) {
        setSuccess(true);
      } else {
        setError("Не удалось отправить заявку.");
      }
    } catch {
      setError("Ошибка соединения с сервером.");
    }
  };

  return (
    <Dialog
      open={guaranteeOpen}
      onClose={onClose}
      title="ЗАЯВКА НА ВЫПУСК ГАРАНТИИ"
    >
      {success ? (
        <div className="text-center">
          <p className="font-semibold">ЗАЯВКА ПОЛУЧЕНА!</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Скоро с Вами свяжется один из наших специалистов.
          </p>
          <Button type="button" className="mt-4" onClick={onClose}>
            Ок
          </Button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-[var(--text-secondary)]">
            Введите пожалуйста контактные данные и мы свяжемся с Вами по оформлению
            гарантии в рамках выбранного Вами федерального закона
            {guaranteeData ? `: ${guaranteeData.fz}` : ""}.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input label="Введите Ваше имя" error={errors.name?.message} {...register("name")} />

            <div className="relative w-full">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <IMaskInput
                    mask="+{7}(000)000-00-00"
                    value={field.value ?? ""}
                    onAccept={(value) => field.onChange(value)}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                    placeholder=" "
                    className={cn(
                      "peer h-12 w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-0)] px-4 pt-5 pb-1 text-sm",
                      "focus:border-[var(--accent-500)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-500)]/20",
                      errors.phone && "border-[var(--error)]",
                    )}
                  />
                )}
              />
              <label className="pointer-events-none absolute left-4 top-3 text-xs text-[var(--text-muted)]">
                Введите номер телефона
              </label>
              {errors.phone && (
                <p className="mt-1 text-xs text-[var(--error)]">{errors.phone.message}</p>
              )}
            </div>

            <Input
              label="Укажите удобное время звонка"
              error={errors.time?.message}
              {...register("time")}
            />

            <Checkbox
              label={
                <>
                  Оставляя отметку, я даю{" "}
                  <a href="/soglasie.pdf" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-500)] hover:underline">
                    согласие
                  </a>{" "}
                  на обработку персональных данных.
                </>
              }
              {...register("consent")}
            />
            {errors.consent && (
              <p className="text-xs text-[var(--error)]">{errors.consent.message}</p>
            )}

            {error && <p className="text-sm text-[var(--error)]">{error}</p>}

            <Button type="submit" loading={isSubmitting}>
              Отправить
            </Button>
          </form>
        </>
      )}
    </Dialog>
  );
}
