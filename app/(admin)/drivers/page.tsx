import { db } from "@/db/drizzle";
import { drivers } from "@/db/schema";
import { desc } from "drizzle-orm";

import { AdminPageHeader } from "@/components/admin/page-header";
import {
  DriversTable,
  type DriverRow,
} from "@/components/admin/drivers-table";

export default async function DriversPage() {
  const driversData = (await db
    .select({
      id: drivers.id,
      name: drivers.name,
      email: drivers.email,
      phone: drivers.phone,
      car_type: drivers.car_type,
      status: drivers.status,
    })
    .from(drivers)
    .orderBy(desc(drivers.created_at))
    .limit(200)) as DriverRow[];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Drivers"
        description="Review and manage registered drivers."
      />
      <DriversTable data={driversData} />
    </div>
  );
}



