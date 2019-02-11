import React from 'react';

import Article from './article';

const articleList = ({ articles }) => {
  return articles.map(({ node }, i) => (
    <Article node={node} key={i} />
  ));
};

export default articleList;
