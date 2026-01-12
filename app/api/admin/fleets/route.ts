import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { fleets } from "@/db/schema";
import { getAdminServerSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await db
    .select({
      id: fleets.id,
      name: fleets.name,
      cars: fleets.cars,
      image_url: fleets.image_url,
      passengers: fleets.passengers,
      suitcases: fleets.suitcases,
      price_10_miles: fleets.price_10_miles,
      price_per_mile: fleets.price_per_mile,
      hourly_rate: fleets.hourly_rate,
      minimum_fare: fleets.minimum_fare,
      stops_included: fleets.stops_included,
      one_way_discount_percent: fleets.one_way_discount_percent,
      return_discount_percent: fleets.return_discount_percent,
      is_active: fleets.is_active,
      created_at: fleets.created_at,
      updated_at: fleets.updated_at,
    })
    .from(fleets)
    .orderBy(desc(fleets.created_at));

  return NextResponse.json({ fleets: data });
}

export async function POST(req: NextRequest) {
  const session = await getAdminServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const {
    name,
    cars,
    image_url,
    passengers,
    suitcases,
    price_10_miles,
    price_per_mile,
    hourly_rate,
    minimum_fare,
    stops_included,
    one_way_discount_percent,
    return_discount_percent,
    is_active,
  } = body ?? {};

  if (
    !name ||
    !cars ||
    typeof passengers !== "number" ||
    typeof suitcases !== "number" ||
    price_10_miles == null ||
    price_per_mile == null ||
    hourly_rate == null
  ) {
    return NextResponse.json(
      {
        message:
          "Missing required fields. Name, cars, passengers, suitcases, price_10_miles, price_per_mile and hourly_rate are required.",
      },
      { status: 400 },
    );
  }

  const [created] = await db
    .insert(fleets)
    .values({
      name,
      cars,
      image_url: image_url || "",
      passengers,
      suitcases,
      price_10_miles,
      price_per_mile,
      hourly_rate,
      minimum_fare: minimum_fare ?? null,
      stops_included: stops_included ?? null,
      one_way_discount_percent: one_way_discount_percent ?? 0,
      return_discount_percent: return_discount_percent ?? 0,
      is_active: is_active ?? true,
    })
    .returning();

  return NextResponse.json({ fleet: created }, { status: 201 });
}


