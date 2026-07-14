import { LEGACY_API, legacyPost } from "@/lib/api";

export type EmailCalcVariant = "gostorgi" | "commercial";
export type EmailCalcSource = "calculator" | "auto" | "commerce";

export type EmailCalcSession = {
  variant: EmailCalcVariant;
  source: EmailCalcSource;
  payload: Record<string, string>;
};

export type EmailCalcStep = "request" | "followup" | "refined" | "confirmation";

export type SendQEmailResponse = {
  status?: string;
  step?: string;
  mess_time?: string;
  mess_queue?: string;
};

export function resolveEmailVariant(payload: Record<string, string>): EmailCalcVariant {
  return payload.Fz === "Commercial" ? "commercial" : "gostorgi";
}

export function mergeEmailPayload(
  session: EmailCalcSession,
  fields: Record<string, string>,
): URLSearchParams {
  const params = new URLSearchParams();
  Object.entries(session.payload).forEach(([key, value]) => params.set(key, value));
  Object.entries(fields).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  return params;
}

export async function sendQEmailStep1(
  session: EmailCalcSession,
  fields: Record<string, string>,
): Promise<SendQEmailResponse> {
  const response = await legacyPost(LEGACY_API.sendQEmail1, mergeEmailPayload(session, fields));
  if (response.status === 403) throw new Error("limit");
  return response.json() as Promise<SendQEmailResponse>;
}

export async function sendQEmailStep2(
  session: EmailCalcSession,
  fields: Record<string, string>,
): Promise<SendQEmailResponse> {
  const response = await legacyPost(LEGACY_API.sendQEmail2, mergeEmailPayload(session, fields));
  if (response.status === 403) throw new Error("limit");
  return response.json() as Promise<SendQEmailResponse>;
}

export async function sendQEmailAntibot(
  session: EmailCalcSession,
  email: string,
): Promise<SendQEmailResponse> {
  const response = await legacyPost(
    LEGACY_API.sendQEmail3,
    mergeEmailPayload(session, { emailQEmailAntibot: email, InstallmentPay: "on" }),
  );
  if (response.status === 403) throw new Error("limit");
  return response.json() as Promise<SendQEmailResponse>;
}
