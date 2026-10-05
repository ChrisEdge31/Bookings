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
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Service, StaffMember } from "@/lib/types";

/** Add a staff member, or edit one when `member` is passed. */
export function StaffFormDialog({
  services,
  member,
  trigger,
  triggerClassName,
}: {
  services: Service[];
  member?: StaffMember;
  trigger: React.ReactNode;
  triggerClassName?: string;
}) {
  const id = member?.id ?? "new-staff";
  return (
    <Dialog>
      <DialogTrigger className={triggerClassName ?? buttonVariants()}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {member ? `Edit ${member.name}` : "Add a staff member"}
          </DialogTitle>
          <DialogDescription>
            {member
              ? "Changes show on your booking page straight away."
              : "We'll email them an invite to set up their login."}
          </DialogDescription>
        </DialogHeader>
        {/* TODO: wire up to your create/update-staff action */}
        <form>
          {member && <input type="hidden" name="id" value={member.id} />}
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor={`${id}-name`}>Name</FieldLabel>
                <Input
                  id={`${id}-name`}
                  name="name"
                  defaultValue={member?.name}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor={`${id}-role`}>Role</FieldLabel>
                <Input
                  id={`${id}-role`}
                  name="role"
                  defaultValue={member?.role}
                  placeholder="e.g. Senior barber"
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor={`${id}-email`}>Email</FieldLabel>
              <Input
                id={`${id}-email`}
                name="email"
                type="email"
                defaultValue={member?.email}
                required
              />
              <FieldDescription>
                Booking notifications go here.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor={`${id}-phone`}>
                Phone{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </FieldLabel>
              <Input
                id={`${id}-phone`}
                name="phone"
                type="tel"
                defaultValue={member?.phone}
              />
            </Field>
            <FieldSet>
              <FieldLegend variant="label">Services they offer</FieldLegend>
              <div className="grid gap-2 sm:grid-cols-2">
                {services.map((service) => (
                  <Field key={service.id} orientation="horizontal">
                    <Checkbox
                      id={`${id}-service-${service.id}`}
                      name="serviceIds"
                      value={service.id}
                      defaultChecked={
                        member ? service.staffIds.includes(member.id) : false
                      }
                    />
                    <FieldLabel
                      htmlFor={`${id}-service-${service.id}`}
                      className="font-normal"
                    >
                      {service.name}
                    </FieldLabel>
                  </Field>
                ))}
              </div>
            </FieldSet>
          </FieldGroup>
          <DialogFooter className="mt-6">
            <DialogClose
              type="button"
              className={buttonVariants({ variant: "outline" })}
            >
              Cancel
            </DialogClose>
            <Button type="submit">
              {member ? "Save changes" : "Send invite"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
