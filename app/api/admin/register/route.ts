import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message:
        "Admin registration is disabled. Configure ADMIN_EMAIL and ADMIN_PASSWORD in environment variables instead.",
    },
    { status: 501 },
  );
}
