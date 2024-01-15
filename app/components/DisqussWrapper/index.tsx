"use client"

import { DiscussionEmbed } from "disqus-react"

type CommentsProps = {
  title: string
  slug: string
}

const Comments = ({ title, slug }: CommentsProps) => {
  const disqusShortname = 'juanrivillas'
  const url = `https://juanrivillas.com/${ slug }`

  const disqusConfig = {
    identifier: url,
    title,
    url
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