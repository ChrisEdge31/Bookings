import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getCurrentProvider } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s · Dashboard" },
};

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const provider = getCurrentProvider();
  const owner = provider.staff[0];
  const defaultOpen = (await cookies()).get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar
        businessName={provider.name}
        userName={owner.name}
        userEmail={owner.email}
      />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-1 my-auto h-4!" />
          <span className="truncate text-sm font-medium">{provider.name}</span>
          <Link
            href={`/${provider.slug}`}
            target="_blank"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "ml-auto",
            )}
          >
            <span className="hidden sm:inline">View booking page</span>
            <span className="sm:hidden">Booking page</span>
            <ExternalLink data-icon="inline-end" />
          </Link>
        </header>
        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
