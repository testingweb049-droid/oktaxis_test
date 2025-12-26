import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slugName: string }> }
) {
  // MongoDB removed - returning empty response
  return NextResponse.json({ message: "Blog functionality disabled - MongoDB removed" }, { status: 404 });
}