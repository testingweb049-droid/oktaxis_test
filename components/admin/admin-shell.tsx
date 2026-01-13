"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  BadgePercent,
  CalendarRange,
  Car,
  ChevronDown,
  IdCard,
  LogOut,
  NotebookTabs,
  Search,
} from "lucide-react";
import { createContext, useContext, useMemo, useState } from "react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import WhiteLogo from "@/assets/logo-white.png";

const bookingsMenuItems = [
  { href: "/bookings", label: "Bookings", icon: NotebookTabs },
  { href: "/bookings/find", label: "Find a Booking", icon: Search },
] as const;

const secondaryNavItems = [
  { href: "/car-category", label: "Car Category", icon: Car },
  { href: "/drivers", label: "Drivers", icon: IdCard },
] as const;

type AdminSidebarContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const AdminSidebarContext =
  createContext<AdminSidebarContextValue | undefined>(undefined);

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [bookingsOpen, setBookingsOpen] = useState(true);

  const currentSectionTitle = useMemo(() => {
    if (pathname.startsWith("/bookings")) return "Admin Bookings";
    if (pathname.startsWith("/drivers")) return "Admin Drivers";
    return "Admin Panel";
  }, [pathname]);

const SidebarContent = () => {
    const isBookingsSectionActive = pathname.startsWith("/bookings");

    return (
      <div className="flex h-full flex-col bg-heading-black text-white shadow-lg overflow-hidden px-4 py-5 w-full text-sm md:text-base">
        <div className="flex items-center gap-3 pb-3 mb-2 border-b border-white/10">
          <Image
            src={WhiteLogo}
            alt="OKTaxis Logo"
            width={140}
            height={70}
            className="w-28 md:w-32 object-contain"
            priority
          />
        </div>

        <nav className="flex-1 py-3 space-y-3">
          {/* Bookings menu group */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setBookingsOpen((prev) => !prev)}
              className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm md:text-base font-semibold transition-colors ${
                isBookingsSectionActive
                  ? "bg-primary-yellow text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white text-[11px] md:text-xs">
                  <CalendarRange className="h-4 w-4" />
                </span>
                <span>Bookings Menu</span>
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  bookingsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {bookingsOpen && (
              <div className="space-y-0.5 pl-3 pt-1">
                {bookingsMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isBookingsRoot = item.href === "/bookings";
                  const isActive = isBookingsRoot
                    ? pathname === "/bookings"
                    : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                    className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm md:text-[15px] font-medium transition-colors ${
                      isActive
                        ? "bg-[#3c3c3c] text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Secondary navigation items */}
          <div className="space-y-1.5 mt-2">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm md:text-base font-medium transition-colors ${
                      isActive
                        ? "bg-primary-yellow text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{item.label}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="pt-3 mt-3 border-t border-white/10">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-center gap-2 bg-transparent text-white border-white/40 hover:bg-white/10"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    );
  };

  return (
    <AdminSidebarContext.Provider value={{ open, setOpen }}>
      <div className="min-h-screen overflow-x-hidden bg-[#F5F5F5] font-montserrat text-sm md:text-base">
        <div className="flex min-h-screen">
          {/* Desktop sidebar - fixed, full viewport height on larger screens */}
          <aside className="hidden md:block md:fixed md:inset-y-0 md:left-0 md:z-30 md:w-64 lg:w-72">
            <SidebarContent />
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col min-w-0 w-full md:ml-64 lg:ml-72 relative bg-[#F5F5F5]">
            <main className="flex-1 bg-[#F5F5F5] overflow-y-auto pt-4 md:pt-6 pb-10 md:pb-12 px-4 md:px-8">
              <div className="w-full">{children}</div>
            </main>
          </div>

          {/* Mobile sidebar sheet, opened from header hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="p-0 w-64 md:hidden">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </AdminSidebarContext.Provider>
  );
}





