import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { drivers } from "@/db/schema";
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

  const [driver] = await db
    .select()
    .from(drivers)
    .where(eq(drivers.id, id))
    .limit(1);

  if (!driver) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(driver);
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
  const { status } = body as { status?: string };

  if (!status || !["pending", "approved", "rejected"].includes(status)) {
    return NextResponse.json(
      { message: "Invalid status" },
      { status: 400 },
    );
  }

  const [updated] = await db
    .update(drivers)
    .set({ status })
    .where(eq(drivers.id, id))
    .returning();

  return NextResponse.json(updated);
}





