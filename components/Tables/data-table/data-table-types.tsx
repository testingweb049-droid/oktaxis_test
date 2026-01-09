"use client";

import type { Column } from "@tanstack/react-table";

export type FilterOption = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type FilterColumn = {
  column: string;
  title: string;
  multiple?: boolean;
  options: FilterOption[];
};

export type RowAction<TData> = {
  label: string;
  onClick?: (row: TData) => void | Promise<void>;
  shortcut?: string;
  icon?: React.ReactNode;
  destructive?: boolean;
  confirm?: boolean;
  subMenu?: {
    title: string;
    options: FilterOption[];
    valueKey?: string;
  };
  openModal?: boolean;
  successMessage?: string;
};

export type FacetedFilterProps = {
  column: Column<any, unknown>;
  title: string;
  options: FilterOption[];
  multiple?: boolean;
};


