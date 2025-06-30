import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";

export async function GET(
  req: NextRequest,
  { params }: { params: { slugName: string } }
) {
  try {
    const db = await connectToDatabase();
    const post = await db.collection("posts").findOne({ slug: params.slugName });
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error("Fetch by slug error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}