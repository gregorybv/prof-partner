'use client';

import { useEffect, useState } from 'react';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Reveal } from '@/components/animations/reveal';
import { LegacyResultsTable } from '@/components/forms/legacy-results-table';
import { MaskedResultsBanner } from '@/components/forms/masked-results-banner';
import { useModals } from '@/components/modals/modal-provider';
import { Button } from '@/components/ui/button';
import { CalculatorProgress } from '@/components/ui/calculator-progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { LEGACY_API, legacyPost } from '@/lib/api';
import { METRIKA_GOALS, reachGoal } from '@/lib/analytics';
import { hasActiveAntibotToken } from '@/lib/cookies';
import { base85XDecode } from '@/lib/legacy-decode';
import {
  maskLegacyTableHtml,
  unmaskLegacyTableHtml,
  type CalcResultContext,
} from '@/lib/legacy-table';

const FZ_OPTIONS = [
  { value: '44', label: '44-ФЗ' },
  { value: '223', label: '223-ФЗ' },
  { value: '185', label: '185-ФЗ' },
  { value: 'Commercial', label: 'Коммерческий' },
] as const;

const TYPE_OPTIONS = [
  { value: 'participation', label: 'Участие' },
  { value: 'execution', label: 'Исполнение' },
  { value: 'warrantyObligations', label: 'Гарантийные обязательства' },
  { value: 'avansReturn', label: 'Возврат аванса' },
] as const;

const DURATION_UNIT_OPTIONS = [
  { value: '1', label: 'Недель' },
  { value: '2', label: 'Месяцев' },
  { value: '3', label: 'Лет' },
] as const;

const calculatorSchema = z
  .object({
    Fz: z.enum(['44', '223', '185', 'Commercial']),
    TypeBg: z.enum(['participation', 'execution', 'warrantyObligations', 'avansReturn']),
    Summ: z.string().min(1, 'Укажите сумму обеспечения'),
    StartDate: z.string().optional(),
    EndDate: z.string().optional(),
    duration: z.string().optional(),
    specific: z.enum(['1', '2', '3']),
    unknownDates: z.boolean(),
    hasAvans: z.boolean(),
    ThisIsNothinTo: z.boolean(),
    ThisIsNothin: z.boolean(),
    customerFormTableModal: z.boolean(),
    InstallmentPay: z.boolean(),
    NetLossLastYear: z.boolean(),
    noExperienceTableModal: z.boolean(),
    BlockBankAccount: z.boolean(),
    ClosedTender: z.boolean(),
    CourierDelivery: z.boolean(),
    Arbitration: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!data.unknownDates) {
      if (!data.StartDate) {
        ctx.addIssue({ code: 'custom', message: 'Укажите дату начала', path: ['StartDate'] });
      }
      if (!data.EndDate) {
        ctx.addIssue({ code: 'custom', message: 'Укажите дату окончания', path: ['EndDate'] });
      }
    } else if (!data.duration) {
      ctx.addIssue({ code: 'custom', message: 'Укажите срок гарантии', path: ['duration'] });
    }
  });

type CalculatorValues = z.infer<typeof calculatorSchema>;
type CalcResponse = { result?: string };

function buildPayload(values: CalculatorValues): URLSearchParams {
  const params = new URLSearchParams();
  const summ = values.Summ.replace(/\s/g, '');

  params.set('Fz', values.Fz);
  params.set('TypeBg', values.TypeBg);
  params.set('Summ', summ);
  params.set('specific', values.specific);

  if (values.unknownDates) {
    if (values.duration) params.set('duration', values.duration);
  } else {
    if (values.StartDate) params.set('StartDate', values.StartDate);
    if (values.EndDate) params.set('EndDate', values.EndDate);
  }

  const flags: Array<[keyof CalculatorValues, string]> = [
    ['ThisIsNothinTo', 'ThisIsNothinTo'],
    ['ThisIsNothin', 'ThisIsNothin'],
    ['customerFormTableModal', 'customerFormTableModal'],
    ['InstallmentPay', 'InstallmentPay'],
    ['NetLossLastYear', 'NetLossLastYear'],
    ['noExperienceTableModal', 'noExperienceTableModal'],
    ['BlockBankAccount', 'BlockBankAccount'],
    ['ClosedTender', 'ClosedTender'],
    ['CourierDelivery', 'CourierDelivery'],
    ['Arbitration', 'Arbitration'],
  ];

  flags.forEach(([key, name]) => {
    if (values[key]) params.set(name, 'on');
  });

  return params;
}

function paramsToRecord(params: URLSearchParams): Record<string, string> {
  const record: Record<string, string> = {};
  params.forEach((value, key) => {
    record[key] = value;
  });
  return record;
}

function buildCalcContext(values: CalculatorValues): CalcResultContext {
  const fzLabel = FZ_OPTIONS.find((item) => item.value === values.Fz)?.label ?? values.Fz;
  const typeLabel =
    TYPE_OPTIONS.find((item) => item.value === values.TypeBg)?.label ?? values.TypeBg;

  return {
    fz: fzLabel,
    typeBg: typeLabel,
    summ: values.Summ.replace(/\s/g, ''),
    startDate: values.StartDate ?? '',
    endDate: values.EndDate ?? '',
    inn: '',
    regnum: '',
    flags: {
      hasAvans: values.hasAvans,
      netLossLastYear: values.NetLossLastYear,
      noExperience: values.noExperienceTableModal,
      blockBankAccount: values.BlockBankAccount,
      arbitration: values.Arbitration,
      closedTender: values.ClosedTender,
      customerForm: values.customerFormTableModal,
      courierDelivery: values.CourierDelivery,
      installmentPay: values.InstallmentPay,
      d1: false,
      d2: false,
      d3: false,
      d4: false,
    },
  };
}

export function CalculatorForm() {
  const { openLimit, openAntibot } = useModals();
  const [tableHtml, setTableHtml] = useState<string | null>(null);
  const [rawTableHtml, setRawTableHtml] = useState<string | null>(null);
  const [isMasked, setIsMasked] = useState(false);
  const [calcContext, setCalcContext] = useState<CalcResultContext | null>(null);
  const [calcPayload, setCalcPayload] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CalculatorValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      Fz: '44',
      TypeBg: 'execution',
      specific: '2',
      unknownDates: false,
      hasAvans: false,
      ThisIsNothinTo: false,
      ThisIsNothin: false,
      customerFormTableModal: false,
      InstallmentPay: false,
      NetLossLastYear: false,
      noExperienceTableModal: false,
      BlockBankAccount: false,
      ClosedTender: false,
      CourierDelivery: false,
      Arbitration: false,
    },
  });

  const unknownDates = useWatch({ control, name: 'unknownDates' });

  useEffect(() => {
    if (!isLoading) return;
    const t1 = window.setTimeout(() => setProgressStep(2), 1200);
    return () => window.clearTimeout(t1);
  }, [isLoading]);

  const unmaskResults = () => {
    if (rawTableHtml) {
      setTableHtml(unmaskLegacyTableHtml(rawTableHtml));
      setIsMasked(false);
    }
  };

  const onSubmit = async (values: CalculatorValues) => {
    reachGoal(METRIKA_GOALS.CALCULATOR_BTN);
    setIsLoading(true);
    setProgressStep(1);
    setError(null);
    setShowPlaceholder(false);
    setTableHtml(null);
    setRawTableHtml(null);

    const payload = buildPayload(values);
    const payloadRecord = paramsToRecord(payload);
    const context = buildCalcContext(values);
    setCalcContext(context);
    setCalcPayload(payloadRecord);

    const needsAntibot = !hasActiveAntibotToken();
    if (needsAntibot) {
      reachGoal(METRIKA_GOALS.ANTIBOT);
      openAntibot({
        context: 'calculator',
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

    try {
      const response = await legacyPost(LEGACY_API.calc, payload);

      if (response.status === 403) {
        openLimit();
        reachGoal(METRIKA_GOALS.CALCULATOR_LIMIT);
        return;
      }

      const resultText = await response.text();
      let result: CalcResponse = {};
      try {
        result = JSON.parse(resultText) as CalcResponse;
      } catch {
        setError('Некорректный ответ сервера.');
        return;
      }

      if (result.result) {
        const decoded = base85XDecode(result.result);
        setRawTableHtml(decoded);
        const displayHtml = needsAntibot ? maskLegacyTableHtml(decoded) : decoded;
        setTableHtml(displayHtml);
        setIsMasked(needsAntibot);
        setProgressStep(3);
        reachGoal(METRIKA_GOALS.CALCULATOR, {
          kalkulayator: {
            law: values.Fz,
            type: values.TypeBg,
            summ: values.Summ,
            startdate: values.StartDate ?? '',
            endtdate: values.EndDate ?? '',
          },
        });
      } else {
        setError('Для отображения данных заполните поля калькулятора.');
      }
    } catch {
      setError('Ошибка соединения с сервером.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-3xl border border-(--border-subtle) bg-(--surface-0) p-6 shadow-(--shadow-card) md:p-8"
      >
        <Controller
          name="Fz"
          control={control}
          render={({ field }) => (
            <SegmentedControl
              options={[...FZ_OPTIONS]}
              value={field.value}
              onChange={(v) => {
                field.onChange(v);
                if (v === '185') setValue('TypeBg', 'execution');
              }}
              className="mb-6 w-full flex-wrap"
            />
          )}
        />

        <Controller
          name="TypeBg"
          control={control}
          render={({ field }) => (
            <SegmentedControl
              options={[...TYPE_OPTIONS]}
              value={field.value}
              onChange={field.onChange}
              className="mb-6 w-full flex-wrap"
            />
          )}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Input
            label="Сумма обеспечения"
            inputMode="numeric"
            error={errors.Summ?.message}
            {...register('Summ')}
          />

          {!unknownDates ? (
            <>
              <Input
                label="Начало"
                placeholder="ДД.ММ.ГГГГ"
                error={errors.StartDate?.message}
                {...register('StartDate')}
              />
              <Input
                label="Окончание"
                placeholder="ДД.ММ.ГГГГ"
                error={errors.EndDate?.message}
                {...register('EndDate')}
              />
            </>
          ) : (
            <>
              <Input
                label="Срок гарантии"
                error={errors.duration?.message}
                {...register('duration')}
              />
              <Controller
                name="specific"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-(--text-muted)">Единица срока</label>
                    <SegmentedControl
                      options={[...DURATION_UNIT_OPTIONS]}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                )}
              />
            </>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <Checkbox
            label="Неизвестный даты действия гарантии, указать срок"
            {...register('unknownDates')}
          />
          <Checkbox label="Наличие аванса" {...register('hasAvans')} />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Checkbox label="Без открытия р/с" {...register('ThisIsNothinTo')} />
          <Checkbox label="Без залога" {...register('ThisIsNothin')} />
          <Checkbox label="Форма гарантии от заказчика" {...register('customerFormTableModal')} />
          <Checkbox label="Рассрочка по оплате" {...register('InstallmentPay')} />
        </div>

        <p className="mt-6 text-sm font-bold text-(--text-primary)">
          Дополнительные параметры:
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Checkbox label="Убыточная деятельность" {...register('NetLossLastYear')} />
          <Checkbox label="Отсутствие опыта" {...register('noExperienceTableModal')} />
          <Checkbox label="Блокировка расчётного счёта" {...register('BlockBankAccount')} />
          <Checkbox label="Закрытый аукцион" {...register('ClosedTender')} />
          <Checkbox label="Доставка курьером" {...register('CourierDelivery')} />
          <Checkbox label="Наличие судебных дел" {...register('Arbitration')} />
        </div>

        <Button type="submit" loading={isLoading} className="mt-8">
          Рассчитать
        </Button>
      </form>

      <CalculatorProgress active={isLoading} step={progressStep} />

      <Reveal>
        <p className="text-center text-sm text-(--text-secondary)">
          Согласуем для Вас <strong>нашу цену</strong> в любом из этих банков. Оплата{' '}
          <strong>напрямую</strong> в банк. <strong>Наша комиссия 0%</strong>. Вы нам ничего{' '}
          <strong>не платите</strong>.
        </p>
      </Reveal>

      {error && !isLoading && (
        <p
          className="rounded-xl border border-(--error)/20 bg-(--error)/5 px-4 py-3 text-sm text-(--error)"
          role="alert"
        >
          {error}
        </p>
      )}

      {showPlaceholder && !tableHtml && !isLoading && !error && (
        <div className="overflow-hidden rounded-2xl border border-(--border-subtle)">
          <Image
            src="/prof-p/table-example.png"
            alt="Для отображения данных заполните поля калькулятора"
            width={1180}
            height={333}
            className="h-auto w-full"
          />
          <p className="px-4 py-3 text-center text-sm text-(--text-muted)">
            Для отображения данных заполните поля калькулятора.
          </p>
        </div>
      )}

      {isMasked && calcPayload && Object.keys(calcPayload).length > 0 && (
        <MaskedResultsBanner
          payload={calcPayload}
          source="calculator"
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
          source="calculator"
          context={calcContext}
        />
      )}
    </div>
  );
}
