"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";

function clsx(...args: (string | undefined | null | false)[]) {
  return args.filter(Boolean).join(" ");
}

type HProps = React.ComponentPropsWithoutRef<"h1">;
type AProps = React.ComponentPropsWithoutRef<"a">;
type PProps = React.ComponentPropsWithoutRef<"p">;
type UlProps = React.ComponentPropsWithoutRef<"ul">;
type OlProps = React.ComponentPropsWithoutRef<"ol">;
type LiProps = React.ComponentPropsWithoutRef<"li">;
type BlockquoteProps = React.ComponentPropsWithoutRef<"blockquote">;
type HrProps = React.ComponentPropsWithoutRef<"hr">;
type PreProps = React.ComponentPropsWithoutRef<"pre">;
type CodeProps = React.ComponentPropsWithoutRef<"code">;
type ThProps = React.ComponentPropsWithoutRef<"th">;
type TdProps = React.ComponentPropsWithoutRef<"td">;

const components = {
  h1: ({ className, ...props }: HProps) => (
    <h1
      className={clsx("mt-2 scroll-m-20 text-4xl font-bold tracking-tight", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: HProps) => (
    <h2
      className={clsx(
        "mt-10 scroll-m-20 border-b border-b-zinc-800 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: HProps) => (
    <h3
      className={clsx("mt-8 scroll-m-20 text-2xl font-semibold tracking-tight", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: HProps) => (
    <h4
      className={clsx("mt-8 scroll-m-20 text-xl font-semibold tracking-tight", className)}
      {...props}
    />
  ),
  h5: ({ className, ...props }: HProps) => (
    <h5
      className={clsx("mt-8 scroll-m-20 text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  ),
  h6: ({ className, ...props }: HProps) => (
    <h6
      className={clsx("mt-8 scroll-m-20 text-base font-semibold tracking-tight", className)}
      {...props}
    />
  ),
  a: ({ className, href, ...props }: AProps) => {
    // If MDX renders an anchor without href, fall back to plain text-like anchor.
    if (!href) {
      return (
        <a
          className={clsx("font-medium text-zinc-900 underline underline-offset-4", className)}
          {...props}
        />
      );
    }

    return (
      <Link
        className={clsx("font-medium text-zinc-900 underline underline-offset-4", className)}
        href={href}
        {...props}
      />
    );
  },
  p: ({ className, ...props }: PProps) => (
    <p className={clsx("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
  ),
  ul: ({ className, ...props }: UlProps) => (
    <ul className={clsx("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: OlProps) => (
    <ol className={clsx("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: LiProps) => <li className={clsx("mt-2", className)} {...props} />,
  blockquote: ({ className, ...props }: BlockquoteProps) => (
    <blockquote
      className={clsx(
        "mt-6 border-l-2 border-zinc-300 pl-6 italic text-zinc-800 [&>*]:text-zinc-600",
        className,
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    // rome-ignore lint/a11y/useAltText: MDX component handles dynamic content where alt may not be provided
    <img
      className={clsx("rounded-md border border-zinc-200", className)}
      alt={alt || ""}
      {...props}
    />
  ),
  hr: ({ ...props }: HrProps) => <hr className="my-4 border-zinc-200 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="w-full my-6 overflow-y-auto">
      <table className={clsx("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={clsx("m-0 border-t border-zinc-300 p-0 even:bg-zinc-100", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: ThProps) => (
    <th
      className={clsx(
        "border border-zinc-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: TdProps) => (
    <td
      className={clsx(
        "border border-zinc-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: PreProps) => (
    <pre
      className={clsx("mt-6 mb-4 overflow-x-auto rounded-lg bg-zinc-900 py-4", className)}
      {...props}
    />
  ),
  code: ({ className, ...props }: CodeProps) => {
    const maybe = props as CodeProps & {
      "data-language"?: string;
      "data-theme"?: string;
    };

    // `rehype-pretty-code` adds `data-language`/`data-theme` to fenced code blocks.
    // Inline code does not have these attributes.
    const isFencedCodeBlock = Boolean(maybe["data-language"] || maybe["data-theme"]);

    if (isFencedCodeBlock) {
      return <code className={clsx("font-mono text-sm", className)} {...props} />;
    }

    return (
      <code
        className={clsx(
          "relative rounded border bg-zinc-300 bg-opacity-25 py-[0.2rem] px-[0.3rem] font-mono text-sm text-zinc-600",
          className,
        )}
        {...props}
      />
    );
  },
  Image,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
