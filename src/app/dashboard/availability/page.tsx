import { Plus, Trash2 } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { dayNames, formatDate } from "@/lib/format";
import { getCurrentProvider } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Availability" };

const weekOrder = [1, 2, 3, 4, 5, 6, 0] as const;

// TODO: replace with real time-off records
const timeOff = [
  {
    id: "to1",
    who: "Whole business",
    from: "2026-12-24",
    to: "2026-12-27",
    reason: "Christmas",
  },
  {
    id: "to2",
    who: "Rosa Lindqvist",
    from: "2026-10-19",
    to: "2026-10-23",
    reason: "Holiday",
  },
];

export default async function AvailabilityPage({
  searchParams,
}: PageProps<"/dashboard/availability">) {
  const provider = getCurrentProvider();
  const { staff: staffParam } = await searchParams;

  const scheduleItems = [
    { value: "business", label: "Business hours" },
    ...provider.staff.map((s) => ({ value: s.id, label: s.name })),
  ];
  const selected =
    scheduleItems.find((i) => i.value === staffParam)?.value ?? "business";

  // TODO: load the selected staff member's own hours
  const hours = provider.hours;

  return (
    <>
      <PageHeader
        title="Availability"
        description="When clients can book. Staff hours can't go outside business hours."
      />

      <div className="grid max-w-3xl gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly hours</CardTitle>
            <CardDescription>
              Repeats every week unless you add time off.
            </CardDescription>
            <CardAction>
              {/* TODO: navigate to ?staff= on change */}
              <Select
                name="schedule"
                items={scheduleItems}
                defaultValue={selected}
              >
                <SelectTrigger aria-label="Whose hours" className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {scheduleItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardAction>
          </CardHeader>
          <CardContent>
            {/* TODO: wire up to your save-hours action */}
            <form>
              <input type="hidden" name="schedule" value={selected} />
              <ul className="divide-y">
                {weekOrder.map((day) => {
                  const h = hours.find((x) => x.day === day);
                  const name = dayNames[day];
                  return (
                    <li
                      key={day}
                      className="group/day flex min-h-14 flex-wrap items-center gap-x-4 gap-y-2 py-2.5"
                    >
                      <div className="flex w-36 items-center gap-3">
                        <Switch
                          id={`open-${day}`}
                          name={`open-${day}`}
                          defaultChecked={h?.open}
                        />
                        <Label htmlFor={`open-${day}`} className="text-sm">
                          {name}
                        </Label>
                      </div>
                      <div className="hidden items-center gap-2 group-has-data-checked/day:flex">
                        <Input
                          type="time"
                          name={`start-${day}`}
                          defaultValue={h?.start ?? "09:00"}
                          aria-label={`${name} opens`}
                          className="w-28"
                        />
                        <span className="text-sm text-muted-foreground">
                          to
                        </span>
                        <Input
                          type="time"
                          name={`end-${day}`}
                          defaultValue={h?.end ?? "17:00"}
                          aria-label={`${name} closes`}
                          className="w-28"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                        >
                          <Plus data-icon="inline-start" />
                          Break
                        </Button>
                      </div>
                      <span className="text-sm text-muted-foreground group-has-data-checked/day:hidden">
                        Closed
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex justify-end border-t pt-4">
                <Button type="submit">Save hours</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time off</CardTitle>
            <CardDescription>
              Holidays, closures and days someone is away. No bookings are
              offered during these dates.
            </CardDescription>
            <CardAction>
              <TimeOffDialog
                people={[
                  "Whole business",
                  ...provider.staff.map((s) => s.name),
                ]}
              />
            </CardAction>
          </CardHeader>
          <CardContent>
            {timeOff.length > 0 ? (
              <ul className="divide-y rounded-lg border">
                {timeOff.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between gap-4 px-3 py-2.5 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="font-medium">
                        {formatDate(`${t.from}T00:00:00Z`, "short")} –{" "}
                        {formatDate(`${t.to}T00:00:00Z`, "short")}
                        <span className="font-normal text-muted-foreground">
                          {" "}
                          · {t.reason}
                        </span>
                      </p>
                      <p className="text-muted-foreground">{t.who}</p>
                    </div>
                    {/* TODO: wire up delete */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${t.reason}`}
                    >
                      <Trash2 />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No time off scheduled.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function TimeOffDialog({ people }: { people: string[] }) {
  const items = people.map((p) => ({ value: p, label: p }));
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        <Plus data-icon="inline-start" />
        Add time off
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add time off</DialogTitle>
          <DialogDescription>
            Existing bookings in this range aren't cancelled automatically.
          </DialogDescription>
        </DialogHeader>
        {/* TODO: wire up to your add-time-off action */}
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="who">Who</FieldLabel>
              <Select name="who" items={items} defaultValue={people[0]}>
                <SelectTrigger id="who" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="from">From</FieldLabel>
                <Input id="from" name="from" type="date" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="to">To</FieldLabel>
                <Input id="to" name="to" type="date" required />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="reason">Reason</FieldLabel>
              <Input
                id="reason"
                name="reason"
                placeholder="e.g. Public holiday"
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-6">
            <DialogClose
              type="button"
              className={buttonVariants({ variant: "outline" })}
            >
              Cancel
            </DialogClose>
            <Button type="submit">Add time off</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
