import type { Article as GeneratedArticle } from "@/.contentlayer/generated";
import { Eye } from "lucide-react";
import Link from "next/link";

type Props = {
  project: GeneratedArticle;
  views: number;
};

export const getBlogPostFlag = (language: string | undefined) => {
  if (language === "en") return <div className="text-xl">🇺🇸</div>;
  return <div className="text-xl">🇧🇷</div>;
};

export const Article: React.FC<Props> = ({ project, views }) => {
  return (
    <Link href={`/blog/${project.slug}`}>
      <article className="p-4 md:p-8">
        <div className="flex justify-between gap-2 items-center">
          <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
            {project.date ? (
              <time dateTime={new Date(project.date).toISOString()}>
                {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                  new Date(project.date)
                )}
              </time>
            ) : (
              <span>SOON</span>
            )}
          </span>
          <span className="text-zinc-500 text-xs flex items-center gap-1">
            {getBlogPostFlag(project.language)}
            <Eye className="w-4 h-4" />{" "}
            {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
          </span>
        </div>
        <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
          {project.title}
        </h2>
        <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
          {project.description}
        </p>
      </article>
    </Link>
  );
};
