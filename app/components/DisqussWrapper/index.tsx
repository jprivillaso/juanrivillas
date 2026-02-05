"use client";

import { DiscussionEmbed } from "disqus-react";

type CommentsProps = {
  title: string;
  slug: string;
};

const Comments = ({ title, slug }: CommentsProps) => {
  const disqusShortname = "juanrivillas";
  const url = `https://juanrivillas.com/blog/${slug}`;

  const disqusConfig = {
    identifier: url,
    title,
    url,
  };

  return (
    <div 
      className="w-4/5 m-auto py-12"
      style={{
        // Reset color values to prevent Disqus from inheriting lab() colors
        // which cause "parseColor received unparseable color: lab()" errors
        color: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255, 255, 255)',
      }}
    >
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default Comments;
