import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
    >
      <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
        <CalendarCheck2 className="size-4" aria-hidden />
      </span>
      <span>{siteConfig.name}</span>
    </Link>
  );
}
