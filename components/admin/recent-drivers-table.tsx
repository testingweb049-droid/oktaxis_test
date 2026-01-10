"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/admin/data-table";

export type RecentDriverRow = {
  id: number;
  name: string;
  email: string | null;
  status: string | null;
  created_at: Date;
};

const columns: ColumnDef<RecentDriverRow>[] = [
  {
    accessorKey: "name",
    header: "Driver",
    cell: ({ row }) => {
      const driver = row.original;
      return (
        <div className="flex min-w-0 flex-col">
          <Link
            href={`/drivers/${driver.id}`}
            className="font-medium text-heading-black hover:underline truncate"
          >
            {driver.name}
          </Link>
          <span className="text-xs sm:text-sm text-text-gray truncate">
            {driver.email || "No email"}
          </span>
        </div>
      );
    },
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
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs sm:text-sm font-semibold uppercase ${classes}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Joined",
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

export function RecentDriversTable({ data }: { data: RecentDriverRow[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="Search by driver..."
    />
  );
}


