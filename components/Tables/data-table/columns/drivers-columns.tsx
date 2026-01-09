"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "../data-table-row-actions";
import type { FilterColumn } from "../data-table-types";

export interface DriverRow {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  car_type: string;
  status: string | null;
  created_at: Date;
}

export function getDriverColumns(): ColumnDef<DriverRow>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Driver" />
      ),
      cell: ({ row }) => {
        const driver = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium text-sm sm:text-base">
              {driver.name}
            </span>
            <span className="text-xs sm:text-sm text-text-gray truncate">
              {driver.email || "No email"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => (
        <span className="text-xs sm:text-sm text-text-gray">
          {row.original.phone || "—"}
        </span>
      ),
    },
    {
      accessorKey: "car_type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Car type" />
      ),
      cell: ({ row }) => (
        <span className="text-xs sm:text-sm font-medium text-heading-black">
          {row.original.car_type}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      enableColumnFilter: true,
      cell: ({ row }) => {
        const status = (row.original.status || "pending").toLowerCase();

        const classes =
          status === "approved"
            ? "bg-green-50 text-green-700"
            : status === "rejected"
              ? "bg-red-50 text-red-700"
              : "bg-amber-50 text-amber-700";

        return (
          <Badge
            variant="outline"
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-semibold uppercase border-0 ${classes}`}
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
                label: "View details",
                icon: <Eye className="h-4 w-4" />,
                onClick: (driver) => {
                  // Prefer client-side navigation via Link; fallback for programmatic usage
                  window.location.href = `/drivers/${driver.id}`;
                },
              },
            ]}
          />
        </div>
      ),
    },
  ];
}

export function getDriverFilterColumns(
  drivers: DriverRow[],
): FilterColumn[] {
  const statuses = Array.from(
    new Set(
      drivers
        .map((d) => (d.status || "pending").toLowerCase())
        .filter(Boolean),
    ),
  );

  const carTypes = Array.from(
    new Set(drivers.map((d) => d.car_type).filter(Boolean)),
  );

  return [
    {
      column: "status",
      title: "Status",
      multiple: true,
      options: statuses.map((status) => ({
        label: status,
        value: status,
      })),
    },
    {
      column: "car_type",
      title: "Car type",
      multiple: true,
      options: carTypes.map((carType) => ({
        label: carType,
        value: carType,
      })),
    },
  ];
}


