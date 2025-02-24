import { writeClient } from "@/sanity/lib/write-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Increment view count in Sanity
    await writeClient.patch(id).inc({ views: 1 }).commit();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to increment view:", error);
    return NextResponse.json({ error: "Failed to increment view" }, { status: 500 });
  }
} 