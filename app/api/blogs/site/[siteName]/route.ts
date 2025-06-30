import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/dbConnect"; // your helper
console.log(connectToDatabase);
export async function GET(
  req: NextRequest,
  { params }: { params: { siteName: string } }
) {
  try {
    const db = await connectToDatabase();
    const posts = await db
      .collection("posts")
      .find({ "targetSites.websiteName": params.siteName })
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
