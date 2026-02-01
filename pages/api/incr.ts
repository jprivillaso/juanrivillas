import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function incr(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "POST") {
    return new NextResponse("use POST", { status: 405 });
  }
  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("must be json", { status: 400 });
  }

  const body = await req.json();
  let slug: string | undefined = undefined;
  if ("slug" in body) {
    slug = body.slug;
  }
  if (!slug) {
    return new NextResponse("Slug not found", { status: 400 });
  }

  // Local dev / missing Upstash config: treat as a no-op.
  // Keeps UI components simple (they can always call this endpoint).
  const url = new URL(req.url);
  const hostname = url.hostname;
  const isLocalhost =
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
  const hasUpstashConfig =
    Boolean(process.env.UPSTASH_REDIS_REST_URL) && Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);
  if (isLocalhost || !hasUpstashConfig) {
    return new NextResponse(null, { status: 202 });
  }

  const redis = Redis.fromEnv();
  // Determine the key based on the slug
  let key: string;
  if (slug === "family_tree") {
    key = ["pageviews", "projects", "family_tree"].join(":");
  } else {
    // For blog posts, use the existing format
    key = ["pageviews", "blog", slug].join(":");
  }

  await redis.incr(key);
  return new NextResponse(null, { status: 202 });
}
