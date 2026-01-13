"use client";

import * as React from "react";
import { CarFront, Search } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/page-header";
import { DriversTable } from "@/components/admin/drivers-table";
import type { DriverRow } from "@/components/Tables/data-table/columns/drivers-columns";

interface DriversPageClientProps {
  drivers: DriverRow[];
}

export function DriversPageClient({ drivers }: DriversPageClientProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const totalDrivers = drivers.length;
  const activeDrivers = drivers.filter(
    (driver) => (driver.status || "").toLowerCase() === "approved",
  ).length;
  const pendingDrivers = drivers.filter(
    (driver) => (driver.status || "").toLowerCase() === "pending",
  ).length;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const newThisMonth = drivers.filter((driver) => {
    if (!driver.created_at) return false;
    const created = new Date(driver.created_at);
    return (
      created.getMonth() === currentMonth && created.getFullYear() === currentYear
    );
  }).length;

  const filteredDrivers = React.useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return drivers;

    return drivers.filter((driver) => {
      const nameMatch = driver.name.toLowerCase().includes(normalized);
      const emailMatch = (driver.email ?? "").toLowerCase().includes(normalized);
      return nameMatch || emailMatch;
    });
  }, [drivers, searchTerm]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Drivers"
        description="Review and manage registered drivers."
        actions={
          <div className="w-full sm:w-72">
            <div className="flex items-center gap-2 rounded-md border border-border bg-white px-3 py-2 shadow-sm">
              <Search className="h-4 w-4 flex-shrink-0 text-text-gray" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by driver or email..."
                className="w-full bg-transparent text-sm text-heading-black outline-none placeholder:text-text-gray"
              />
            </div>
          </div>
        }
      />

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center gap-4 rounded-2xl bg-white px-4 py-3 sm:px-5 sm:py-4 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] text-white">
            <CarFront className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-gray">Total Drivers</p>
            <p className="text-2xl font-semibold text-heading-black">
              {totalDrivers}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-white px-4 py-3 sm:px-5 sm:py-4 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#16A34A] text-white">
            <CarFront className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-gray">Active Drivers</p>
            <p className="text-2xl font-semibold text-heading-black">
              {activeDrivers}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-white px-4 py-3 sm:px-5 sm:py-4 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F59E0B] text-white">
            <CarFront className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-gray">
              Pending Approval
            </p>
            <p className="text-2xl font-semibold text-heading-black">
              {pendingDrivers}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-white px-4 py-3 sm:px-5 sm:py-4 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8B5CF6] text-white">
            <CarFront className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-gray">New This Month</p>
            <p className="text-2xl font-semibold text-heading-black">
              {newThisMonth}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-input/60 bg-white shadow-sm">
        <div className="px-3 py-2 md:px-4 md:py-3">
          <DriversTable data={filteredDrivers} />
        </div>
      </div>
    </div>
  );
}


