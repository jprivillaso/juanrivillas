import React from 'react';

import Article from './article';

const articleList = ({ data }) => {
  return data.allMarkdownRemark.edges.map(({ node }, i) => (
    <Article node={node} key={i} keyProp={i} />
  ));
};

export default articleList;
