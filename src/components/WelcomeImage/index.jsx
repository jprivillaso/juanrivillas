import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import * as S from './styled';

const WelcomeImg = () => {
  const { image } = useStaticQuery(
    graphql`
      query {
        image: file(relativePath: { eq: "welcome.png" }) {
          childImageSharp {
            fluid(maxWidth: 500, quality: 60) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  );

  return <S.Avatar fluid={image.childImageSharp.fluid} />;
};

export default WelcomeImg;
