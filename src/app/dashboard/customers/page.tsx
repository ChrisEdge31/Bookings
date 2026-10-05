import { Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, initials } from "@/lib/format";
import {
  getCurrentProvider,
  listCustomersForProvider,
  MOCK_NOW,
} from "@/lib/mock-data";

export const metadata: Metadata = { title: "Customers" };

export default async function CustomersPage({
  searchParams,
}: PageProps<"/dashboard/customers">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim().toLowerCase() : "";

  const provider = getCurrentProvider();
  const all = listCustomersForProvider(provider.slug);
  const customers = query
    ? all.filter((c) =>
        [c.name, c.email, c.phone ?? ""].some((s) =>
          s.toLowerCase().includes(query),
        ),
      )
    : all;

  const monthAgo = new Date(MOCK_NOW);
  monthAgo.setUTCDate(monthAgo.getUTCDate() - 30);

  return (
    <>
      <PageHeader
        title="Customers"
        description={`${all.length} people have booked with you.`}
      />

      <search>
        <form className="mb-4 max-w-sm">
          <InputGroup>
            <InputGroupAddon>
              <Search aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              name="q"
              defaultValue={typeof q === "string" ? q : ""}
              placeholder="Search name, email or phone"
              aria-label="Search customers"
            />
          </InputGroup>
        </form>
      </search>

      {customers.length > 0 ? (
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-4">Customer</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="text-right">Visits</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Last visit
                </TableHead>
                <TableHead className="pr-4">Next booking</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <AvatarFallback>{initials(c.name)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 font-medium">
                          {c.name}
                          {new Date(c.createdAt) > monthAgo && (
                            <Badge variant="outline">New</Badge>
                          )}
                        </p>
                        <p className="truncate text-muted-foreground">
                          {c.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {c.phone ?? "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {c.visits}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {c.lastVisit ? formatDate(c.lastVisit, "short") : "—"}
                  </TableCell>
                  <TableCell className="pr-4">
                    {c.nextBooking ? (
                      formatDate(c.nextBooking, "weekday")
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : query ? (
        <div className="rounded-xl border border-dashed px-6 py-12 text-center">
          <p className="font-medium">No customers match “{q}”</p>
          <Link
            href="/dashboard/customers"
            className="mt-1 inline-block text-sm text-muted-foreground underline"
          >
            Clear search
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed px-6 py-12 text-center">
          <p className="font-medium">No customers yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            People show up here after their first booking.
          </p>
        </div>
      )}
    </>
  );
}
