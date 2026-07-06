/** Legacy PHP backend paths — proxied to prof-p.ru in production */
export const LEGACY_API = {
  calc: "/callback/calc.php",
  calcVar: "/callback/calc_var.php",
  calcAuto: "/callback/calc_auto.php",
  calcAutoBtn: "/callback/calc_auto_btn.php",
  callback: "/callback/callback.php",
  sendModalTable: "/callback/send_modal_table.php",
  writeUserVisit: "/callback/write_user_visit.php",
  visit: "/visite.php",
  antibot: "/antibot/antibot.php",
  antibotAuth: "/antibot/antibot-auth.php",
  antibotCounter: "/antibot/counter.php",
  sendQEmail1: "/antibot/sendqemail1.php",
  sendQEmail2: "/antibot/sendqemail2.php",
  sendQEmail3: "/antibot/sendqemail3.php",
  sendQEmail4: "/antibot/sendqemail4.php",
  sendQEmail4v1: "/antibot/sendqemail4v1.php",
  sendQEmail4v2: "/antibot/sendqemail4v2.php",
  blockA: "/block_a.php",
  blockAs: "/block_as.php",
} as const;

export type LegacyEndpoint = (typeof LEGACY_API)[keyof typeof LEGACY_API];

export async function legacyPost(
  endpoint: LegacyEndpoint,
  data: FormData | URLSearchParams | Record<string, string>,
): Promise<Response> {
  const body =
    data instanceof FormData || data instanceof URLSearchParams
      ? data
      : new URLSearchParams(data);

  return fetch(endpoint, {
    method: "POST",
    body,
    credentials: "same-origin",
  });
}

export async function legacyPostJson<T>(
  endpoint: LegacyEndpoint,
  data: FormData | URLSearchParams | Record<string, string>,
): Promise<T> {
  const response = await legacyPost(endpoint, data);
  return response.json() as Promise<T>;
}
