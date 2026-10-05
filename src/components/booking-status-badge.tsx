import { Badge } from "@/components/ui/badge";
import type { BookingStatus } from "@/lib/types";

const labels: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  pending: "Pending",
  completed: "Completed",
  cancelled: "Cancelled",
  no_show: "No-show",
};

const variants: Record<
  BookingStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  confirmed: "default",
  pending: "outline",
  completed: "secondary",
  cancelled: "destructive",
  no_show: "destructive",
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
}
