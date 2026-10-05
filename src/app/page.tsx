import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Online booking for appointment-based businesses",
  description:
    "Publish your services and opening hours, share one link, and let clients book themselves in.",
};

const steps = [
  {
    title: "Add your services",
    illustration: {
      src: "/illustrations/services.svg",
      width: 709,
      height: 454,
    },
    body: "Give each service a length and a price, so clients know exactly what they're booking before they choose a time.",
  },
  {
    title: "Set your hours",
    illustration: { src: "/illustrations/hours.svg", width: 764, height: 809 },
    body: "Set weekly availability for yourself or for each member of staff. Clients only ever see slots that are actually free.",
  },
  {
    title: "Share your link",
    illustration: { src: "/illustrations/booked.svg", width: 767, height: 589 },
    body: "Your booking page lives at /your-business. Put it in your bio, on your website, or on a card by the till.",
  },
];

const businessFeatures = [
  {
    title: "One calendar for the whole team",
    body: "Every booking, across every staff member, in a single view.",
  },
  {
    title: "Staff with their own schedules",
    body: "Each person gets their own services and working hours.",
  },
  {
    title: "A customer list that builds itself",
    body: "See who has booked, how often, and for what.",
  },
  {
    title: "Listed in the directory",
    body: "New clients can find you while browsing businesses nearby.",
  },
];

const clientFeatures = [
  {
    title: "Real availability",
    body: "No requests that get declined later. If a slot is shown, it's free.",
  },
  {
    title: "Every booking in one place",
    body: "Upcoming and past appointments across all the businesses you use.",
  },
  {
    title: "Nothing to download",
    body: "Booking works in the browser, on any phone or computer.",
  },
];

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <HowItWorks />
      <Features />
      <ClosingCta />
    </SiteShell>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Let clients book you without the back-and-forth.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
          Put your services and opening hours online once. Clients pick a time
          that works, and it lands straight in your calendar. No more “are you
          free Thursday?” messages.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/signup"
            className={cn(buttonVariants(), "h-10 px-4 text-sm")}
          >
            Create your booking page
            <ArrowRight data-icon="inline-end" />
          </Link>
          <Link
            href="/directory"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-10 px-4 text-sm",
            )}
          >
            Find a business
          </Link>
        </div>
      </div>

      <BookingPreview />
    </section>
  );
}

const previewDays = [
  { day: "Mon", date: 12 },
  { day: "Tue", date: 13 },
  { day: "Wed", date: 14, selected: true },
  { day: "Thu", date: 15 },
  { day: "Fri", date: 16 },
];

const previewSlots = [
  { time: "9:00" },
  { time: "9:45", taken: true },
  { time: "10:30" },
  { time: "11:15", selected: true },
  { time: "1:00", taken: true },
  { time: "1:45" },
];

/**
 * A static picture of the client-facing booking flow. It's built from markup
 * rather than a screenshot so it stays sharp and follows the theme.
 */
function BookingPreview() {
  return (
    <figure className="mx-auto w-full max-w-md">
      <div
        aria-hidden
        className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm select-none"
      >
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="font-medium">Northside Barbers</p>
            <p className="text-sm text-muted-foreground">/northside-barbers</p>
          </div>
          <p className="text-sm text-muted-foreground">with Sam</p>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-lg border px-3 py-2.5">
          <div>
            <p className="text-sm font-medium">Skin fade</p>
            <p className="text-xs text-muted-foreground">45 min</p>
          </div>
          <p className="text-sm font-medium tabular-nums">R120</p>
        </div>

        <p className="mt-5 text-xs font-medium text-muted-foreground">
          October
        </p>
        <div className="mt-2 grid grid-cols-5 gap-2">
          {previewDays.map((d) => (
            <div
              key={d.date}
              className={cn(
                "rounded-md border py-2 text-center",
                d.selected &&
                  "border-primary bg-primary text-primary-foreground",
              )}
            >
              <p
                className={cn(
                  "text-xs",
                  !d.selected && "text-muted-foreground",
                )}
              >
                {d.day}
              </p>
              <p className="text-sm font-medium tabular-nums">{d.date}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {previewSlots.map((s) => (
            <div
              key={s.time}
              className={cn(
                "rounded-md border py-2 text-center text-sm tabular-nums",
                s.taken &&
                  "border-dashed text-muted-foreground/60 line-through",
                s.selected && "border-primary ring-1 ring-primary font-medium",
              )}
            >
              {s.time}
            </div>
          ))}
        </div>

        <div className="mt-5 flex h-9 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground">
          Book Wed 14 at 11:15
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        What your clients see when they open your link.
      </figcaption>
    </figure>
  );
}

function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works" className="border-y bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <h2
          id="how-it-works"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Set up once, then get on with your day
        </h2>
        <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <li key={step.title}>
              <div className="flex h-44 items-end justify-center rounded-lg border bg-background p-5">
                {/* Decorative: the step text carries the meaning. */}
                <Image
                  {...step.illustration}
                  alt=""
                  className="h-full w-auto object-contain"
                />
              </div>
              <span className="mt-5 block text-sm font-medium text-muted-foreground tabular-nums">
                Step {i + 1}
              </span>
              <h3 className="mt-2 font-medium">{step.title}</h3>
              <p className="mt-2 text-pretty text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section
      aria-labelledby="features"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24"
    >
      <h2
        id="features"
        className="max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
      >
        Built for both sides of the appointment
      </h2>
      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
        <FeatureList
          heading="If you run the business"
          items={businessFeatures}
        />
        <FeatureList heading="If you're booking" items={clientFeatures} />
      </div>
    </section>
  );
}

function FeatureList({
  heading,
  items,
}: {
  heading: string;
  items: { title: string; body: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground">{heading}</h3>
      <ul className="mt-4 divide-y border-t">
        {items.map((item) => (
          <li key={item.title} className="flex gap-3 py-4">
            <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 text-muted-foreground">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ClosingCta() {
  return (
    <section aria-labelledby="get-started" className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center">
        <div>
          <h2
            id="get-started"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Stop taking bookings over text.
          </h2>
          <p className="mt-2 text-muted-foreground">
            Create your page, add a service, and send your first client the
            link.
          </p>
        </div>
        <Link
          href="/signup"
          className={cn(buttonVariants(), "h-10 shrink-0 px-4 text-sm")}
        >
          Create your booking page
          <ArrowRight data-icon="inline-end" />
        </Link>
      </div>
    </section>
  );
}
