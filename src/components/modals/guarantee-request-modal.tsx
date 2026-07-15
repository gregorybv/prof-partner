"use client";

import { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
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

const GUARANTEE_PURPOSE_VALUES = [
  "Участие в закупке",
  "Исполнение контракта",
  "Гарантийные обязательства",
  "Возврат аванса",
] as const;

const schema = z.object({
  guaranteePurposes: z
    .array(z.enum(GUARANTEE_PURPOSE_VALUES))
    .min(1, "Выберите хотя бы один вид обеспечения"),
  contractAmount: z.string().optional(),
  securityAmount: z.string().optional(),
  name: z.string().min(2, "Введите имя"),
  phone: z
    .string()
    .min(16, "Введите полный номер телефона")
    .regex(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/),
  callTime: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "Необходимо дать согласие",
  }),
}).refine((values) => {
  return Boolean(values.contractAmount?.trim() || values.securityAmount?.trim());
}, {
  path: ["contractAmount"],
  message: "Укажите сумму контракта или сумму обеспечения",
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
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      guaranteePurposes: [],
      contractAmount: "",
      securityAmount: "",
      name: "",
      phone: "",
      callTime: "",
      consent: false,
    },
  });

  const selectedPurposes = useWatch({ control, name: "guaranteePurposes" }) ?? [];

  const onClose = () => {
    closeGuarantee();
    setSuccess(false);
    setError(null);
    reset();
  };

  const onSubmit = async (values: FormValues) => {
    setError(null);

    const details = [
      `ФЗ/тип: ${guaranteeData?.fz ?? "-"}`,
      `Вид обеспечения: ${values.guaranteePurposes.join(", ")}`,
      `Сумма контракта: ${values.contractAmount?.trim() || "-"}`,
      `Сумма обеспечения: ${values.securityAmount?.trim() || "-"}`,
      `Контакт: ${values.name}`,
      `Время звонка: ${values.callTime?.trim() || "-"}`,
    ].join(" | ");

    try {
      const response = await legacyPost(LEGACY_API.callback, {
        FormName: guaranteeData?.fzLabel ?? "ЗАЯВКА НА ВЫПУСК ГАРАНТИИ",
        Phone: values.phone,
        Time: details,
        Name: values.name,
        CallTime: values.callTime?.trim() || "",
        GuaranteePurposes: values.guaranteePurposes.join(", "),
        ContractAmount: values.contractAmount?.trim() || "",
        SecurityAmount: values.securityAmount?.trim() || "",
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
      ariaLabel="Заявка на выпуск гарантии"
      className="max-h-[96vh] max-w-3xl p-4"
    >
      {success ? (
        <div className="text-center">
          <p className="font-semibold">ЗАЯВКА ПОЛУЧЕНА!</p>
          <p className="mt-2 text-sm text-(--text-secondary)">
            Скоро с Вами свяжется один из наших специалистов.
          </p>
          <Button type="button" className="mt-4" onClick={onClose}>
            Ок
          </Button>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <div>
              <p className="mb-1 pr-10 font-display text-lg leading-tight text-(--text-primary)">
                Укажите вид/виды требуемого обеспечения:
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {GUARANTEE_PURPOSE_VALUES.map((purpose) => {
                  const checked = selectedPurposes.includes(purpose);
                  return (
                    <Checkbox
                      key={purpose}
                      checked={checked}
                      onChange={(event) => {
                        const isChecked = event.target.checked;
                        const current = selectedPurposes;
                        setValue(
                          "guaranteePurposes",
                          isChecked
                            ? [...current, purpose]
                            : current.filter((item) => item !== purpose),
                          { shouldValidate: true },
                        );
                      }}
                      label={<span className="text-sm text-(--text-primary)">{purpose}</span>}
                    />
                  );
                })}
              </div>
              {errors.guaranteePurposes && (
                <p className="mt-1 text-xs leading-tight text-(--error)">
                  {errors.guaranteePurposes.message}
                </p>
              )}
            </div>

            <div>
              <p className="mb-1 font-display text-lg leading-tight text-(--text-primary)">
                Укажите сумму контракта или сумму обеспечения:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Сумма контракта"
                  error={errors.contractAmount?.message}
                  className="h-11 pt-4"
                  {...register("contractAmount")}
                />
                <Input
                  label="Сумма обеспечения"
                  className="h-11 pt-4"
                  {...register("securityAmount")}
                />
              </div>
            </div>

            <div>
              <p className="mb-1 font-display text-lg leading-tight text-(--text-primary)">
                Укажите Ваши контактные данные:
              </p>
              <Input
                label="Как к Вам можно обращаться?"
                error={errors.name?.message}
                className="h-11 pt-4"
                {...register("name")}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="w-full">
                <div className="relative">
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <IMaskInput
                        mask="+{7}(000)000-00-00"
                        value={field.value ?? ""}
                        onAccept={(value) => field.onChange(value)}
                        onChange={() => {}}
                        onBlur={field.onBlur}
                        inputRef={field.ref}
                        placeholder=" "
                        className={cn(
                          "peer h-11 w-full rounded-xl border border-(--border-default) bg-(--surface-0) px-4 pt-4 pb-1 text-sm",
                          "placeholder-transparent focus:border-(--accent-500) focus:outline-none focus:ring-2 focus:ring-(--accent-500)/20",
                          errors.phone && "border-(--error)",
                        )}
                      />
                    )}
                  />
                  <label className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-(--text-muted) transition-all peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-(--accent-500) peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs">
                    Номер телефона
                  </label>
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-(--error)">{errors.phone.message}</p>
                )}
              </div>

              <Input
                label="Время для звонка"
                error={errors.callTime?.message}
                className="h-11 pt-4"
                {...register("callTime")}
              />
            </div>

            <Checkbox
              label={
                <>
                  Оставляя отметку, я даю{" "}
                  <a href="/soglasie.pdf" target="_blank" rel="noopener noreferrer" className="text-(--accent-500) hover:underline">
                    согласие
                  </a>{" "}
                  на обработку моих персональных данных в соответствии с условиями{" "}
                  <a href="/pk.pdf" target="_blank" rel="noopener noreferrer" className="text-(--accent-500) hover:underline">
                    Политики конфиденциальности
                  </a>{" "}
                  сайта.
                </>
              }
              {...register("consent")}
            />
            {errors.consent && (
              <p className="text-xs text-(--error)">{errors.consent.message}</p>
            )}

            <div className="-mx-4 sticky bottom-0 z-10 border-t border-(--border-default) bg-(--surface-0)/95 px-4 pb-1 pt-2 backdrop-blur-sm">
              {error && <p className="mb-2 text-sm text-(--error)">{error}</p>}
              <Button type="submit" size="sm" loading={isSubmitting} className="w-full">
                Отправить
              </Button>
            </div>
          </form>
        </>
      )}
    </Dialog>
  );
}
