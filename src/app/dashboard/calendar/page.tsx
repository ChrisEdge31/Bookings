import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatClock,
  formatTime,
  initials,
  LOCALE,
  TIME_ZONE,
} from "@/lib/format";
import {
  getCurrentProvider,
  listBookingsForProvider,
  MOCK_NOW,
  type ResolvedBooking,
  resolveBooking,
} from "@/lib/mock-data";
import type { DayHours } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Calendar" };

const START_HOUR = 8;
const END_HOUR = 20;
/** Height of one hour row, in rem. Keep in sync with `bg-size-[…]` below. */
const HOUR_REM = 3.5;

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const remFromStart = (minutes: number) =>
  ((minutes - START_HOUR * 60) / 60) * HOUR_REM;

const headerFormat = new Intl.DateTimeFormat(LOCALE, {
  weekday: "short",
  timeZone: TIME_ZONE,
});
const rangeFormat = new Intl.DateTimeFormat(LOCALE, {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: TIME_ZONE,
});

export default function CalendarPage() {
  const provider = getCurrentProvider();
  const bookings = listBookingsForProvider(provider.slug).map(resolveBooking);

  // Week starting Monday of MOCK_NOW. TODO: drive from a ?week= search param.
  const now = new Date(MOCK_NOW);
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() - ((now.getUTCDay() + 6) % 7));
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    return d;
  });
  const today = MOCK_NOW.slice(0, 10);
  const hours = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, i) => START_HOUR + i,
  );

  const staffItems = [
    { value: "all", label: "All staff" },
    ...provider.staff.map((s) => ({ value: s.id, label: s.name })),
  ];

  return (
    <>
      <PageHeader
        title="Calendar"
        description={`${rangeFormat.format(days[0]).replace(/, \d{4}$/, "")} – ${rangeFormat.format(days[6])}`}
      >
        {/* TODO: wire up week navigation and the staff filter */}
        <div className="flex">
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="rounded-r-none"
            aria-label="Previous week"
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="rounded-none border-x-0"
          >
            Today
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="rounded-l-none"
            aria-label="Next week"
          >
            <ChevronRight />
          </Button>
        </div>
        <Select name="staff" items={staffItems} defaultValue="all">
          <SelectTrigger className="h-8! w-40" aria-label="Filter by staff">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {staffItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PageHeader>

      <div className="overflow-x-auto rounded-xl border">
        <div className="grid min-w-[52rem] grid-cols-[3.5rem_repeat(7,minmax(0,1fr))]">
          {/* Day headers */}
          <div className="sticky left-0 z-10 border-b bg-background" />
          {days.map((d) => {
            const iso = d.toISOString().slice(0, 10);
            const isToday = iso === today;
            return (
              <div
                key={iso}
                className="border-b border-l px-2 py-2 text-center text-sm"
              >
                <span className="text-muted-foreground">
                  {headerFormat.format(d)}
                </span>{" "}
                <span
                  className={cn(
                    "inline-grid size-6 place-items-center rounded-full font-medium tabular-nums",
                    isToday && "bg-primary text-primary-foreground",
                  )}
                >
                  {d.getUTCDate()}
                </span>
              </div>
            );
          })}

          {/* Time labels */}
          <div className="sticky left-0 z-10 bg-background">
            {hours.map((h) => (
              <div
                key={h}
                className="relative pr-2 text-right text-xs text-muted-foreground tabular-nums"
                style={{ height: `${HOUR_REM}rem` }}
              >
                <span className="relative -top-2">
                  {h === START_HOUR
                    ? ""
                    : formatClock(`${String(h).padStart(2, "0")}:00`).replace(
                        ":00",
                        "",
                      )}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((d) => {
            const iso = d.toISOString().slice(0, 10);
            const dayHours = provider.hours.find(
              (h) => h.day === d.getUTCDay(),
            );
            const dayBookings = bookings.filter((b) =>
              b.startsAt.startsWith(iso),
            );
            return (
              <div
                key={iso}
                className="relative border-l bg-[linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[100%_3.5rem]"
                style={{ height: `${hours.length * HOUR_REM}rem` }}
              >
                <ClosedHours hours={dayHours} />
                {layoutLanes(dayBookings).map(({ booking, lane, lanes }) => (
                  <CalendarEvent
                    key={booking.id}
                    booking={booking}
                    lane={lane}
                    lanes={lanes}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-sm border bg-card" /> Confirmed
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-sm border border-dashed border-foreground/40" />{" "}
          Pending
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-sm bg-[repeating-linear-gradient(135deg,var(--color-muted)_0_3px,transparent_3px_6px)]" />{" "}
          Closed
        </li>
      </ul>
    </>
  );
}

function ClosedHours({ hours }: { hours?: DayHours }) {
  const hatch =
    "absolute inset-x-0 bg-[repeating-linear-gradient(135deg,var(--color-muted)_0_4px,transparent_4px_8px)]";
  if (!hours?.open)
    return <div aria-hidden className={cn(hatch, "inset-y-0")} />;
  const open = remFromStart(toMinutes(hours.start));
  const close = remFromStart(toMinutes(hours.end));
  const total = (END_HOUR - START_HOUR) * HOUR_REM;
  return (
    <>
      {open > 0 && (
        <div
          aria-hidden
          className={cn(hatch, "top-0")}
          style={{ height: `${open}rem` }}
        />
      )}
      {close < total && (
        <div
          aria-hidden
          className={cn(hatch, "bottom-0")}
          style={{ height: `${total - close}rem` }}
        />
      )}
    </>
  );
}

/**
 * Places overlapping bookings side by side. Each cluster of overlapping
 * bookings is split into as many lanes as it needs.
 */
function layoutLanes(bookings: ResolvedBooking[]) {
  const sorted = [...bookings].sort((a, b) =>
    a.startsAt.localeCompare(b.startsAt),
  );
  const placed: { booking: ResolvedBooking; lane: number; lanes: number }[] =
    [];
  let cluster: typeof placed = [];
  let laneEnds: string[] = [];
  let clusterEnd = "";

  const flush = () => {
    for (const p of cluster) p.lanes = laneEnds.length;
    placed.push(...cluster);
    cluster = [];
    laneEnds = [];
  };

  for (const booking of sorted) {
    if (cluster.length > 0 && booking.startsAt >= clusterEnd) flush();
    let lane = laneEnds.findIndex((end) => end <= booking.startsAt);
    if (lane === -1) lane = laneEnds.push(booking.endsAt) - 1;
    else laneEnds[lane] = booking.endsAt;
    cluster.push({ booking, lane, lanes: 1 });
    if (booking.endsAt > clusterEnd) clusterEnd = booking.endsAt;
  }
  flush();
  return placed;
}

function CalendarEvent({
  booking,
  lane,
  lanes,
}: {
  booking: ResolvedBooking;
  lane: number;
  lanes: number;
}) {
  const start = new Date(booking.startsAt);
  const top = remFromStart(start.getUTCHours() * 60 + start.getUTCMinutes());
  const height = (booking.service.durationMinutes / 60) * HOUR_REM;
  const cancelled = booking.status === "cancelled";
  const compact = booking.service.durationMinutes < 40;

  return (
    // TODO: open booking details (sheet or dialog) on click
    <button
      type="button"
      className={cn(
        "absolute overflow-hidden rounded-md border bg-card px-1.5 py-1 text-left text-xs shadow-xs transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
        compact && "py-0.5 leading-tight",
        booking.status === "pending" && "border-dashed border-foreground/40",
        cancelled &&
          "bg-transparent text-muted-foreground line-through opacity-60 shadow-none",
      )}
      style={{
        top: `${top}rem`,
        height: `calc(${height}rem - 2px)`,
        left: `calc(${(lane / lanes) * 100}% + 2px)`,
        width: `calc(${100 / lanes}% - 4px)`,
      }}
    >
      <span className={cn("flex items-center gap-1", compact && "truncate")}>
        <span className="font-medium tabular-nums">
          {formatTime(booking.startsAt)}
        </span>
        <span className="truncate">{booking.customer.name}</span>
        <span
          className="ml-auto shrink-0 rounded bg-muted px-1 text-[0.625rem] text-muted-foreground no-underline"
          title={booking.staff.name}
        >
          {initials(booking.staff.name)}
        </span>
      </span>
      {!compact && (
        <span className="block truncate text-muted-foreground">
          {booking.service.name}
        </span>
      )}
    </button>
  );
}
