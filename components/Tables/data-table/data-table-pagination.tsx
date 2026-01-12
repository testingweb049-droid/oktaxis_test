"use client";

import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalRows?: number;
  loading?: boolean;
  fetching?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  currentPage?: number;
  totalPages?: number;
}

export function DataTablePagination<TData>({
  table,
  totalRows,
  loading,
  fetching,
  onPageChange,
  onPageSizeChange,
  currentPage,
  totalPages,
}: DataTablePaginationProps<TData>) {
  const pageSize = table.getState().pagination.pageSize;

  const pageIndex =
    typeof currentPage === "number" ? currentPage - 1 : table.getState().pagination.pageIndex;

  const rowCount =
    typeof totalRows === "number"
      ? totalRows
      : table.getFilteredRowModel().rows.length;

  const start = rowCount === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min(rowCount, (pageIndex + 1) * pageSize);

  const canPreviousPage =
    typeof currentPage === "number"
      ? currentPage > 1
      : table.getCanPreviousPage();
  const canNextPage =
    typeof currentPage === "number"
      ? totalPages
        ? currentPage < totalPages
        : end < rowCount
      : table.getCanNextPage();

  const handlePrevious = () => {
    if (!canPreviousPage) return;
    if (onPageChange && typeof currentPage === "number") {
      onPageChange(currentPage - 1);
    } else {
      table.previousPage();
    }
  };

  const handleNext = () => {
    if (!canNextPage) return;
    if (onPageChange && typeof currentPage === "number") {
      onPageChange(currentPage + 1);
    } else {
      table.nextPage();
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-2">
      <div className="text-xs sm:text-sm text-text-gray">
        {loading
          ? "Loading..."
          : rowCount === 0
          ? "No rows"
          : `Showing ${start} to ${end} of ${rowCount} entries`}
        {fetching && !loading && rowCount > 0 && (
          <span className="ml-3 text-[11px] text-muted-foreground">
            Updating...
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={!canNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}


