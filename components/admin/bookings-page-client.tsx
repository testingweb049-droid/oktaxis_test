"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/page-header";
import { BookingsTable } from "@/components/admin/bookings-table";
import type { BookingRow } from "@/components/Tables/data-table/columns/bookings-columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="space-y-6">
      <AdminPageHeader
        title="Bookings"
        description="Browse and manage all customer bookings."
        actions={
          <div className="w-full sm:w-72">
            <div className="flex items-center rounded-md border border-border bg-white px-3 py-2 shadow-sm gap-2">
              <Search className="h-4 w-4 text-text-gray flex-shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by passenger or email..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-text-gray text-heading-black"
              />
            </div>
          </div>
        }
      />

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-white px-3 py-3 md:flex-row md:flex-wrap md:items-center md:px-4 md:py-4 shadow-sm">
        {/* Date filter */}
        <div className="flex items-center rounded-lg border border-input bg-white px-3 py-2 text-sm text-heading-black shadow-xs w-full sm:min-w-[180px] sm:w-auto">
          <Input
            type="date"
            value={draftFilters.date}
            onChange={(event) =>
              handleDraftChange("date", event.target.value || "")
            }
            className="h-8 border-0 p-0 text-sm text-heading-black focus-visible:ring-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </div>

        {/* Status filter */}
        <div className="w-full sm:min-w-[180px] sm:w-auto">
          <Select
            value={draftFilters.status}
            onValueChange={(value: DraftFilters["status"]) =>
              handleDraftChange("status", value)
            }
          >
            <SelectTrigger className="h-10 rounded-lg border border-input bg-white text-sm font-medium text-heading-black">
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
        <div className="w-full sm:min-w-[180px] sm:w-auto">
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
            <SelectTrigger className="h-10 rounded-lg border border-input bg-white text-sm font-medium text-heading-black">
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
        <div className="w-full sm:min-w-[180px] sm:w-auto">
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
            <SelectTrigger className="h-10 rounded-lg border border-input bg-white text-sm font-medium text-heading-black">
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
            className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Apply Filters
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleClearAll}
            className="h-10 rounded-lg border border-input bg-white px-4 text-sm font-semibold text-heading-black hover:bg-muted"
          >
            Clear All
          </Button>
        </div>
      </div>

      <BookingsTable data={filteredBookings} />
    </div>
  );
}


