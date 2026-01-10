"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import type { FilterColumn } from "./data-table-types";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  filterColumns?: FilterColumn[];
  loading?: boolean;
  fetching?: boolean;
  error?: string | null;
  toolbar?: React.ReactNode;
  pagination?: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder,
  filterColumns,
  loading,
  fetching,
  error,
  toolbar,
  pagination,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting as any,
    onColumnFiltersChange: setColumnFilters as any,
    onColumnVisibilityChange: setColumnVisibility as any,
    onRowSelectionChange: setRowSelection as any,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const showOverlay = fetching && !loading;
  const hasToolbarContent =
    !!searchKey || !!(filterColumns && filterColumns.length > 0) || !!toolbar;

  return (
    <div className="space-y-4">
      {hasToolbarContent && (
        <div className="space-y-2">
          <DataTableToolbar
            table={table}
            searchKey={searchKey}
            searchPlaceholder={searchPlaceholder}
            filterColumns={filterColumns}
          />
          {toolbar}
        </div>
      )}

      {error && !loading && (
        <div className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="relative rounded-md border border-border bg-white">
        <div className="w-full rounded-md overflow-x-auto">
          <table className="w-full min-w-max border-collapse text-base">
            <thead className="bg-muted/80">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-text-gray"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="h-24 text-center text-sm text-text-gray"
                  >
                    Loading...
                  </td>
                </tr>
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-border/60 hover:bg-muted/40"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-3 py-2 align-middle text-xs sm:text-sm"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="h-24 text-center text-sm text-text-gray"
                  >
                    No data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showOverlay && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-md bg-white/60 text-xs sm:text-sm text-muted-foreground">
            Updating data...
          </div>
        )}
      </div>

      <DataTablePagination
        table={table}
        totalRows={pagination?.total}
        loading={loading}
        fetching={fetching}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        currentPage={pagination?.page}
        totalPages={pagination?.pages}
      />
    </div>
  );
}


