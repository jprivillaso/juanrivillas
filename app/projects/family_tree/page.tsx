"use client";
import { Navigation } from "../../components/Nav";

export default function FamilyTree() {
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Family Tree
          </h1>
          <p className="mt-4 text-zinc-400">
            Data visualization of my family tree.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        
        <div className="grid gap-8">
          {/* Family tree content will go here */}
          <div className="bg-zinc-900 rounded-lg p-8">
            <p className="text-zinc-300">
              Family tree visualization coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 