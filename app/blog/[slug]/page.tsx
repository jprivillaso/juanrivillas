import DisqusWrapper from "@/app/components/DisqussWrapper";
import { Mdx } from "@/app/components/Mdx";
import { Newsletter } from "@/app/components/Newsletter";
import { allArticles } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";
import { Header } from "./header";

import "./mdx.css";

// These pages should be fully static so they render reliably on platforms
// that may not support dynamic App Router routing for Turbopack builds.
export const dynamic = "force-static";
export const dynamicParams = false;

type RouteParams = {
  slug: string;
  language?: string;
};

type Props = {
  // Next 16 treats `params` as async in Server Components.
  params: Promise<RouteParams>;
};

export async function generateStaticParams(): Promise<RouteParams[]> {
  return allArticles
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const project = allArticles.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} slug={project.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>

      <DisqusWrapper title={project.title} slug={project.slug} />
    </div>
  );
}
