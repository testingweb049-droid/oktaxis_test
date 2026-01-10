"use client";

import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RowAction } from "./data-table-types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  actions: RowAction<TData>[];
}

export function DataTableRowActions<TData>({
  row,
  actions,
}: DataTableRowActionsProps<TData>) {
  const handleClick = async (action: RowAction<TData>) => {
    if (!action.onClick) return;

    if (action.confirm) {
      const ok = window.confirm(
        "Are you sure you want to perform this action?",
      );
      if (!ok) return;
    }

    await action.onClick(row.original);
  };

  if (!actions.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <span className="sr-only">Open row actions</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel className="text-xs">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.label}
            className="flex items-center gap-2 text-xs"
            onClick={() => handleClick(action)}
          >
            {action.icon}
            <span>{action.label}</span>
            {action.shortcut && (
              <span className="ml-auto text-[10px] uppercase tracking-wide text-muted-foreground">
                {action.shortcut}
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


