import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

import Article from './article';

export const Image = styled(Img)`
  margin-top: -10%;
`;

const Articles = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 2em;
  margin-bottom: 0em;

  @media (max-width: 1280px) {
    width: 100% !important;
    margin: 0;
    padding: 2em;
    margin-top: 3em;
  }
`;

const View = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 2em;
`;

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
