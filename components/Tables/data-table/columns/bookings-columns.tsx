"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "../data-table-row-actions";
import type { FilterColumn } from "../data-table-types";

export interface BookingRow {
  id: number;
  name: string;
  email: string;
  pickup_location: string;
  dropoff_location: string | null;
  pickup_date: Date | null;
  car: string;
  category: string;
  price: string;
  created_at: Date;
  payment_id: string | null;
}

export function getBookingColumns(): ColumnDef<BookingRow>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Passengers" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-xs sm:text-sm text-heading-black">
            {row.original.name}
          </span>
          <span className="text-xs sm:text-[13px] text-text-gray truncate">
            {row.original.email}
          </span>
        </div>
      ),
    },
    {
      id: "pickup_location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pickup" />
      ),
      cell: ({ row }) => (
        <span className="block max-w-[150px] text-[11px] sm:text-xs text-text-gray truncate whitespace-nowrap">
          {row.original.pickup_location}
        </span>
      ),
    },
    {
      id: "dropoff_location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dropoff" />
      ),
      cell: ({ row }) => (
        <span className="block max-w-[150px] text-[11px] sm:text-xs text-text-gray truncate whitespace-nowrap">
          {row.original.dropoff_location ?? "—"}
        </span>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Booking Type" />
      ),
      enableColumnFilter: true,
      cell: ({ row }) => (
        <span className="text-[11px] sm:text-xs font-medium uppercase text-text-gray">
          {row.original.category}
        </span>
      ),
    },
    {
      accessorKey: "car",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Vehicle Type" />
      ),
      cell: ({ row }) => (
        <span className="text-[11px] sm:text-xs text-text-gray">
          {row.original.car}
        </span>
      ),
    },
    {
      id: "time",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Time" />
      ),
      cell: ({ row }) => {
        if (!row.original.pickup_date) {
          return (
            <span className="text-[11px] sm:text-xs text-text-gray">
              —
            </span>
          );
        }

        const date = new Date(+(row.original.pickup_date));
        if (Number.isNaN(date.getTime())) {
          return (
            <span className="text-[11px] sm:text-xs text-text-gray">
              —
            </span>
          );
        }

        return (
          <span className="text-[11px] sm:text-xs text-text-gray">
            {date.toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
    },
    {
      id: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => {
        if (!row.original.pickup_date) {
          return (
            <span className="text-xs sm:text-sm text-text-gray">
              —
            </span>
          );
        }

        const date = new Date(+(row.original.pickup_date));
        if (Number.isNaN(date.getTime())) {
          return (
            <span className="text-xs sm:text-sm text-text-gray">
              —
            </span>
          );
        }

        return (
          <span className="text-[11px] sm:text-xs text-text-gray">
            {date.toLocaleDateString()}
          </span>
        );
      },
    },
    {
      accessorKey: "payment_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      enableColumnFilter: true,
      cell: ({ row }) => {
        const hasPayment = !!row.original.payment_id;
        const pickupDate = row.original.pickup_date
          ? new Date(+(row.original.pickup_date))
          : null;

        let status: "Active" | "Pending" | "Completed";

        if (!hasPayment) {
          status = "Pending";
        } else if (pickupDate && !Number.isNaN(pickupDate.getTime())) {
          status = pickupDate.getTime() < Date.now() ? "Completed" : "Active";
        } else {
          status = "Active";
        }

        const classes =
          status === "Active"
            ? "bg-emerald-50 text-emerald-700"
            : status === "Pending"
              ? "bg-amber-50 text-amber-700"
              : "bg-blue-50 text-blue-700";

        return (
          <Badge
            variant="outline"
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] sm:text-[11px] font-semibold border-0 ${classes}`}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => (
        <Link
          href={`/bookings/${row.original.id}`}
          className="text-[11px] sm:text-xs font-semibold text-primary-yellow hover:underline"
        >
          View Details
        </Link>
      ),
    },
  ];
}

export function getBookingFilterColumns(
  bookings: BookingRow[],
): FilterColumn[] {
  const categories = Array.from(
    new Set(bookings.map((b) => b.category).filter(Boolean)),
  );

  const statuses = ["Paid", "Pending"];

  return [
    {
      column: "category",
      title: "Category",
      multiple: true,
      options: categories.map((category) => ({
        label: category,
        value: category,
      })),
    },
    {
      column: "payment_id",
      title: "Status",
      multiple: true,
      options: statuses.map((status) => ({
        label: status,
        value: status === "Paid" ? "paid" : "pending",
      })),
    },
  ];
}


