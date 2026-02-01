import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

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
    const hostname = url.hostname;

    if (!slug) {
      return new NextResponse("Slug parameter is required", { status: 400 });
    }

    // Local dev / missing Upstash config: return 0 instead of failing.
    // This keeps UI components simple (they can always call this API).
    const isLocalhost =
      hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";

    const hasUpstashConfig =
      Boolean(process.env.UPSTASH_REDIS_REST_URL) && Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

    if (isLocalhost || !hasUpstashConfig) {
      return NextResponse.json({ views: 0, slug });
    }

    // Determine the key based on the slug
    let key: string;
    if (slug === "family_tree") {
      key = ["pageviews", "projects", "family_tree"].join(":");
    } else {
      // For blog posts, use the existing format
      key = ["pageviews", "blog", slug].join(":");
    }

    const redis = Redis.fromEnv();
    const views = (await redis.get<number>(key)) ?? 0;

    return NextResponse.json({ views, slug });
  } catch (error) {
    console.error("Error fetching views:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
