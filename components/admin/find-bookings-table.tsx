"use client";

import * as React from "react";

import { DataTable } from "@/components/admin/data-table";
import {
  getFindBookingColumns,
  type FindBookingRow,
} from "@/components/Tables/data-table/columns/find-bookings-columns";

export function FindBookingsTable({ data }: { data: FindBookingRow[] }) {
  const columns = React.useMemo(() => getFindBookingColumns(), []);

  return <DataTable columns={columns} data={data} />;
}


