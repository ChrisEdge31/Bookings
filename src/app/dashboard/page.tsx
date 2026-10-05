import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BookingStatusBadge } from "@/components/booking-status-badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, formatPrice, formatTime } from "@/lib/format";
import {
  getCurrentProvider,
  listBookingsForProvider,
  MOCK_NOW,
  resolveBooking,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const provider = getCurrentProvider();
  const bookings = listBookingsForProvider(provider.slug).map(resolveBooking);

  const today = MOCK_NOW.slice(0, 10);
  const weekEnd = new Date(MOCK_NOW);
  weekEnd.setUTCDate(weekEnd.getUTCDate() + 7);
  const weekEndIso = weekEnd.toISOString();

  const active = bookings.filter((b) => b.status !== "cancelled");
  const todays = bookings.filter((b) => b.startsAt.startsWith(today));
  const thisWeek = active.filter(
    (b) => b.startsAt >= MOCK_NOW && b.startsAt < weekEndIso,
  );
  const pending = active.filter(
    (b) => b.status === "pending" && b.startsAt >= MOCK_NOW,
  );
  const weekRevenue = thisWeek.reduce(
    (sum, b) => sum + b.service.priceCents,
    0,
  );

  return (
    <>
      <PageHeader title="Overview" description={formatDate(MOCK_NOW)} />

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-4">
        <Stat
          label="Today"
          value={todays.filter((b) => b.status !== "cancelled").length}
        />
        <Stat label="Next 7 days" value={thisWeek.length} />
        <Stat label="Waiting for you" value={pending.length} />
        <Stat label="Booked value, 7 days" value={formatPrice(weekRevenue)} />
      </dl>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_22rem]">
        <Card>
          <CardHeader>
            <CardTitle>Today's schedule</CardTitle>
            <CardDescription>
              {todays.length} {todays.length === 1 ? "booking" : "bookings"}
            </CardDescription>
            <CardAction>
              <Link
                href="/dashboard/calendar"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Calendar
                <ArrowRight data-icon="inline-end" />
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            {todays.length > 0 ? (
              <ol className="divide-y">
                {todays.map((b) => (
                  <li
                    key={b.id}
                    className={cn(
                      "grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 py-3 text-sm",
                      b.status === "cancelled" && "text-muted-foreground",
                    )}
                  >
                    <span className="tabular-nums">
                      {formatTime(b.startsAt)}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block truncate font-medium",
                          b.status === "cancelled" && "line-through",
                        )}
                      >
                        {b.customer.name}
                      </span>
                      <span className="block truncate text-muted-foreground">
                        {b.service.name} · {b.staff.name.split(" ")[0]}
                      </span>
                    </span>
                    <BookingStatusBadge status={b.status} />
                  </li>
                ))}
              </ol>
            ) : (
              <p className="py-6 text-sm text-muted-foreground">
                Nothing booked today.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Needs confirming</CardTitle>
            <CardDescription>
              Clients are waiting to hear back on these.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pending.length > 0 ? (
              <ul className="space-y-3">
                {pending.map((b) => (
                  <li key={b.id} className="rounded-lg border p-3 text-sm">
                    <p className="font-medium">{b.customer.name}</p>
                    <p className="text-muted-foreground">
                      {b.service.name} · {formatDate(b.startsAt, "weekday")},{" "}
                      {formatTime(b.startsAt)}
                    </p>
                    {b.notes && (
                      <p className="mt-2 border-l-2 pl-2 text-muted-foreground">
                        {b.notes}
                      </p>
                    )}
                    {/* TODO: wire up confirm / decline actions */}
                    <form className="mt-3 flex gap-2">
                      <input type="hidden" name="bookingId" value={b.id} />
                      <Button
                        type="submit"
                        name="decision"
                        value="confirm"
                        size="sm"
                      >
                        Confirm
                      </Button>
                      <Button
                        type="submit"
                        name="decision"
                        value="decline"
                        size="sm"
                        variant="outline"
                      >
                        Decline
                      </Button>
                    </form>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-6 text-sm text-muted-foreground">
                You're all caught up.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-card p-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
