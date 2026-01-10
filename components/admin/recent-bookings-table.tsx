"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/admin/data-table";

export type RecentBookingRow = {
  id: number;
  name: string;
  price: string;
  payment_id: string | null;
  created_at: Date;
};

const columns: ColumnDef<RecentBookingRow>[] = [
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => {
      const booking = row.original;
      return (
        <Link
          href={`/bookings/${booking.id}`}
          className="block font-medium text-heading-black truncate hover:underline"
        >
          {booking.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Amount",
    cell: ({ row }) => {
      const value = Number(row.original.price) / 100;
      const amount = Number.isNaN(value)
        ? row.original.price
        : `£${value.toFixed(2)}`;
      return (
        <span className="text-sm sm:text-base font-semibold text-heading-black">
          {amount}
        </span>
      );
    },
  },
  {
    accessorKey: "payment_id",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.payment_id ? "Paid" : "Pending";
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs sm:text-sm font-semibold ${
            status === "Paid"
              ? "bg-green-50 text-green-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Order date",
    cell: ({ row }) => {
      const created = row.original.created_at
        ? new Date(row.original.created_at).toLocaleDateString()
        : "—";
      return (
        <span className="text-xs sm:text-sm text-text-gray">{created}</span>
      );
    },
  },
];

export function RecentBookingsTable({ data }: { data: RecentBookingRow[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="Search by customer..."
    />
  );
}


