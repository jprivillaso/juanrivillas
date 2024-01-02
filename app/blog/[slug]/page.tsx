import { notFound } from "next/navigation";
import { allArticles } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
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
    views = (await redis.get<number>(
      ["pageviews", "blog", slug].join(":")
    )) as number;
  } catch (error) {
    console.error(`Error fetching views from Upstash for article ${slug}`);
  }

  console.log(project);

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
