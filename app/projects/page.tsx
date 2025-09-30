"use client";
import { Navigation } from "../components/Nav";
import { Card } from "../components/Card";
import Link from "next/link";

export default function Example() {
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
                <h2
                  id="featured-post"
                  className="text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                >
                  Family Tree
                </h2>
                <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                  Data visualization of my family tree.
                </p>
              </div>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
