import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ siteName: string }> }
) {
  // MongoDB removed - returning empty array
  return NextResponse.json([], { status: 200 });
}
