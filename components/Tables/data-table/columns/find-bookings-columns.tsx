"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import type { BookingRow } from "./bookings-columns";

export type FindBookingRow = BookingRow;

export function getFindBookingColumns(): ColumnDef<FindBookingRow>[] {
  return [
    {
      accessorKey: "id",
      header: "Booking ID",
      cell: ({ row }) => (
        <span className="text-xs sm:text-sm text-heading-black font-medium">
          CLS-{row.original.id}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="text-xs sm:text-sm text-heading-black">
          {row.original.name}
        </span>
      ),
    },
    {
      id: "type",
      header: "Type",
      cell: () => (
        <span className="text-xs sm:text-sm text-text-gray">
          Point
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const hasPayment = !!row.original.payment_id;

        const label = hasPayment ? "Assigned" : "Pending";
        const classes = hasPayment
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700";

        return (
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${classes}`}
          >
            {label}
          </span>
        );
      },
    },
    {
      id: "date",
      header: "Date",
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
          <span className="text-xs sm:text-sm text-text-gray">
            {date.toLocaleDateString()}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Link
          href={`/bookings/${row.original.id}`}
          className="text-xs sm:text-sm font-semibold text-primary-yellow hover:underline"
        >
          View
        </Link>
      ),
    },
  ];
}


