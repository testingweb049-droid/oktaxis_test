import { NextResponse } from "next/server";
import { getActiveFleets } from "@/lib/fleet-service";

export async function GET() {
  try {
    const fleets = await getActiveFleets();
    return NextResponse.json({ fleets });
  } catch (error: any) {
    console.error("Error fetching fleets:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to load fleets" },
      { status: 500 }
    );
  }
}


