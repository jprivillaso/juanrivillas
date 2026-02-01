import { Redis } from "@upstash/redis";
import { allArticles } from "@/.contentlayer/generated";
import { Eye } from "lucide-react";
import Link from "next/link";

import { Card } from "../components/Card";
import { Navigation } from "../components/Nav";
import { Newsletter } from "../components/Newsletter";
import { Article } from "./article";

export const revalidate = 60;
const redis = Redis.fromEnv();

export default async function ProjectsPage() {
  let projectViews: number[] = [];

  try {
    projectViews = await redis.mget<number[]>(
      ...allArticles.map((p) => ["pageviews", "blog", p.slug].join(":")),
    );
  } catch (error) {
    console.error("Error fetching views from Upstash");
  }

  const views = projectViews.reduce((acc, v, i) => {
    acc[allArticles[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const featured = allArticles.find((project) => project.slug === "hiring_process");
  if (!featured) {
    throw new Error("Featured article 'hiring_process' not found");
  }

  const sorted = allArticles
    .filter((p) => p.published)
    .filter((project) => project.slug !== featured.slug)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">Posts</h2>
        </div>

        <div className="hidden w-full h-px md:block bg-zinc-800" />

        {/* Mobile: Single column with proper date sorting */}
        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:hidden">
          {sorted.map((project) => (
            <Card key={project.slug}>
              <Article project={project} views={views[project.slug] ?? 0} />
            </Card>
          ))}
        </div>

        {/* Desktop: 3-column masonry layout */}
        <div className="hidden md:grid grid-cols-3 gap-4 mx-auto lg:mx-0">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>

        <div className="hidden w-full h-px md:block bg-zinc-800" />

        <Newsletter />
      </div>
    </div>
  );
}
