import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { orders } from "@/db/schema";
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

  const [booking] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, id))
    .limit(1);

  if (!booking) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(booking);
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

  await db.delete(orders).where(eq(orders.id, id));

  return NextResponse.json({ success: true });
}





