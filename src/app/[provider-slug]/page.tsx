import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  dayNames,
  formatClock,
  formatDuration,
  formatPrice,
  initials,
} from "@/lib/format";
import { getProvider } from "@/lib/mock-data";
import type { DayHours } from "@/lib/types";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/[provider-slug]">): Promise<Metadata> {
  const provider = getProvider((await params)["provider-slug"]);
  return provider
    ? { title: provider.name, description: provider.tagline }
    : {};
}

export default async function ProviderPage({
  params,
}: PageProps<"/[provider-slug]">) {
  const provider = getProvider((await params)["provider-slug"]);
  if (!provider) notFound();

  const services = provider.services.filter((s) => s.active);
  const bookHref = `/${provider.slug}/book`;

  return (
    <>
      <section className="border-b bg-muted/40">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="grid size-16 shrink-0 place-items-center rounded-xl border bg-background text-lg font-semibold"
            >
              {initials(provider.name)}
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {provider.name}
              </h1>
              <p className="mt-1 text-muted-foreground">
                {provider.category} · {provider.city}
              </p>
              <p className="mt-2 max-w-prose text-pretty">{provider.tagline}</p>
            </div>
          </div>
          <Link
            href={bookHref}
            className={cn(buttonVariants(), "h-10 shrink-0 px-5 text-sm")}
          >
            Book an appointment
          </Link>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-10">
          <section aria-labelledby="services">
            <h2 id="services" className="text-lg font-semibold">
              Services
            </h2>
            <ul className="mt-3 divide-y rounded-xl border">
              {services.map((service) => (
                <li
                  key={service.id}
                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-medium">{service.name}</p>
                    {service.description && (
                      <p className="mt-0.5 text-sm text-pretty text-muted-foreground">
                        {service.description}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatDuration(service.durationMinutes)} ·{" "}
                      <span className="text-foreground tabular-nums">
                        {service.priceCents === 0
                          ? "Free"
                          : formatPrice(service.priceCents)}
                      </span>
                    </p>
                  </div>
                  <Link
                    href={`${bookHref}?service=${service.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-8 shrink-0 self-start px-3 text-sm sm:self-center",
                    )}
                    aria-label={`Book ${service.name}`}
                  >
                    Book
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="about">
            <h2 id="about" className="text-lg font-semibold">
              About
            </h2>
            <p className="mt-2 max-w-prose text-pretty text-muted-foreground">
              {provider.description}
            </p>
          </section>

          {provider.staff.length > 1 && (
            <section aria-labelledby="team">
              <h2 id="team" className="text-lg font-semibold">
                Team
              </h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {provider.staff.map((member) => (
                  <li
                    key={member.id}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <Avatar>
                      <AvatarFallback>{initials(member.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-20 lg:self-start">
          <section aria-labelledby="hours">
            <h2 id="hours" className="text-sm font-semibold">
              Opening hours
            </h2>
            <OpeningHours hours={provider.hours} />
          </section>
          <section aria-labelledby="contact">
            <h2 id="contact" className="text-sm font-semibold">
              Contact
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex gap-2">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <span>
                  {provider.address}
                  <br />
                  {provider.city}
                </span>
              </li>
              <li className="flex gap-2">
                <Phone
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <a href={`tel:${provider.phone}`} className="hover:underline">
                  {provider.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <a
                  href={`mailto:${provider.email}`}
                  className="break-all hover:underline"
                >
                  {provider.email}
                </a>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}

const weekOrder = [1, 2, 3, 4, 5, 6, 0] as const;

function OpeningHours({ hours }: { hours: DayHours[] }) {
  return (
    <dl className="mt-3 space-y-1.5 text-sm">
      {weekOrder.map((day) => {
        const h = hours.find((x) => x.day === day);
        return (
          <div key={day} className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{dayNames[day]}</dt>
            <dd className="tabular-nums">
              {h?.open
                ? `${formatClock(h.start)} – ${formatClock(h.end)}`
                : "Closed"}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
