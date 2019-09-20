import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

import Header from '../../header';
import '../default.css';

const PaddedLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  margin: 0 auto;

  .header a {
    color: black;
  }

  @media (max-width: 1280px) {
    width: 100% !important;
  }
`;

const PaddedContent = styled.section`
  margin: 5rem 20% 1.0875rem;

  @media (max-width: 1280px) {
    width: 100% !important;
    margin: 0;
    padding: 2em;
    margin-top: 3em;
  }
`;

const Image = styled(Img)`
  margin-top: -10%;
`;

const paddedLayout = ({ children, background, image }) => {
  const pageWithoutBackground = background === 'none';
  return (
    <PaddedLayout
      id="padded_layout"
    >
      <Header />
      {
        !pageWithoutBackground
          ? (
            <Image
              title="Articles image"
              alt="A pencil with brown background"
              fixed={typeof window === 'undefined' ? { src: {} } : undefined}
              fluid={image}
            />
          )
          : null
      }
      <PaddedContent>
        {children}
      </PaddedContent>
    </PaddedLayout>
  );
};

export default paddedLayout;
