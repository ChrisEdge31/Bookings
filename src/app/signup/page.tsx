import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Sign up" };

export default async function SignupPage({
  searchParams,
}: PageProps<"/signup">) {
  const { type } = await searchParams;
  const isBusiness = type === "business";

  return (
    <>
      <nav
        aria-label="Account type"
        className="mb-4 grid grid-cols-2 rounded-lg border bg-background p-1 text-sm"
      >
        <AccountTypeTab href="/signup" active={!isBusiness}>
          I'm booking
        </AccountTypeTab>
        <AccountTypeTab href="/signup?type=business" active={isBusiness}>
          I run a business
        </AccountTypeTab>
      </nav>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {isBusiness ? "Create your booking page" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {isBusiness
              ? "You can add services and opening hours once you're in."
              : "Keep track of every appointment in one place."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: wire up to your sign-up action */}
          <form>
            <input
              type="hidden"
              name="accountType"
              value={isBusiness ? "business" : "customer"}
            />
            <FieldGroup>
              {isBusiness && (
                <>
                  <Field>
                    <FieldLabel htmlFor="businessName">
                      Business name
                    </FieldLabel>
                    <Input
                      id="businessName"
                      name="businessName"
                      autoComplete="organization"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="slug">Booking page address</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <InputGroupText>/</InputGroupText>
                      </InputGroupAddon>
                      <InputGroupInput
                        id="slug"
                        name="slug"
                        placeholder="your-business"
                        pattern="[a-z0-9-]+"
                        required
                      />
                    </InputGroup>
                    <FieldDescription>
                      Lowercase letters, numbers and dashes. You can change it
                      later.
                    </FieldDescription>
                  </Field>
                </>
              )}
              <Field>
                <FieldLabel htmlFor="name">Your name</FieldLabel>
                <Input id="name" name="name" autoComplete="name" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
                <FieldDescription>At least 8 characters.</FieldDescription>
              </Field>
              <Button type="submit" size="lg" className="w-full">
                Create account
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-foreground underline">
          Log in
        </Link>
      </p>
    </>
  );
}

function AccountTypeTab({
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
      replace
      className={cn(
        "rounded-md py-1.5 text-center font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
