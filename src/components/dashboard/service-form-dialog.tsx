import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { currencySymbol } from "@/lib/format";
import type { Service, StaffMember } from "@/lib/types";

/** Add a service, or edit one when `service` is passed. */
export function ServiceFormDialog({
  staff,
  service,
  trigger,
  triggerClassName,
}: {
  staff: StaffMember[];
  service?: Service;
  trigger: React.ReactNode;
  triggerClassName?: string;
}) {
  const id = service?.id ?? "new";
  return (
    <Dialog>
      <DialogTrigger className={triggerClassName ?? buttonVariants()}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {service ? "Edit service" : "Add a service"}
          </DialogTitle>
          <DialogDescription>
            Clients see the name, length and price when they book.
          </DialogDescription>
        </DialogHeader>
        {/* TODO: wire up to your create/update-service action */}
        <form>
          {service && <input type="hidden" name="id" value={service.id} />}
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor={`${id}-name`}>Name</FieldLabel>
              <Input
                id={`${id}-name`}
                name="name"
                defaultValue={service?.name}
                placeholder="e.g. Skin fade"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${id}-description`}>
                Description{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </FieldLabel>
              <Textarea
                id={`${id}-description`}
                name="description"
                rows={2}
                defaultValue={service?.description}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor={`${id}-duration`}>Length</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={`${id}-duration`}
                    name="durationMinutes"
                    type="number"
                    min={5}
                    step={5}
                    defaultValue={service?.durationMinutes ?? 30}
                    required
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>min</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor={`${id}-price`}>Price</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>{currencySymbol}</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id={`${id}-price`}
                    name="price"
                    type="number"
                    min={0}
                    step="0.01"
                    defaultValue={
                      service ? (service.priceCents / 100).toString() : ""
                    }
                    required
                  />
                </InputGroup>
              </Field>
            </div>
            <FieldSet>
              <FieldLegend variant="label">Who offers it</FieldLegend>
              <div className="grid gap-2 sm:grid-cols-2">
                {staff.map((member) => (
                  <Field key={member.id} orientation="horizontal">
                    <Checkbox
                      id={`${id}-staff-${member.id}`}
                      name="staffIds"
                      value={member.id}
                      defaultChecked={
                        service ? service.staffIds.includes(member.id) : true
                      }
                    />
                    <FieldLabel
                      htmlFor={`${id}-staff-${member.id}`}
                      className="font-normal"
                    >
                      {member.name}
                    </FieldLabel>
                  </Field>
                ))}
              </div>
            </FieldSet>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor={`${id}-active`}>
                  Show on booking page
                </FieldLabel>
                <FieldDescription>
                  Turn off to hide it without deleting it.
                </FieldDescription>
              </FieldContent>
              <Switch
                id={`${id}-active`}
                name="active"
                defaultChecked={service?.active ?? true}
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
            <Button type="submit">
              {service ? "Save changes" : "Add service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
