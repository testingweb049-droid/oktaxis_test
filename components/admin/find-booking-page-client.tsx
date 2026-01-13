"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminDatePicker } from "@/components/admin/admin-date-picker";
import { FindBookingsTable } from "@/components/admin/find-bookings-table";
import type { BookingRow } from "@/components/Tables/data-table/columns/bookings-columns";
import { Button } from "@/components/ui/button";

interface FindBookingPageClientProps {
  bookings: BookingRow[];
}

type DateRange = {
  start: string;
  end: string;
};

export function FindBookingPageClient({
  bookings,
}: FindBookingPageClientProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [range, setRange] = React.useState<DateRange>({ start: "", end: "" });
  const [appliedRange, setAppliedRange] = React.useState<DateRange>({
    start: "",
    end: "",
  });

  const handleApplyFilters = () => {
    setAppliedRange(range);
  };

  const handleClearAll = () => {
    const empty = { start: "", end: "" };
    setRange(empty);
    setAppliedRange(empty);
  };

  const filteredBookings = React.useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const startDate = appliedRange.start
      ? new Date(appliedRange.start)
      : null;
    const endDate = appliedRange.end ? new Date(appliedRange.end) : null;

    return bookings.filter((booking) => {
      // Text search by name, email or booking id
      if (normalizedSearch) {
        const nameMatch = booking.name
          .toLowerCase()
          .includes(normalizedSearch);
        const emailMatch = booking.email
          .toLowerCase()
          .includes(normalizedSearch);
        const idMatch = String(booking.id).includes(normalizedSearch);

        if (!nameMatch && !emailMatch && !idMatch) {
          return false;
        }
      }

      if (!appliedRange.start && !appliedRange.end) {
        return true;
      }

      if (!booking.pickup_date) return false;

      const pickup = new Date(+(booking.pickup_date));
      if (Number.isNaN(pickup.getTime())) return false;

      if (startDate && pickup < startDate) return false;
      if (endDate && pickup > endDate) return false;

      return true;
    });
  }, [bookings, appliedRange, searchTerm]);

  return (
    <div className="space-y-2 md:space-y-3">
      <AdminPageHeader
        title="Admin Bookings"
        actions={
          <div className="flex w-full items-center">
            <div className="flex w-full max-w-full sm:max-w-md items-center gap-2 rounded-full border border-border/60 bg-white px-3 py-1">
              <Search className="h-3.5 w-3.5 text-text-gray flex-shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search bookings..."
                className="w-full bg-transparent text-xs md:text-sm outline-none placeholder:text-text-gray text-heading-black"
              />
            </div>
          </div>
        }
      />

      <div className="rounded-lg border border-input/60 bg-white shadow-sm">
        <div className="flex flex-col gap-3 px-3 py-3 md:flex-row md:items-center md:gap-4 md:px-4">
          <div className="flex-1 flex flex-col gap-3 md:flex-row md:items-end">
            <AdminDatePicker
              label="Start date"
              placeholder="Start date"
              value={range.start}
              onChange={(value) =>
                setRange((prev) => ({
                  ...prev,
                  start: value,
                }))
              }
            />
            <AdminDatePicker
              label="End date"
              placeholder="End date"
              value={range.end}
              onChange={(value) =>
                setRange((prev) => ({
                  ...prev,
                  end: value,
                }))
              }
            />
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-2 md:w-auto md:justify-end">
            <Button
              type="button"
              onClick={handleApplyFilters}
              className="h-10 rounded-md bg-primary-yellow px-4 text-xs md:text-sm font-semibold text-heading-black shadow-sm hover:bg-primary-yellow/90"
            >
              Apply Filters
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClearAll}
              className="h-10 rounded-md border border-input bg-white px-4 text-xs md:text-sm font-semibold text-heading-black hover:bg-muted"
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-input/60 bg-white shadow-sm">
        <div className="px-3 py-2 md:px-4 md:py-3">
          <FindBookingsTable data={filteredBookings} />
        </div>
      </div>
    </div>
  );
}


