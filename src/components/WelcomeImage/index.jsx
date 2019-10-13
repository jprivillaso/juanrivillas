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
              ...GatsbyImageSharpFluid,
              presentationWidth
            }
          }
        }
      }
    `
  );

  const props = {
    ...image,
    style: {
      ...image.style,
      maxWidth: image.childImageSharp.fluid.presentationWidth,
      width: typeof window !== 'undefined' && window.outerWidth < 1280
        ? image.childImageSharp.fluid.presentationWidth * 0.5
        : image.childImageSharp.fluid.presentationWidth
    }
  };

  return (
    <S.Avatar
      fixed={typeof window === 'undefined' ? { src: {} } : undefined}
      fluid={image.childImageSharp.fluid}
      {...props}
    />
  );
};

export default WelcomeImg;
