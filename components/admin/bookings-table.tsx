"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";

export interface BookingRow {
  id: number;
  name: string;
  email: string;
  pickup_location: string;
  dropoff_location: string | null;
  pickup_date: Date | null;
  category: string;
  price: string;
  created_at: Date;
  payment_id: string | null;
}

const columns: ColumnDef<BookingRow>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-sm text-text-gray">#{row.original.id}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Passenger",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-base">{row.original.name}</span>
        <span className="text-sm text-text-gray truncate">
          {row.original.email}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "pickup_location",
    header: "Route",
    cell: ({ row }) => (
      <div className="text-sm text-text-gray max-w-xs">
        <p className="truncate">{row.original.pickup_location}</p>
        {row.original.dropoff_location && (
          <p className="truncate">→ {row.original.dropoff_location}</p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "pickup_date",
    header: "Pickup",
    cell: ({ row }) =>
      row.original.pickup_date ? (
        <div className="text-sm text-text-gray">
          {new Date(+(row.original.pickup_date)).toLocaleDateString()}
        </div>
      ) : (
        <span className="text-sm text-text-gray">—</span>
      ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-sm font-medium uppercase text-text-gray">
        {row.original.category}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const value = Number(row.original.price) / 100;
      return (
        <span className="text-sm font-medium text-heading-black">
          £{isNaN(value) ? row.original.price : value.toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: "payment_id",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.payment_id ? "Paid" : "Pending";

      const classes =
        status === "Paid"
          ? "bg-green-50 text-green-700"
          : "bg-amber-50 text-amber-700";

      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-sm font-semibold ${classes}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link href={`/bookings/${row.original.id}`}>
          <Button variant="outline" size="sm">
            View
          </Button>
        </Link>
      </div>
    ),
  },
];

export function BookingsTable({ data }: { data: BookingRow[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="Search by passenger or email..."
    />
  );
}



