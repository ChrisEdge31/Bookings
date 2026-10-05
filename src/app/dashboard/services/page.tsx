import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/page-header";
import { ServiceFormDialog } from "@/components/dashboard/service-form-dialog";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDuration, formatPrice } from "@/lib/format";
import { getCurrentProvider } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  const provider = getCurrentProvider();
  const { services, staff } = provider;

  return (
    <>
      <PageHeader
        title="Services"
        description="What clients can book, how long it takes and what it costs."
      >
        <ServiceFormDialog
          staff={staff}
          trigger={
            <>
              <Plus data-icon="inline-start" />
              Add service
            </>
          }
        />
      </PageHeader>

      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Service</TableHead>
              <TableHead>Length</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="hidden md:table-cell">Staff</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-4">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => {
              const offeredBy = staff.filter((s) =>
                service.staffIds.includes(s.id),
              );
              return (
                <TableRow key={service.id}>
                  <TableCell className="max-w-72 pl-4">
                    <p className="font-medium">{service.name}</p>
                    {service.description && (
                      <p className="truncate text-muted-foreground">
                        {service.description}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="tabular-nums">
                    {formatDuration(service.durationMinutes)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatPrice(service.priceCents)}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {offeredBy.map((s) => s.name.split(" ")[0]).join(", ")}
                  </TableCell>
                  <TableCell>
                    {service.active ? (
                      <Badge variant="secondary">Live</Badge>
                    ) : (
                      <Badge variant="outline">Hidden</Badge>
                    )}
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <ServiceFormDialog
                      staff={staff}
                      service={service}
                      trigger="Edit"
                      triggerClassName={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
