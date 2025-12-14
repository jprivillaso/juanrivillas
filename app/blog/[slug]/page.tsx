import DisqusWrapper from "@/app/components/DisqussWrapper";
import { Mdx } from "@/app/components/Mdx";
import { Newsletter } from "@/app/components/Newsletter";
import { Redis } from "@upstash/redis";
import { allArticles } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Header } from "./header";
import { ReportView } from "./view";

import "./mdx.css";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
    language?: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allArticles
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allArticles.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  let views = 0;

  try {
    views = (await redis.get<number>(["pageviews", "blog", slug].join(":"))) as number;
  } catch (error) {
    console.error(`Error fetching views from Upstash for article ${slug}`);
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>

      <div className="max-w-2xl mx-auto px-4 pb-8">
        <div className="border-t border-zinc-200 pt-8">
          <Newsletter variant="compact" />
        </div>
      </div>

      <DisqusWrapper title={project.title} slug={project.slug} />
    </div>
  );
}
