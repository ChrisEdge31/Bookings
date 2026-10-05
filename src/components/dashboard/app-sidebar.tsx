"use client";

import {
  CalendarDays,
  ChevronsUpDown,
  Clock,
  LayoutDashboard,
  LogOut,
  Scissors,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { initials } from "@/lib/format";

const nav = [
  {
    label: "Bookings",
    items: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/calendar", label: "Calendar", icon: CalendarDays },
      { href: "/dashboard/customers", label: "Customers", icon: Users },
    ],
  },
  {
    label: "Setup",
    items: [
      { href: "/dashboard/services", label: "Services", icon: Scissors },
      { href: "/dashboard/staff", label: "Staff", icon: UserRound },
      { href: "/dashboard/availability", label: "Availability", icon: Clock },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
] as const;

export function AppSidebar({
  businessName,
  userName,
  userEmail,
}: {
  businessName: string;
  userName: string;
  userEmail: string;
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 justify-center px-3 group-data-[collapsible=icon]:px-2">
        <Logo
          href="/dashboard"
          className="text-sm group-data-[collapsible=icon]:[&>span:last-child]:hidden"
        />
      </SidebarHeader>
      <SidebarContent>
        {nav.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive(item.href)}
                      tooltip={item.label}
                      render={<Link href={item.href} />}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<SidebarMenuButton size="lg" />}
                aria-label="Account menu"
              >
                <Avatar className="size-7 rounded-md">
                  <AvatarFallback className="rounded-md text-[0.625rem]">
                    {initials(userName)}
                  </AvatarFallback>
                </Avatar>
                <span className="grid min-w-0 flex-1 text-left leading-tight">
                  <span className="truncate font-medium">{businessName}</span>
                  <span className="truncate text-muted-foreground">
                    {userName}
                  </span>
                </span>
                <ChevronsUpDown className="ml-auto" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <span className="block font-medium text-foreground">
                      {userName}
                    </span>
                    <span className="block truncate">{userEmail}</span>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/dashboard/settings" />}>
                  <Settings />
                  Settings
                </DropdownMenuItem>
                {/* TODO: wire up sign out */}
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
