import { db } from "@/db/drizzle";
import { drivers } from "@/db/schema";
import { desc } from "drizzle-orm";

import type { DriverRow } from "@/components/admin/drivers-table";
import { DriversPageClient } from "@/components/admin/drivers-page-client";

export default async function DriversPage() {
  const driversData = (await db
    .select({
      id: drivers.id,
      name: drivers.name,
      email: drivers.email,
      phone: drivers.phone,
      car_type: drivers.car_type,
      status: drivers.status,
      created_at: drivers.created_at,
    })
    .from(drivers)
    .orderBy(desc(drivers.created_at))
    .limit(200)) as DriverRow[];

  return <DriversPageClient drivers={driversData} />;
}



