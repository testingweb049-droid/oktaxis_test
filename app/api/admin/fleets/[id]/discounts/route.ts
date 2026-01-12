import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { fleets } from "@/db/schema";
import { getAdminServerSession } from "@/lib/auth";

type RouteParams = Promise<{ id: string }>;

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
    one_way_discount_percent,
    return_discount_percent,
  } = body as {
    one_way_discount_percent?: number;
    return_discount_percent?: number;
  };

  if (
    one_way_discount_percent == null &&
    return_discount_percent == null
  ) {
    return NextResponse.json(
      { message: "No discount fields provided" },
      { status: 400 },
    );
  }

  const update: Record<string, unknown> = {};

  if (one_way_discount_percent != null) {
    if (
      typeof one_way_discount_percent !== "number" ||
      one_way_discount_percent < 0 ||
      one_way_discount_percent > 100
    ) {
      return NextResponse.json(
        { message: "Invalid one_way_discount_percent" },
        { status: 400 },
      );
    }
    update.one_way_discount_percent = one_way_discount_percent;
  }

  if (return_discount_percent != null) {
    if (
      typeof return_discount_percent !== "number" ||
      return_discount_percent < 0 ||
      return_discount_percent > 100
    ) {
      return NextResponse.json(
        { message: "Invalid return_discount_percent" },
        { status: 400 },
      );
    }
    update.return_discount_percent = return_discount_percent;
  }

  const [updated] = await db
    .update(fleets)
    .set(update)
    .where(eq(fleets.id, id))
    .returning({
      id: fleets.id,
      one_way_discount_percent: fleets.one_way_discount_percent,
      return_discount_percent: fleets.return_discount_percent,
    });

  return NextResponse.json(updated);
}


