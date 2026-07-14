export type CalcResultContext = {
  fz: string;
  typeBg: string;
  summ: string;
  startDate: string;
  endDate: string;
  inn: string;
  regnum: string;
  flags: Record<string, boolean>;
};

export type BankTableRequestData = {
  source: "calculator" | "auto";
  bankName: string;
  hiddenBankName?: string;
  percent: string;
  price: string;
  discount?: string;
  context: CalcResultContext;
};

export function maskLegacyTableHtml(html: string): string {
  if (typeof window === "undefined") return html;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html.trim();

  wrapper.querySelectorAll("td[data-fckd]:not(.notprobka)").forEach((cell) => {
    cell.classList.add("probka");
    const img = cell.querySelector("img");
    if (img) img.setAttribute("style", "display:none");
  });

  return wrapper.innerHTML;
}

export function unmaskLegacyTableHtml(html: string): string {
  if (typeof window === "undefined") return html;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html.trim();

  wrapper.querySelectorAll("td[data-fckd]").forEach((cell) => {
    cell.classList.remove("probka");
    const img = cell.querySelector("img");
    if (img) img.removeAttribute("style");
  });

  return wrapper.innerHTML;
}

export function parseBankTableButton(
  target: HTMLElement,
  context: CalcResultContext,
  source: "calculator" | "auto",
): BankTableRequestData | null {
  const button = target.closest(".btnTableModal") as HTMLElement | null;
  if (!button) return null;

  const dataset = button.dataset;
  const bankName = dataset.name ?? "";
  if (!bankName && dataset.type === "hide") return null;

  return {
    source,
    bankName: dataset.type === "hide" ? "" : bankName,
    hiddenBankName: dataset.hidename,
    percent: dataset.persent ?? "",
    price: dataset.price ?? "",
    discount: dataset.dicount,
    context,
  };
}

export function buildSendModalTablePayload(
  data: BankTableRequestData,
  phone: string,
  time: string,
): URLSearchParams {
  const params = new URLSearchParams();
  const { context } = data;

  params.set("beginDateTableModal", context.startDate);
  params.set("endDateTableModal", context.endDate);
  params.set("innFormTableModal", context.inn);
  params.set("regnumBgFormTableModal", context.regnum);
  params.set("fzFormTableModal", context.fz);
  params.set("typeBgFormTableModal", context.typeBg);
  params.set("summFormTableModal", context.summ);
  params.set("nameFormTableModal", data.bankName);
  params.set("hidenameFormTableModal", data.hiddenBankName ?? "");
  params.set("persentFormTableModal", data.percent);
  params.set("ourPriceFormTableModal", data.price);
  params.set("discountFormTableModal", data.discount ?? "");
  params.set("phoneTableModal", phone);
  params.set("timeTableModal", time);
  params.set("d1", data.context.flags.d1 ? "on" : "");
  params.set("d2", data.context.flags.d2 ? "on" : "");
  params.set("d3", data.context.flags.d3 ? "on" : "");
  params.set("d4", data.context.flags.d4 ? "on" : "");

  const flagMap: Array<[keyof CalcResultContext["flags"], string]> = [
    ["netLossLastYear", "netLossLastYearTableModal"],
    ["noExperience", "noExperienceTableModal"],
    ["blockBankAccount", "blockBankAccountTableModal"],
    ["arbitration", "arbitrationTableModal"],
    ["closedTender", "closedTenderTableModal"],
    ["customerForm", "customerFormTableModal"],
    ["courierDelivery", "courierDeliveryTableModal"],
    ["installmentPay", "installmentPayTableModal"],
  ];

  flagMap.forEach(([key, field]) => {
    if (context.flags[key]) params.set(field, "on");
  });

  const avans = context.flags.hasAvans ? "Да" : "Нет";
  params.set("avansFormTableModal", avans);
  params.set("typeAvansFormTableModal", avans);

  return params;
}
