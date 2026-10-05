import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookingStatusBadge } from "@/components/booking-status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatTime, LOCALE, TIME_ZONE } from "@/lib/format";
import {
  CURRENT_CUSTOMER_ID,
  listBookingsForCustomer,
  MOCK_NOW,
  type ResolvedBooking,
  resolveBooking,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "My bookings" };

const monthFormat = new Intl.DateTimeFormat(LOCALE, {
  month: "short",
  timeZone: TIME_ZONE,
});
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, {
  weekday: "short",
  timeZone: TIME_ZONE,
});

export default function AccountBookingsPage() {
  const all = listBookingsForCustomer(CURRENT_CUSTOMER_ID).map(resolveBooking);
  const upcoming = all.filter(
    (b) => b.startsAt >= MOCK_NOW && b.status !== "cancelled",
  );
  const past = all
    .filter((b) => b.startsAt < MOCK_NOW || b.status === "cancelled")
    .reverse();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        My bookings
      </h1>

      <Tabs defaultValue="upcoming" className="mt-6">
        <TabsList>
          <TabsTrigger value="upcoming" className="px-3">
            Upcoming ({upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="px-3">
            Past
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          {upcoming.length > 0 ? (
            <BookingList bookings={upcoming} />
          ) : (
            <EmptyState />
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          {past.length > 0 ? (
            <BookingList bookings={past} />
          ) : (
            <p className="py-8 text-sm text-muted-foreground">
              Nothing here yet.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BookingList({ bookings }: { bookings: ResolvedBooking[] }) {
  return (
    <ul className="divide-y rounded-xl border">
      {bookings.map((booking) => {
        const d = new Date(booking.startsAt);
        return (
          <li key={booking.id}>
            <Link
              href={`/booking/${booking.id}`}
              className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/40"
            >
              <div className="w-12 shrink-0 rounded-lg border text-center">
                <p className="border-b py-0.5 text-[0.625rem] font-medium text-muted-foreground uppercase">
                  {monthFormat.format(d)}
                </p>
                <p className="py-1 text-lg font-semibold tabular-nums">
                  {d.getUTCDate()}
                </p>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{booking.service.name}</p>
                  <BookingStatusBadge status={booking.status} />
                </div>
                <p className="truncate text-sm text-muted-foreground">
                  {weekdayFormat.format(d)} {formatTime(booking.startsAt)} ·{" "}
                  {booking.provider.name}
                </p>
              </div>
              <ChevronRight
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed px-6 py-12 text-center">
      <p className="font-medium">No upcoming bookings</p>
      <p className="mt-1 text-sm text-muted-foreground">
        When you book with a business it'll show up here.
      </p>
      <Link
        href="/directory"
        className={cn(buttonVariants(), "mt-4 h-9 px-4 text-sm")}
      >
        Find a business
      </Link>
    </div>
  );
}
