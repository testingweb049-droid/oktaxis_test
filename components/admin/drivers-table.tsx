"use client";

import * as React from "react";

import { DataTable } from "@/components/admin/data-table";
import {
  getDriverColumns,
  getDriverFilterColumns,
  type DriverRow,
} from "@/components/Tables/data-table/columns/drivers-columns";

export function DriversTable({ data }: { data: DriverRow[] }) {
  const columns = React.useMemo(() => getDriverColumns(), []);
  const filters = React.useMemo(
    () => getDriverFilterColumns(data),
    [data],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      filterColumns={filters}
    />
  );
}

export type { DriverRow } from "@/components/Tables/data-table/columns/drivers-columns";