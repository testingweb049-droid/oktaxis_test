import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { fleets } from "@/db/schema";
import { getAdminServerSession } from "@/lib/auth";

type RouteParams = Promise<{ id: string }>;

export async function GET(
  _req: NextRequest,
  { params }: { params: RouteParams },
) {
  const session = await getAdminServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (Number.isNaN(id)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  const [fleet] = await db
    .select()
    .from(fleets)
    .where(eq(fleets.id, id))
    .limit(1);

  if (!fleet) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(fleet);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: RouteParams },
) {
  const session = await getAdminServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (Number.isNaN(id)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  await db
    .update(fleets)
    .set({ is_active: false })
    .where(eq(fleets.id, id));

  return NextResponse.json({ success: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: RouteParams },
) {
  const session = await getAdminServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (Number.isNaN(id)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
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

  const update: Record<string, unknown> = {};

  if (name !== undefined) update.name = name;
  if (cars !== undefined) update.cars = cars;
  if (image_url !== undefined) update.image_url = image_url;
  if (passengers !== undefined) update.passengers = passengers;
  if (suitcases !== undefined) update.suitcases = suitcases;
  if (price_10_miles !== undefined) update.price_10_miles = price_10_miles;
  if (price_per_mile !== undefined) update.price_per_mile = price_per_mile;
  if (hourly_rate !== undefined) update.hourly_rate = hourly_rate;
  if (minimum_fare !== undefined) update.minimum_fare = minimum_fare;
  if (stops_included !== undefined) update.stops_included = stops_included;
  if (one_way_discount_percent !== undefined)
    update.one_way_discount_percent = one_way_discount_percent;
  if (return_discount_percent !== undefined)
    update.return_discount_percent = return_discount_percent;
  if (is_active !== undefined) update.is_active = is_active;

  if (Object.keys(update).length === 0) {
    return NextResponse.json(
      { message: "No fields to update" },
      { status: 400 },
    );
  }

  const [updated] = await db
    .update(fleets)
    .set(update)
    .where(eq(fleets.id, id))
    .returning();

  return NextResponse.json(updated);
}


