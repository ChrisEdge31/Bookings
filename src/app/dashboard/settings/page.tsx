import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getCurrentProvider } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Settings" };

const noticeOptions = [
  { value: "0", label: "No minimum" },
  { value: "60", label: "1 hour" },
  { value: "180", label: "3 hours" },
  { value: "720", label: "12 hours" },
  { value: "1440", label: "24 hours" },
];
const horizonOptions = [
  { value: "14", label: "2 weeks" },
  { value: "30", label: "1 month" },
  { value: "60", label: "2 months" },
  { value: "90", label: "3 months" },
];
const cancelOptions = [
  { value: "0", label: "Any time" },
  { value: "120", label: "Up to 2 hours before" },
  { value: "1440", label: "Up to 24 hours before" },
  { value: "2880", label: "Up to 48 hours before" },
];

export default function SettingsPage() {
  const provider = getCurrentProvider();

  return (
    <>
      <PageHeader title="Settings" />

      <div className="grid max-w-3xl gap-6">
        {/* TODO: wire each form to its own save action */}
        <form>
          <Card>
            <CardHeader>
              <CardTitle>Business profile</CardTitle>
              <CardDescription>
                Shown on your booking page and in the directory.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="name">Business name</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={provider.name}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="category">Category</FieldLabel>
                    <Input
                      id="category"
                      name="category"
                      defaultValue={provider.category}
                      placeholder="e.g. Barber"
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="tagline">Tagline</FieldLabel>
                  <Input
                    id="tagline"
                    name="tagline"
                    defaultValue={provider.tagline}
                    maxLength={80}
                  />
                  <FieldDescription>
                    One line under your name. 80 characters max.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">About</FieldLabel>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    defaultValue={provider.description}
                  />
                </Field>
                <FieldSeparator />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="address">Street address</FieldLabel>
                    <Input
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      defaultValue={provider.address}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="city">City</FieldLabel>
                    <Input
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      defaultValue={provider.city}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      defaultValue={provider.phone}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Public email</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={provider.email}
                    />
                  </Field>
                </div>
              </FieldGroup>
            </CardContent>
            <CardFooter className="justify-end border-t">
              <Button type="submit">Save profile</Button>
            </CardFooter>
          </Card>
        </form>

        <form>
          <Card>
            <CardHeader>
              <CardTitle>Booking page</CardTitle>
              <CardDescription>
                Where clients find you and book.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="slug">Page address</FieldLabel>
                  <InputGroup className="max-w-sm">
                    <InputGroupAddon>
                      <InputGroupText>/</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      id="slug"
                      name="slug"
                      defaultValue={provider.slug}
                      pattern="[a-z0-9-]+"
                      required
                    />
                  </InputGroup>
                  <FieldDescription>
                    Changing this breaks links you've already shared.
                  </FieldDescription>
                </Field>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldLabel htmlFor="listed">
                      List in the directory
                    </FieldLabel>
                    <FieldDescription>
                      Let new clients find you when they browse.
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id="listed"
                    name="listedInDirectory"
                    defaultChecked={provider.listedInDirectory}
                  />
                </Field>
              </FieldGroup>
            </CardContent>
            <CardFooter className="justify-end border-t">
              <Button type="submit">Save</Button>
            </CardFooter>
          </Card>
        </form>

        <form>
          <Card>
            <CardHeader>
              <CardTitle>Booking rules</CardTitle>
              <CardDescription>
                Applies to every service and staff member.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldLabel htmlFor="manualApproval">
                      Approve bookings manually
                    </FieldLabel>
                    <FieldDescription>
                      New bookings stay pending until you confirm them.
                    </FieldDescription>
                  </FieldContent>
                  <Switch id="manualApproval" name="manualApproval" />
                </Field>
                <FieldSeparator />
                <RuleSelect
                  id="minNotice"
                  label="Minimum notice"
                  description="How soon before an appointment clients can book."
                  options={noticeOptions}
                  defaultValue="60"
                />
                <RuleSelect
                  id="horizon"
                  label="Booking window"
                  description="How far ahead clients can book."
                  options={horizonOptions}
                  defaultValue="30"
                />
                <RuleSelect
                  id="cancelCutoff"
                  label="Cancellations"
                  description="When clients can still cancel or reschedule online."
                  options={cancelOptions}
                  defaultValue="1440"
                />
              </FieldGroup>
            </CardContent>
            <CardFooter className="justify-end border-t">
              <Button type="submit">Save rules</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}

function RuleSelect({
  id,
  label,
  description,
  options,
  defaultValue,
}: {
  id: string;
  label: string;
  description: string;
  options: { value: string; label: string }[];
  defaultValue: string;
}) {
  return (
    <Field orientation="responsive">
      <FieldContent>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <FieldDescription>{description}</FieldDescription>
      </FieldContent>
      <Select name={id} items={options} defaultValue={defaultValue}>
        <SelectTrigger id={id} className="w-full sm:w-52">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}
