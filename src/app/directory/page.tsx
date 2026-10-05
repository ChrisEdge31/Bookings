import { Clock, MapPin, Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { formatDate, formatPrice, formatTime, initials } from "@/lib/format";
import { listCategories, listProviders } from "@/lib/mock-data";
import type { Provider } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Find a business" };

export default async function DirectoryPage({
  searchParams,
}: PageProps<"/directory">) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : undefined;
  const category =
    typeof params.category === "string" ? params.category : undefined;

  const providers = listProviders({ query, category });
  const categories = listCategories();

  const categoryHref = (c?: string) => {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    if (c) next.set("category", c);
    const qs = next.toString();
    return qs ? `/directory?${qs}` : "/directory";
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Find a business
      </h1>
      <p className="mt-1 text-muted-foreground">
        Book directly with local businesses. You'll see real availability.
      </p>

      <search>
        <form action="/directory" className="mt-6 flex max-w-xl gap-2">
          {category && <input type="hidden" name="category" value={category} />}
          <InputGroup className="h-9">
            <InputGroupAddon>
              <Search aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              name="q"
              defaultValue={query}
              placeholder="Search by name, service or city"
              aria-label="Search businesses"
              className="text-sm"
            />
          </InputGroup>
          <Button type="submit" className="h-9 px-4 text-sm">
            Search
          </Button>
        </form>
      </search>

      <nav
        aria-label="Categories"
        className="mt-4 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <CategoryChip href={categoryHref()} active={!category}>
          All
        </CategoryChip>
        {categories.map((c) => (
          <CategoryChip key={c} href={categoryHref(c)} active={category === c}>
            {c}
          </CategoryChip>
        ))}
      </nav>

      {providers.length > 0 ? (
        <>
          <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
            {providers.length}{" "}
            {providers.length === 1 ? "business" : "businesses"}
          </p>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <li key={provider.slug}>
                <ProviderCard provider={provider} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="mt-8 rounded-lg border border-dashed px-6 py-12 text-center">
          <p className="font-medium">No businesses match that search</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different word, or{" "}
            <Link href="/directory" className="text-foreground underline">
              clear the filters
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}

function CategoryChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "shrink-0 rounded-full border px-3 py-1 text-sm transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "hover:bg-muted",
      )}
    >
      {children}
    </Link>
  );
}

function ProviderCard({ provider }: { provider: Provider }) {
  const prices = provider.services
    .filter((s) => s.active)
    .map((s) => s.priceCents);
  const from = Math.min(...prices);

  return (
    <Link
      href={`/${provider.slug}`}
      className="flex h-full flex-col rounded-xl border bg-card p-4 transition-colors hover:border-foreground/20 hover:bg-muted/30"
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-sm font-medium"
        >
          {initials(provider.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium">{provider.name}</p>
          <p className="text-sm text-muted-foreground">{provider.category}</p>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-pretty">
        {provider.tagline}
      </p>
      <div className="mt-auto space-y-1.5 pt-4 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          {provider.city}
        </p>
        <p className="flex items-center gap-2">
          <Clock className="size-3.5 shrink-0" aria-hidden />
          {provider.nextAvailable
            ? `Next free ${formatDate(provider.nextAvailable, "weekday")}, ${formatTime(provider.nextAvailable)}`
            : "No free slots this month"}
        </p>
      </div>
      <p className="mt-4 border-t pt-3 text-sm">
        {from === 0 ? "Free consultation" : `From ${formatPrice(from)}`}
      </p>
    </Link>
  );
}
