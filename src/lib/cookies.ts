type CookieOptions = {
  secure?: boolean;
  "max-age"?: number;
  path?: string;
};

export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function setCookie(name: string, value: string, options: CookieOptions = {}) {
  if (typeof document === "undefined") return;
  const parts = [`${name}=${encodeURIComponent(value)}`];
  if (options["max-age"] !== undefined) parts.push(`max-age=${options["max-age"]}`);
  if (options.secure) parts.push("secure");
  parts.push(`path=${options.path ?? "/"}`);
  document.cookie = parts.join("; ");
}

export function deleteCookie(name: string) {
  setCookie(name, "", { "max-age": 0 });
}

/** Seconds until end of local day */
export function endDayCookieMaxAge(): number {
  const now = new Date();
  return 86400 - (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
}

export function hasActiveAntibotToken(): boolean {
  return getCookie("tokenActive") === "true";
}
