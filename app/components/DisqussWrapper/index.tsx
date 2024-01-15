"use client"

import { DiscussionEmbed } from "disqus-react"

type CommentsProps = {
  title: string
  slug: string
}

const Comments = ({ title, slug }: CommentsProps) => {
  const disqusShortname = 'juanrivillas'

  const disqusConfig = {
    identifier: `/blog/${slug}`,
    title
  }

  return (
    <div className="w-4/5 m-auto">
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}

export default Comments;