import React from 'react';

import {
  View, Title, Date, Content, Tag, Flex
} from './article_UI';

const getColor = tag => {
  if (tag === 'random') return '#F28C0F';
  return 'red';
};

const Article = ({ node, keyProp }) => (
  <View
    className="article_item"
    to={node.fields.slug}
    key={`article-${ keyProp }`}
  >
    <Title className="post_header">
      <Date>{node.frontmatter.date}</Date>
      <Flex>
        <h1 className="post_title">{node.frontmatter.title}</h1>
        <Tag
          color={ getColor(node.frontmatter.tag) }
        >{ node.frontmatter.tag }</Tag>
      </Flex>
    </Title>
    <Content>
      <h2>{node.frontmatter.description}</h2>
    </Content>
  </View>
);

export default Article;
