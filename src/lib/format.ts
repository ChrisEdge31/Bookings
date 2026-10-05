import type { DayOfWeek } from "@/lib/types";

/**
 * Mock timestamps are stored in UTC and shown as-is. When real data arrives,
 * swap this for the provider's own time zone.
 */
export const TIME_ZONE = "GMT";
export const LOCALE = "en-ZA";
export const CURRENCY = "ZAR";

export function formatPrice(cents: number) {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

/** e.g. "R" for ZAR, for input prefixes. */
export const currencySymbol =
  new Intl.NumberFormat(LOCALE, { style: "currency", currency: CURRENCY })
    .formatToParts(0)
    .find((p) => p.type === "currency")?.value ?? CURRENCY;

export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

export function formatTime(iso: string) {
  return new Intl.DateTimeFormat(LOCALE, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

/** Formats an "HH:mm" string, e.g. "13:30" → "1:30 PM". */
export function formatClock(hhmm: string) {
  return formatTime(`1970-01-01T${hhmm}:00Z`);
}

export function formatDate(
  iso: string,
  style: "short" | "long" | "weekday" = "long",
) {
  const options: Intl.DateTimeFormatOptions =
    style === "short"
      ? { month: "short", day: "numeric" }
      : style === "weekday"
        ? { weekday: "short", month: "short", day: "numeric" }
        : { weekday: "long", month: "long", day: "numeric", year: "numeric" };
  return new Intl.DateTimeFormat(LOCALE, {
    ...options,
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

export const dayNames: Record<DayOfWeek, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
