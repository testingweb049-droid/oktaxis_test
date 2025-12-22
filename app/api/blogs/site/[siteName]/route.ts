import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/dbConnect"; // your helper

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ siteName: string }> }
) {
  try {
    const { siteName } = await context.params;

    const db = await connectToDatabase();
    const posts = await db
      .collection("posts")
      .find({ "targetSites.websiteName": siteName })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Fetch posts by website error:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
