"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LogOut,
  Menu,
  LayoutDashboard,
  CalendarRange,
  Users,
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import WhiteLogo from "@/assets/logo-white.png";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/bookings", label: "Bookings", icon: CalendarRange },
  { href: "/drivers", label: "Drivers", icon: Users },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-heading-black text-white shadow-lg overflow-hidden px-8 py-6 w-full text-base md:text-lg">
      <div className="flex items-center py-4 border-b border-white/10">
        <Image
          src={WhiteLogo}
          alt="OKTaxis Logo"
          width={140}
          height={70}
          className="w-28 md:w-32 object-contain"
          priority
        />
      </div>
      <nav className="flex-1 space-y-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <span
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium transition-colors ${
                  isActive
                    ? "bg-primary-yellow text-heading-black"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="py-4 border-t border-white/10">
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-light-background font-montserrat text-base md:text-lg">
      <div className="flex min-h-screen">
        {/* Desktop sidebar - fixed, full viewport height on larger screens */}
        <aside className="hidden md:block md:fixed md:inset-y-0 md:left-0 md:z-30 md:w-64">
          <SidebarContent />
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 py-4 md:py-6 w-full md:ml-64">
          <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur px-4 py-3 md:px-6">
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-heading-black">
                Admin Dashboard
              </span>
            </div>
            {/* Mobile sidebar toggle inside header */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden bg-heading-black text-white border-white/30"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open admin navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-1 px-4 py-4 md:px-6 md:py-6">
          <div className="w-full">{children}</div>
        </main>
        </div>
      </div>
    </div>
  );
}





