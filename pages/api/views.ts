import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();
export const config = {
  runtime: "edge",
};

export default async function views(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "GET") {
    return new NextResponse("Method not allowed. Use GET", { status: 405 });
  }

  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return new NextResponse("Slug parameter is required", { status: 400 });
    }

    // Determine the key based on the slug
    let key: string;
    if (slug === "family_tree") {
      key = ["pageviews", "projects", "family_tree"].join(":");
    } else {
      // For blog posts, use the existing format
      key = ["pageviews", "blog", slug].join(":");
    }

    const views = (await redis.get<number>(key)) ?? 0;

    return NextResponse.json({ views, slug });
  } catch (error) {
    console.error("Error fetching views:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
