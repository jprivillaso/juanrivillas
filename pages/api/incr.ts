import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

function getRequestIp(req: NextRequest): string | undefined {
  // NextRequest doesn't expose `ip` reliably across runtimes; prefer forwarded headers.
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || undefined;

  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("fastly-client-ip") ||
    undefined
  );
}

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
  const ip = getRequestIp(req);
  if (ip) {
    // Hash the IP in order to not store it directly in your db.
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // deduplicate the ip for each slug
    const isNew = await redis.set(["deduplicate", hash, slug].join(":"), true, {
      nx: true,
      ex: 24 * 60 * 60,
    });
    if (!isNew) {
      return new NextResponse(null, { status: 202 });
    }
  }
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
