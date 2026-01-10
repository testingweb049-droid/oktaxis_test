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
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => (
        <span className="text-xs sm:text-sm text-text-gray">
          #{row.original.id}
        </span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Passenger" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm sm:text-base">
            {row.original.name}
          </span>
          <span className="text-xs sm:text-sm text-text-gray truncate">
            {row.original.email}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "pickup_location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Route" />
      ),
      cell: ({ row }) => (
        <div className="text-xs sm:text-sm text-text-gray max-w-xs">
          <p className="truncate">{row.original.pickup_location}</p>
          {row.original.dropoff_location && (
            <p className="truncate">→ {row.original.dropoff_location}</p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "pickup_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pickup" />
      ),
      cell: ({ row }) =>
        row.original.pickup_date ? (
          <div className="text-xs sm:text-sm text-text-gray">
            {new Date(+(row.original.pickup_date)).toLocaleDateString()}
          </div>
        ) : (
          <span className="text-xs sm:text-sm text-text-gray">—</span>
        ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      enableColumnFilter: true,
      cell: ({ row }) => (
        <span className="text-xs sm:text-sm font-medium uppercase text-text-gray">
          {row.original.category}
        </span>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      cell: ({ row }) => {
        const value = Number(row.original.price) / 100;
        const formatted = Number.isNaN(value)
          ? row.original.price
          : value.toFixed(2);
        return (
          <span className="text-xs sm:text-sm font-medium text-heading-black">
            £{formatted}
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
        const status = row.original.payment_id ? "Paid" : "Pending";

        const classes =
          status === "Paid"
            ? "bg-green-50 text-green-700"
            : "bg-amber-50 text-amber-700";

        return (
          <Badge
            variant="outline"
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-semibold border-0 ${classes}`}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Actions"
          className="justify-end"
        />
      ),
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DataTableRowActions
            row={row}
            actions={[
              {
                label: "View booking",
                icon: <Eye className="h-4 w-4" />,
                onClick: (booking) => {
                  window.location.href = `/bookings/${booking.id}`;
                },
              },
            ]}
          />
        </div>
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


