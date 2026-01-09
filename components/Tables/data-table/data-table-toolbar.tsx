"use client";

import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import type { FilterColumn } from "./data-table-types";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey?: string;
  searchPlaceholder?: string;
  filterColumns?: FilterColumn[];
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder,
  filterColumns,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    !!table.getState().globalFilter;

  const handleReset = () => {
    table.resetColumnFilters();
    table.setGlobalFilter("");
  };

  const searchColumn = searchKey ? table.getColumn(searchKey) : null;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {searchKey && (
          <Input
            placeholder={searchPlaceholder || "Search..."}
            value={
              (searchColumn?.getFilterValue() as string | undefined) ?? ""
            }
            onChange={(event) => {
              const value = event.target.value;
              searchColumn?.setFilterValue(value);
            }}
            className="h-9 w-full max-w-full sm:max-w-xs"
          />
        )}

        {filterColumns?.map((filter) => {
          const column = table.getColumn(filter.column);
          if (!column) return null;
          return (
            <DataTableFacetedFilter
              key={filter.column}
              column={column}
              title={filter.title}
              options={filter.options}
              multiple={filter.multiple}
            />
          );
        })}

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-9 px-2 gap-1 text-xs sm:text-sm"
          >
            <X className="h-3.5 w-3.5" />
            Reset
          </Button>
        )}
      </div>

      <div className="flex items-center justify-end gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}


