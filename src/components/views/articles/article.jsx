import React from 'react';

import {
  View, Title, Date, Content, Tag, Flex
} from './article_UI';
import { COLORS } from '../../../utils/colors';

const getColor = tag => {
  if (COLORS[tag]) return COLORS[tag];
  return 'red';
};

const getTags = tags => {
  return tags.map(tag => {
    return (
      <Tag color={ getColor(tag) }>
        { tag }
      </Tag>
    );
  });
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
        { getTags(node.frontmatter.tags) }
      </Flex>
    </Title>
    <Content>
      <h2>{node.frontmatter.description}</h2>
    </Content>
  </View>
);

export default Article;
