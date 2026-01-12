"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/page-header";
import { BookingsTable } from "@/components/admin/bookings-table";
import type { BookingRow } from "@/components/Tables/data-table/columns/bookings-columns";
import { AdminDatePicker } from "@/components/admin/admin-date-picker";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminSidebarContext } from "@/components/admin/admin-shell";

type DraftFilters = {
  date: string;
  status: "all" | "paid" | "pending";
  bookingType: string;
  vehicleType: string;
};

type AppliedFilters = DraftFilters;

const ALL_BOOKING_TYPES_VALUE = "__all_booking_types__";
const ALL_VEHICLE_TYPES_VALUE = "__all_vehicle_types__";

const initialDraftFilters: DraftFilters = {
  date: "",
  status: "all",
  bookingType: "",
  vehicleType: "",
};

interface BookingsPageClientProps {
  bookings: BookingRow[];
}

export function BookingsPageClient({ bookings }: BookingsPageClientProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [draftFilters, setDraftFilters] =
    React.useState<DraftFilters>(initialDraftFilters);
  const [appliedFilters, setAppliedFilters] =
    React.useState<AppliedFilters>(initialDraftFilters);
  const sidebar = React.useContext(AdminSidebarContext);

  const uniqueCategories = React.useMemo(
    () =>
      Array.from(
        new Set(
          bookings
            .map((b) => b.category)
            .filter((value): value is string => !!value),
        ),
      ),
    [bookings],
  );

  const uniqueCars = React.useMemo(
    () =>
      Array.from(
        new Set(
          bookings
            .map((b) => b.car)
            .filter((value): value is string => !!value),
        ),
      ),
    [bookings],
  );

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
  };

  const handleClearAll = () => {
    setSearchTerm("");
    setDraftFilters(initialDraftFilters);
    setAppliedFilters(initialDraftFilters);
  };

  const filteredBookings = React.useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return bookings.filter((booking) => {
      // Search filter (name or email)
      if (normalizedSearch) {
        const nameMatch = booking.name.toLowerCase().includes(normalizedSearch);
        const emailMatch = booking.email
          .toLowerCase()
          .includes(normalizedSearch);
        if (!nameMatch && !emailMatch) {
          return false;
        }
      }

      // Date filter (pickup_date)
      if (appliedFilters.date) {
        if (!booking.pickup_date) {
          return false;
        }

        const bookingDate = new Date(booking.pickup_date);
        const bookingDateStr = bookingDate.toISOString().slice(0, 10);

        if (bookingDateStr !== appliedFilters.date) {
          return false;
        }
      }

      // Status filter (payment_id -> Paid/Pending)
      if (appliedFilters.status === "paid" && !booking.payment_id) {
        return false;
      }

      if (appliedFilters.status === "pending" && booking.payment_id) {
        return false;
      }

      // Booking Type filter (category)
      if (appliedFilters.bookingType) {
        if (booking.category !== appliedFilters.bookingType) {
          return false;
        }
      }

      // Vehicle Type filter (car)
      if (appliedFilters.vehicleType) {
        if (booking.car !== appliedFilters.vehicleType) {
          return false;
        }
      }

      return true;
    });
  }, [bookings, searchTerm, appliedFilters]);

  const handleDraftChange = <K extends keyof DraftFilters>(
    key: K,
    value: DraftFilters[K],
  ) => {
    setDraftFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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
        <div className="flex flex-col gap-2 px-3 py-3 md:flex-row md:flex-wrap md:items-center">
          {/* Date filter */}
          <div className="w-full sm:min-w-[170px] sm:w-auto">
            <AdminDatePicker
              label="Date"
              placeholder="Select date"
              value={draftFilters.date}
              onChange={(value) => handleDraftChange("date", value || "")}
            />
          </div>

          {/* Status filter */}
          <div className="w-full sm:min-w-[170px] sm:w-auto">
            <Select
              value={draftFilters.status}
              onValueChange={(value: DraftFilters["status"]) =>
                handleDraftChange("status", value)
              }
            >
              <SelectTrigger className="h-9 rounded-lg border border-input/60 bg-white text-xs md:text-sm font-medium text-heading-black">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter by Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Booking Type filter */}
          <div className="w-full sm:min-w-[170px] sm:w-auto">
            <Select
              value={
                draftFilters.bookingType || ALL_BOOKING_TYPES_VALUE
              }
              onValueChange={(value) =>
                handleDraftChange(
                  "bookingType",
                  value === ALL_BOOKING_TYPES_VALUE ? "" : value,
                )
              }
            >
              <SelectTrigger className="h-9 rounded-lg border border-input/60 bg-white text-xs md:text-sm font-medium text-heading-black">
                <SelectValue placeholder="Filter by Booking Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_BOOKING_TYPES_VALUE}>
                  Filter by Booking Type
                </SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Vehicle Type filter */}
          <div className="w-full sm:min-w-[170px] sm:w-auto">
            <Select
              value={
                draftFilters.vehicleType || ALL_VEHICLE_TYPES_VALUE
              }
              onValueChange={(value) =>
                handleDraftChange(
                  "vehicleType",
                  value === ALL_VEHICLE_TYPES_VALUE ? "" : value,
                )
              }
            >
              <SelectTrigger className="h-9 rounded-lg border border-input/60 bg-white text-xs md:text-sm font-medium text-heading-black">
                <SelectValue placeholder="Filter by Vehicle Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_VEHICLE_TYPES_VALUE}>
                  Filter by Vehicle Type
                </SelectItem>
                {uniqueCars.map((car) => (
                  <SelectItem key={car} value={car}>
                    {car}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end sm:ml-auto">
            <Button
              type="button"
              onClick={handleApplyFilters}
              className="h-9 rounded-lg bg-primary-yellow px-4 text-xs md:text-sm font-semibold text-heading-black shadow-sm hover:bg-primary-yellow/90"
            >
              Apply Filters
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClearAll}
              className="h-9 rounded-lg border border-input bg-white px-4 text-xs md:text-sm font-semibold text-heading-black hover:bg-muted"
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-input/60 bg-white shadow-sm">
        <div className="px-3 py-2 md:px-4 md:py-3">
          <BookingsTable data={filteredBookings} />
        </div>
      </div>
    </div>
  );
}


