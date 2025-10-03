"use client";
import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import Link from "next/link";

import { Card } from "../components/Card";
import { Navigation } from "../components/Nav";

export default function ProjectsPage() {
  const [views, setViews] = useState<number | null>(null);

  const loadViewCount = async () => {
    try {
      const response = await fetch("/api/views?slug=family_tree");
      if (response.ok) {
        const data = await response.json();
        setViews(data.views);
      }
    } catch (err) {
      console.error("Error fetching view count:", err);
    }
  };

  useEffect(() => {
    loadViewCount();
  }, []);
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">Projects</h2>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div>
          <Card customClass="!h-auto">
            <Link href={"/projects/family_tree"}>
              <div className="text-zinc-100 p-8">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="text-xs text-zinc-500">
                    Interactive Family Tree
                  </div>
                  {views !== null && (
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Eye className="w-4 h-4" />
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
                    </span>
                  )}
                </div>
                <h2
                  id="featured-post"
                  className="text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                >
                  Family Tree
                </h2>
                <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                  Data visualization of my family tree with interactive connections and AI-powered insights.
                </p>
                <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block mt-4">
                  Explore <span aria-hidden="true">&rarr;</span>
                </p>
              </div>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
