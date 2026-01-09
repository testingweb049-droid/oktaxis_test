"use client";

import type { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div className={cn("flex items-center text-sm font-medium", className)}>
        {title}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="flex-1 justify-start px-0 text-left font-medium hover:bg-transparent"
        onClick={() => column.toggleSorting()}
      >
        <span className="text-sm">{title}</span>
      </Button>
    </div>
  );
}


