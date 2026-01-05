"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";

export interface DriverRow {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  car_type: string;
  status: string | null;
}

const columns: ColumnDef<DriverRow>[] = [
  {
    accessorKey: "name",
    header: "Driver",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-base">{row.original.name}</span>
        <span className="text-sm text-text-gray truncate">
          {row.original.email || "No email"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-sm text-text-gray">
        {row.original.phone || "—"}
      </span>
    ),
  },
  {
    accessorKey: "car_type",
    header: "Car type",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-heading-black">
        {row.original.car_type}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = (row.original.status || "pending").toLowerCase();

      const classes =
        status === "approved"
          ? "bg-green-50 text-green-700"
          : status === "rejected"
            ? "bg-red-50 text-red-700"
            : "bg-amber-50 text-amber-700";

      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-sm font-semibold uppercase ${classes}`}
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
        <Link href={`/drivers/${row.original.id}`}>
          <button className="inline-flex h-9 items-center justify-center rounded-md border border-text-gray bg-white px-3 py-1.5 text-sm font-semibold text-heading-black transition-colors hover:bg-light-background cursor-pointer">
            View
          </button>
        </Link>
      </div>
    ),
  },
];

export function DriversTable({ data }: { data: DriverRow[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="Search by driver or email..."
    />
  );
}



