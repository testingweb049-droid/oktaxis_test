"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2, Percent } from "lucide-react";

import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "../data-table-row-actions";
import type { RowAction } from "../data-table-types";

export interface FleetRow {
  id: number;
  name: string;
  cars: string;
  passengers: number;
  suitcases: number;
  price_10_miles: string | number;
  hourly_rate: string | number;
  minimum_fare: string | number | null;
  one_way_discount_percent: string | number;
  return_discount_percent: string | number;
  is_active: boolean;
  created_at: Date;
}

function formatMoney(value: string | number | null | undefined): string {
  if (value == null) return "—";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return `£${num.toFixed(2)}`;
}

function formatPercent(value: string | number | null | undefined): string {
  if (value == null) return "0%";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return `${num.toFixed(0)}%`;
}

export function getFleetColumns(
  opts: {
    onDelete?: (fleet: FleetRow) => Promise<void> | void;
    onOpenDiscounts?: (fleet: FleetRow) => void;
  } = {},
): ColumnDef<FleetRow>[] {
  const { onDelete, onOpenDiscounts } = opts;

  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-xs sm:text-sm text-heading-black">
          {row.original.name}
        </span>
      ),
    },
    {
      accessorKey: "cars",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cars" />
      ),
      cell: ({ row }) => (
        <span
          className="block max-w-[220px] truncate text-[11px] sm:text-xs text-text-gray"
          title={row.original.cars}
        >
          {row.original.cars}
        </span>
      ),
    },
    {
      accessorKey: "passengers",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Passengers" />
      ),
      cell: ({ row }) => (
        <span className="text-[11px] sm:text-xs text-text-gray">
          {row.original.passengers}
        </span>
      ),
    },
    {
      accessorKey: "suitcases",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Suitcases" />
      ),
      cell: ({ row }) => (
        <span className="text-[11px] sm:text-xs text-text-gray">
          {row.original.suitcases}
        </span>
      ),
    },
    {
      accessorKey: "price_10_miles",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price (10 miles)" />
      ),
      cell: ({ row }) => (
        <span className="text-[11px] sm:text-xs text-heading-black">
          {formatMoney(row.original.price_10_miles)}
        </span>
      ),
    },
    {
      accessorKey: "hourly_rate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hourly rate" />
      ),
      cell: ({ row }) => (
        <span className="text-[11px] sm:text-xs text-heading-black">
          {formatMoney(row.original.hourly_rate)}
        </span>
      ),
    },
    {
      accessorKey: "minimum_fare",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Minimum fare" />
      ),
      cell: ({ row }) => (
        <span className="text-[11px] sm:text-xs text-heading-black">
          {formatMoney(row.original.minimum_fare)}
        </span>
      ),
    },
    {
      id: "discounts",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Discounts" />
      ),
      cell: ({ row }) => {
        const fleet = row.original;
        return (
          <button
            type="button"
            onClick={() => onOpenDiscounts?.(fleet)}
            className="inline-flex items-center gap-1 rounded-full border border-input/60 px-2 py-0.5 text-[10px] sm:text-xs text-heading-black hover:bg-muted"
          >
            <Percent className="h-3 w-3" />
            <span>
              {formatPercent(fleet.one_way_discount_percent)} /{" "}
              {formatPercent(fleet.return_discount_percent)}
            </span>
          </button>
        );
      },
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => {
        const fleet = row.original;

        const actions: RowAction<FleetRow>[] = [
          {
            label: "View",
            icon: <Eye className="h-4 w-4" />,
            onClick: (item) => {
              window.location.href = `/car-category/${item.id}`;
            },
          },
          {
            label: "Set discounts",
            icon: <Percent className="h-4 w-4" />,
            onClick: onOpenDiscounts
              ? async (item) => {
                  onOpenDiscounts(item);
                }
              : undefined,
          },
        ];

        if (onDelete) {
          actions.push({
            label: "Delete",
            icon: <Trash2 className="h-4 w-4 text-red-500" />,
            confirm: true,
            onClick: async (item) => {
              await onDelete(item);
            },
          });
        }

        return (
          <div className="flex justify-end">
            <DataTableRowActions row={row} actions={actions} />
          </div>
        );
      },
    },
  ];
}


