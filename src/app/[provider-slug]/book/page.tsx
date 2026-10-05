import { ArrowLeft, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChoiceCard } from "@/components/choice-card";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  formatClock,
  formatDuration,
  formatPrice,
  initials,
  LOCALE,
  TIME_ZONE,
} from "@/lib/format";
import { getMockSlots, getProvider, getUpcomingDates } from "@/lib/mock-data";
import type { TimeSlot } from "@/lib/types";

export async function generateMetadata({
  params,
}: PageProps<"/[provider-slug]/book">): Promise<Metadata> {
  const provider = getProvider((await params)["provider-slug"]);
  return provider ? { title: `Book with ${provider.name}` } : {};
}

const dayFormat = new Intl.DateTimeFormat(LOCALE, {
  weekday: "short",
  timeZone: TIME_ZONE,
});

export default async function BookPage({
  params,
  searchParams,
}: PageProps<"/[provider-slug]/book">) {
  const provider = getProvider((await params)["provider-slug"]);
  if (!provider) notFound();

  const { service: serviceParam } = await searchParams;
  const services = provider.services.filter((s) => s.active);
  const selectedServiceId =
    services.find((s) => s.id === serviceParam)?.id ?? services[0]?.id;

  const dates = getUpcomingDates(14);
  // TODO: refetch slots when the client picks a different date.
  const slots = getMockSlots(dates[0]);
  const morning = slots.filter((s) => s.time < "12:00");
  const afternoon = slots.filter((s) => s.time >= "12:00");

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <Link
        href={`/${provider.slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {provider.name}
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        Book an appointment
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_18rem]">
        {/* TODO: wire up to your create-booking action */}
        <form className="min-w-0 space-y-10">
          <input type="hidden" name="provider" value={provider.slug} />

          <Step number={1} title="Choose a service">
            <div className="grid gap-2 sm:grid-cols-2">
              {services.map((service) => (
                <ChoiceCard
                  key={service.id}
                  name="serviceId"
                  value={service.id}
                  defaultChecked={service.id === selectedServiceId}
                  required
                >
                  <span className="flex w-full items-start justify-between gap-3">
                    <span>
                      <span className="block font-medium">{service.name}</span>
                      <span className="text-muted-foreground">
                        {formatDuration(service.durationMinutes)}
                      </span>
                    </span>
                    <span className="font-medium tabular-nums">
                      {service.priceCents === 0
                        ? "Free"
                        : formatPrice(service.priceCents)}
                    </span>
                  </span>
                </ChoiceCard>
              ))}
            </div>
          </Step>

          {provider.staff.length > 1 && (
            <Step number={2} title="Who would you like?">
              <div className="flex flex-wrap gap-2">
                <ChoiceCard name="staffId" value="any" defaultChecked>
                  Anyone available
                </ChoiceCard>
                {provider.staff.map((member) => (
                  <ChoiceCard
                    key={member.id}
                    name="staffId"
                    value={member.id}
                    className="items-center gap-2"
                  >
                    <span
                      aria-hidden
                      className="grid size-6 place-items-center rounded-full bg-muted text-[0.625rem] font-medium"
                    >
                      {initials(member.name)}
                    </span>
                    {member.name.split(" ")[0]}
                  </ChoiceCard>
                ))}
              </div>
            </Step>
          )}

          <Step
            number={provider.staff.length > 1 ? 3 : 2}
            title="Pick a date and time"
          >
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
              {dates.map((date, i) => {
                const d = new Date(`${date}T00:00:00Z`);
                return (
                  <ChoiceCard
                    key={date}
                    name="date"
                    value={date}
                    defaultChecked={i === 0}
                    required
                    className="w-16 shrink-0 flex-col items-center p-2"
                  >
                    <span className="text-xs text-muted-foreground">
                      {dayFormat.format(d)}
                    </span>
                    <span className="font-medium tabular-nums">
                      {d.getUTCDate()}
                    </span>
                  </ChoiceCard>
                );
              })}
            </div>

            <div className="mt-5 space-y-5">
              <SlotGroup label="Morning" slots={morning} />
              <SlotGroup label="Afternoon" slots={afternoon} />
            </div>
          </Step>

          <Step number={provider.staff.length > 1 ? 4 : 3} title="Your details">
            <FieldGroup className="max-w-lg">
              <Field>
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input id="name" name="name" autoComplete="name" required />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="phone">
                    Phone{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="notes">
                  Anything we should know?{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>
                <Textarea id="notes" name="notes" rows={3} />
              </Field>
            </FieldGroup>
          </Step>

          <div className="border-t pt-6">
            <Button
              type="submit"
              className="h-10 w-full px-6 text-sm sm:w-auto"
            >
              Confirm booking
            </Button>
            <p className="mt-3 text-sm text-muted-foreground">
              We'll email your confirmation. You can cancel or reschedule from
              your account.
            </p>
          </div>
        </form>

        <aside className="order-first lg:order-last">
          <div className="rounded-xl border p-4 lg:sticky lg:top-20">
            <p className="font-medium">{provider.name}</p>
            <p className="mt-1 flex gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                {provider.address}, {provider.city}
              </span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="flex items-center gap-3 font-semibold">
        <span
          aria-hidden
          className="grid size-6 place-items-center rounded-full border text-xs tabular-nums"
        >
          {number}
        </span>
        {title}
      </legend>
      <div className="mt-4">{children}</div>
    </fieldset>
  );
}

function SlotGroup({ label, slots }: { label: string; slots: TimeSlot[] }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {slots.map((slot) => (
          <ChoiceCard
            key={slot.time}
            name="time"
            value={slot.time}
            disabled={!slot.available}
            required
            className="justify-center p-2 tabular-nums has-disabled:line-through"
          >
            {formatClock(slot.time)}
            {!slot.available && <span className="sr-only"> (taken)</span>}
          </ChoiceCard>
        ))}
      </div>
    </div>
  );
}
