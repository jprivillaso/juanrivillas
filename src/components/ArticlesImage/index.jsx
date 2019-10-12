import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import * as S from './styled';

const ArticlesImage = () => {
  const { image } = useStaticQuery(
    graphql`
      query {
        image: file(relativePath: { eq: "articles.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1680, quality: 60) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  );

  return <S.Avatar fluid={image.childImageSharp.fluid} />;
};

export default ArticlesImage;
