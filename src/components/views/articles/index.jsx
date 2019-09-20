import React from 'react';

import Article from './article';
import {
  View, Image, Articles
} from './index_UI';

const articleList = data => {
  return data.allMarkdownRemark.edges.map(({ node }, i) => (
    <Article node={node} key={i} keyProp={i} />
  ));
};

const articles = ({ data }) => {
  return (
    <View>
      <Image
        title="Articles image"
        alt="A pencil with brown background"
        fixed={ typeof window === 'undefined' ? { src: {} } : undefined }
        fluid={ data.articlesImage.fluid }
      />
      <Articles>
        { articleList(data) }
      </Articles>
    </View>
  );
};

export default articles;
