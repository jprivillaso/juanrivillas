"use client";

import { Eye } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Props = {
  slug: string;
  isIntersecting: boolean;
};

export const ViewCounter: React.FC<Props> = ({ slug, isIntersecting }) => {
  const [views, setViews] = useState(0);
  const formatted = useMemo(
    () => Intl.NumberFormat("en-US", { notation: "compact" }).format(views),
    [views],
  );

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      // 1) Increment (API no-ops on localhost / missing Upstash config)
      try {
        await fetch("/api/incr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
          signal: controller.signal,
        });
      } catch {
        // ignore
      }

      // 2) Fetch current views (after increment attempt so the number updates immediately)
      try {
        const r = await fetch(`/api/views?slug=${encodeURIComponent(slug)}`, {
          signal: controller.signal,
        });
        if (!r.ok) return;
        const data = (await r.json()) as { views?: number } | null;
        if (typeof data?.views === "number") setViews(data.views);
      } catch {
        // ignore
      }
    })();

    return () => controller.abort();
  }, [slug]);

  return (
    <span
      title="View counter for this page"
      className={`duration-200 hover:font-medium flex items-center gap-1 ${
        isIntersecting ? " text-zinc-400 hover:text-zinc-100" : "text-zinc-600 hover:text-zinc-900"
      } `}
    >
      <Eye className="w-5 h-5" /> {formatted}
    </span>
  );
};
