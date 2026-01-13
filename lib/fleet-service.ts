import { db } from "@/db/drizzle";
import { fleets as fleetsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { FleetType } from "@/lib/fleet-data";

// Convert DB row to the FleetType shape used in the frontend
function mapFleetRowToFleetType(row: typeof fleetsTable.$inferSelect): FleetType {
  return {
    name: row.name,
    cars: row.cars,
    price10Miles: Number(row.price_10_miles),
    price: Number(row.price_per_mile),
    hourly: Number(row.hourly_rate),
    passengers: row.passengers,
    suitcases: row.suitcases,
    image: row.image_url,
    minimumFare: row.minimum_fare ? Number(row.minimum_fare) : undefined,
    bags: row.suitcases,
    persons: row.passengers,
    specailRequest: false,
    stop: row.stops_included ?? undefined,
  };
}

export async function getActiveFleets(): Promise<FleetType[]> {
  const rows = await db
    .select()
    .from(fleetsTable)
    .where(eq(fleetsTable.is_active, true));

  return rows.map(mapFleetRowToFleetType);
}

export async function getFleetByName(name: string): Promise<FleetType | null> {
  if (!name) return null;

  const rows = await db
    .select()
    .from(fleetsTable)
    .where(eq(fleetsTable.name, name))
    .limit(1);

  if (!rows[0]) return null;

  return mapFleetRowToFleetType(rows[0]);
}


