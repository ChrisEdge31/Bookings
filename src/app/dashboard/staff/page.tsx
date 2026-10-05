import { Mail, Phone, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { StaffFormDialog } from "@/components/dashboard/staff-form-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { initials } from "@/lib/format";
import {
  getCurrentProvider,
  listBookingsForProvider,
  MOCK_NOW,
} from "@/lib/mock-data";

export const metadata: Metadata = { title: "Staff" };

export default function StaffPage() {
  const provider = getCurrentProvider();
  const upcoming = listBookingsForProvider(provider.slug).filter(
    (b) => b.startsAt >= MOCK_NOW && b.status !== "cancelled",
  );

  return (
    <>
      <PageHeader
        title="Staff"
        description="Everyone who can take bookings, and what they offer."
      >
        <StaffFormDialog
          services={provider.services}
          trigger={
            <>
              <Plus data-icon="inline-start" />
              Add staff
            </>
          }
        />
      </PageHeader>

      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {provider.staff.map((member) => {
          const services = provider.services.filter((s) =>
            s.staffIds.includes(member.id),
          );
          const bookedCount = upcoming.filter(
            (b) => b.staffId === member.id,
          ).length;
          return (
            <li
              key={member.id}
              className="flex flex-col rounded-xl border bg-card p-4"
            >
              <div className="flex items-start gap-3">
                <Avatar size="lg">
                  <AvatarFallback>{initials(member.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
                <StaffFormDialog
                  services={provider.services}
                  member={member}
                  trigger="Edit"
                  triggerClassName={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                />
              </div>

              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="size-3.5 shrink-0" aria-hidden />
                  <span className="truncate">{member.email}</span>
                </li>
                {member.phone && (
                  <li className="flex items-center gap-2">
                    <Phone className="size-3.5 shrink-0" aria-hidden />
                    {member.phone}
                  </li>
                )}
              </ul>

              <div className="mt-4 mb-4 flex flex-wrap gap-1.5">
                {services.map((s) => (
                  <Badge key={s.id} variant="outline">
                    {s.name}
                  </Badge>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between border-t pt-3 text-sm">
                <span className="text-muted-foreground">
                  {bookedCount} upcoming{" "}
                  {bookedCount === 1 ? "booking" : "bookings"}
                </span>
                <Link
                  href={`/dashboard/availability?staff=${member.id}`}
                  className="underline-offset-4 hover:underline"
                >
                  Working hours
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
