"use client";

import * as React from "react";

import { DataTable } from "@/components/admin/data-table";
import {
  getBookingColumns,
  getBookingFilterColumns,
  type BookingRow,
} from "@/components/Tables/data-table/columns/bookings-columns";

export function BookingsTable({ data }: { data: BookingRow[] }) {
  const columns = React.useMemo(() => getBookingColumns(), []);

  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
}

export type { BookingRow } from "@/components/Tables/data-table/columns/bookings-columns";