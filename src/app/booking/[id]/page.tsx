import { ArrowLeft, CalendarPlus, CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingStatusBadge } from "@/components/booking-status-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  formatDate,
  formatDuration,
  formatPrice,
  formatTime,
} from "@/lib/format";
import { getBooking, MOCK_NOW, resolveBooking } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Your booking" };

export default async function BookingPage({
  params,
}: PageProps<"/booking/[id]">) {
  const raw = getBooking((await params).id);
  if (!raw) notFound();
  const booking = resolveBooking(raw);
  const { provider, service, staff } = booking;

  const isUpcoming =
    booking.startsAt >= MOCK_NOW &&
    (booking.status === "confirmed" || booking.status === "pending");

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
      <Link
        href="/account/bookings"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        My bookings
      </Link>

      {booking.status === "confirmed" && isUpcoming && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border bg-muted/40 p-4">
          <CircleCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div>
            <p className="font-medium">You're booked in</p>
            <p className="text-sm text-muted-foreground">
              A confirmation has been sent to {booking.customer.email}.
            </p>
          </div>
        </div>
      )}
      {booking.status === "pending" && (
        <div className="mt-6 rounded-xl border border-dashed p-4">
          <p className="font-medium">Waiting for {provider.name} to confirm</p>
          <p className="text-sm text-muted-foreground">
            We'll email you as soon as they do.
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          {service.name}
        </h1>
        <BookingStatusBadge status={booking.status} />
      </div>
      <p className="mt-1 text-muted-foreground">
        with {staff.name} at{" "}
        <Link href={`/${provider.slug}`} className="underline">
          {provider.name}
        </Link>
      </p>

      <dl className="mt-6 divide-y rounded-xl border text-sm">
        <Row label="Date">{formatDate(booking.startsAt)}</Row>
        <Row label="Time">
          {formatTime(booking.startsAt)} – {formatTime(booking.endsAt)}{" "}
          <span className="text-muted-foreground">
            ({formatDuration(service.durationMinutes)})
          </span>
        </Row>
        <Row label="Where">
          {provider.address}, {provider.city}
        </Row>
        <Row label="Price">
          {service.priceCents === 0 ? "Free" : formatPrice(service.priceCents)}
        </Row>
        {booking.notes && <Row label="Your notes">{booking.notes}</Row>}
        <Row label="Reference">
          <span className="font-mono">{booking.id.toUpperCase()}</span>
        </Row>
      </dl>

      {isUpcoming ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {/* TODO: generate an .ics file or calendar link */}
          <Button variant="outline" type="button" className="h-9 px-3 text-sm">
            <CalendarPlus data-icon="inline-start" />
            Add to calendar
          </Button>
          <Link
            href={`/${provider.slug}/book?service=${service.id}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-9 px-3 text-sm",
            )}
          >
            Reschedule
          </Link>
          <CancelBookingDialog
            bookingId={booking.id}
            when={`${formatDate(booking.startsAt, "weekday")} at ${formatTime(booking.startsAt)}`}
          />
        </div>
      ) : (
        <div className="mt-6">
          <Link
            href={`/${provider.slug}/book?service=${service.id}`}
            className={cn(buttonVariants(), "h-9 px-4 text-sm")}
          >
            Book again
          </Link>
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 px-4 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function CancelBookingDialog({
  bookingId,
  when,
}: {
  bookingId: string;
  when: string;
}) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "destructive" }),
          "h-9 px-3 text-sm",
        )}
      >
        Cancel booking
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel this booking?</DialogTitle>
          <DialogDescription>
            Your appointment on {when} will be released for someone else to
            book.
          </DialogDescription>
        </DialogHeader>
        {/* TODO: wire up to your cancel-booking action */}
        <form>
          <input type="hidden" name="bookingId" value={bookingId} />
          <DialogFooter>
            <DialogClose
              className={buttonVariants({ variant: "outline" })}
              type="button"
            >
              Keep booking
            </DialogClose>
            <Button type="submit" variant="destructive">
              Yes, cancel it
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
