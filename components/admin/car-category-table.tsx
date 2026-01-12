"use client";

import * as React from "react";

import { DataTable } from "@/components/admin/data-table";
import {
  getFleetColumns,
  type FleetRow,
} from "@/components/Tables/data-table/columns/fleet-columns";

interface CarCategoryTableProps {
  data: FleetRow[];
  onDelete: (fleet: FleetRow) => Promise<void>;
  onOpenDiscounts: (fleet: FleetRow) => void;
}

export function CarCategoryTable({
  data,
  onDelete,
  onOpenDiscounts,
}: CarCategoryTableProps) {
  const columns = React.useMemo(
    () =>
      getFleetColumns({
        onDelete,
        onOpenDiscounts,
      }),
    [onDelete, onOpenDiscounts],
  );

  return <DataTable columns={columns} data={data} />;
}

export type { FleetRow } from "@/components/Tables/data-table/columns/fleet-columns";


