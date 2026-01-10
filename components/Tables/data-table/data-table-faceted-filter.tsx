"use client";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import type { FacetedFilterProps } from "./data-table-types";

export function DataTableFacetedFilter({
  column,
  title,
  options,
  multiple = true,
}: FacetedFilterProps) {
  const selectedValues = new Set(
    (column.getFilterValue() as string[] | string | undefined) ??
      (multiple ? [] : ""),
  );

  const handleSelect = (value: string) => {
    if (multiple) {
      const updated = new Set(selectedValues);
      if (updated.has(value)) {
        updated.delete(value);
      } else {
        updated.add(value);
      }
      column.setFilterValue(Array.from(updated));
    } else {
      column.setFilterValue(selectedValues.has(value) ? undefined : value);
    }
  };

  const clearFilter = () => {
    column.setFilterValue(undefined);
  };

  const isFiltered = multiple
    ? selectedValues.size > 0
    : typeof column.getFilterValue() !== "undefined";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-9 border-dashed text-xs sm:text-sm",
            isFiltered && "border-primary text-primary",
          )}
        >
          <span>{title}</span>
          {isFiltered && (
            <>
              <span className="mx-1 h-4 w-px bg-border" />
              <span className="flex items-center gap-1">
                {multiple ? (
                  <Badge
                    variant="secondary"
                    className="rounded-full px-2 py-0 text-[10px] sm:text-xs"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="rounded-full px-2 py-0 text-[10px] sm:text-xs"
                  >
                    1 selected
                  </Badge>
                )}
              </span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="start">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          {isFiltered && (
            <button
              type="button"
              onClick={clearFilter}
              className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>

        <div className="space-y-1 max-h-56 overflow-y-auto">
          {options.map((option) => {
            const isSelected = selectedValues.has(option.value);
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1 text-xs text-left hover:bg-muted",
                )}
                onClick={() => handleSelect(option.value)}
              >
                <Checkbox
                  checked={isSelected}
                  className="h-3.5 w-3.5 rounded-[4px]"
                />
                {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
                <span className="truncate">{option.label}</span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}


