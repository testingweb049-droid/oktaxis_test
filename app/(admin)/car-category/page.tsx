import { db } from "@/db/drizzle";
import { fleets } from "@/db/schema";
import { desc } from "drizzle-orm";

import { CarCategoryPageClient } from "@/components/admin/car-category-page-client";
import type { FleetRow } from "@/components/admin/car-category-table";

export default async function CarCategoryPage() {
  const data = (await db
    .select({
      id: fleets.id,
      name: fleets.name,
      cars: fleets.cars,
      passengers: fleets.passengers,
      suitcases: fleets.suitcases,
      price_10_miles: fleets.price_10_miles,
      hourly_rate: fleets.hourly_rate,
      minimum_fare: fleets.minimum_fare,
      one_way_discount_percent: fleets.one_way_discount_percent,
      return_discount_percent: fleets.return_discount_percent,
      is_active: fleets.is_active,
      created_at: fleets.created_at,
    })
    .from(fleets)
    .orderBy(desc(fleets.created_at))) as FleetRow[];

  return <CarCategoryPageClient initialFleets={data} />;
}


