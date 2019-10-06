import React from 'react';

import Article from './article';
import {
  View, Image, Articles
} from './index_UI';
import Search from '../search';

const searchIndices = [
  { name: `Posts`, title: `Posts`, hitComp: `PageHit` }
];

const articleList = data => {
  return data.allMarkdownRemark.edges.map(({ node }, i) => (
    <Article node={ node } key={ i } keyProp={ i } />
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
        <Search collapse indices={searchIndices} />
        { articleList(data) }
      </Articles>
    </View>
  );
};

export default articles;
