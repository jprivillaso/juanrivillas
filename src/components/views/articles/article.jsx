import React from 'react';

import {
  View, Title, Date, Content
} from './article_UI';

const Article = ({ node, keyProp }) => (
  <View
    className="article_item"
    to={node.fields.slug}
    key={`article-${ keyProp }`}
  >
    <Title className="post_header">
      <h1 className="post_title">{node.frontmatter.title}</h1>
      <Date>{node.frontmatter.date}</Date>
    </Title>
    <Content>
      <p>{node.frontmatter.description}</p>
    </Content>
  </View>
);

export default Article;
